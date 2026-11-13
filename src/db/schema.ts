import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  prompt: text("prompt").notNull().default(""),
  category: text("category").notNull().default("General"),
  metaDescription: text("meta_description").notNull().default(""),
  coverImage: text("cover_image").notNull().default(""),
  readingMinutes: integer("reading_minutes").notNull().default(1),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Article = typeof articles.$inferSelect;
