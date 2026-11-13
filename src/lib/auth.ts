import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "admin_session";

function sessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`admin-session:${password}`).digest("hex");
}

export function checkPassword(input: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdmin() {
  const token = sessionToken();
  if (!token) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === token;
}

export async function setAdminSession() {
  const token = sessionToken();
  if (!token) throw new Error("ADMIN_PASSWORD is not configured");
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin");
}
