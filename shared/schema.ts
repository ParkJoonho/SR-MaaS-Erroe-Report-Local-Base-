import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - mandatory for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - supports both Replit Auth and offline auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  username: varchar("username").unique(), // 오프라인 인증용
  password: varchar("password"), // 오프라인 인증용 (해시된 비밀번호)
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Error reports table
export const errors = pgTable("errors", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  priority: varchar("priority", { length: 50 }).notNull().default("보통"),
  system: varchar("system", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("접수됨"),
  browser: varchar("browser", { length: 255 }),
  os: varchar("os", { length: 255 }),
  screenResolution: varchar("screen_resolution", { length: 100 }),
  attachments: text("attachments").array(),
  reporterId: varchar("reporter_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertErrorSchema = createInsertSchema(errors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateErrorSchema = insertErrorSchema.partial();

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertError = z.infer<typeof insertErrorSchema>;
export type UpdateError = z.infer<typeof updateErrorSchema>;
export type Error = typeof errors.$inferSelect;

// 분석 결과 테이블
export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  analysisType: varchar("analysis_type").notNull(), // trend, prediction, pattern
  period: varchar("period").notNull(), // daily, weekly, monthly
  data: jsonb("data").notNull(), // 분석 결과 데이터
  metadata: jsonb("metadata"), // 분석 메타데이터
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults);
export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type AnalysisResult = typeof analysisResults.$inferSelect;

// Type interfaces for API responses
export interface ErrorStatsResponse {
  newErrors: number;
  inProgress: number;
  completed: number;
  onHold: number;
}

export interface ErrorListResponse {
  errors: Error[];
  total: number;
}

export interface WeeklyStatsResponse {
  week: string;
  errors: number;
  resolved: number;
}

export interface CategoryStatsResponse {
  category: string;
  count: number;
}
