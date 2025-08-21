var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/gemini.ts
var gemini_exports = {};
__export(gemini_exports, {
  analyzeImageError: () => analyzeImageError,
  analyzeSystemCategory: () => analyzeSystemCategory,
  generateErrorTitle: () => generateErrorTitle
});
import { GoogleGenAI } from "@google/genai";
async function generateErrorTitle(content) {
  try {
    const systemPrompt = `You are a helpful assistant that generates concise, descriptive titles for error reports. 
Generate a title in Korean that summarizes the main issue described in the error content. 
The title should be brief (under 50 characters) and clearly indicate the problem.
Respond with JSON in this format: {'title': 'generated title'}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            title: { type: "string" }
          },
          required: ["title"]
        }
      },
      contents: `\uB2E4\uC74C \uC624\uB958 \uB0B4\uC6A9\uC5D0 \uB300\uD55C \uC801\uC808\uD55C \uC81C\uBAA9\uC744 \uC0DD\uC131\uD574 \uC8FC\uC138\uC694:

${content}`
    });
    const rawJson = response.text;
    if (rawJson) {
      const data = JSON.parse(rawJson);
      return data.title || "\uC624\uB958 \uC81C\uBAA9 \uC0DD\uC131 \uC2E4\uD328";
    } else {
      throw new Error("Empty response from model");
    }
  } catch (error) {
    console.error("Error generating title:", error);
    throw new Error("Failed to generate title with AI");
  }
}
async function analyzeImageError(imagePath) {
  try {
    const fs3 = await import("fs");
    const path4 = await import("path");
    const imageBytes = fs3.readFileSync(imagePath);
    const fileExtension = path4.extname(imagePath).toLowerCase();
    let mimeType = "image/jpeg";
    if (fileExtension === ".png") {
      mimeType = "image/png";
    } else if (fileExtension === ".jpg" || fileExtension === ".jpeg") {
      mimeType = "image/jpeg";
    } else if (fileExtension === ".gif") {
      mimeType = "image/gif";
    } else if (fileExtension === ".webp") {
      mimeType = "image/webp";
    }
    const contents = [
      {
        inlineData: {
          data: imageBytes.toString("base64"),
          mimeType
        }
      },
      `\uC774 \uC774\uBBF8\uC9C0\uB97C \uBD84\uC11D\uD558\uC5EC \uB2E4\uC74C\uACFC \uAC19\uC740 \uB0B4\uC6A9\uC744 \uD55C\uAD6D\uC5B4\uB85C \uC81C\uACF5\uD574\uC8FC\uC138\uC694:

1. \uD654\uBA74\uC5D0\uC11C \uBC1C\uACAC\uB418\uB294 \uC624\uB958\uB098 \uBB38\uC81C\uC810
2. \uC0AC\uC6A9\uC790 \uC778\uD130\uD398\uC774\uC2A4\uC758 \uC774\uC0C1 \uC0C1\uD0DC
3. \uC2DC\uC2A4\uD15C \uC624\uB958 \uBA54\uC2DC\uC9C0\uB098 \uACBD\uACE0
4. \uAE30\uB2A5\uC801 \uBB38\uC81C\uC810 \uB610\uB294 \uBC84\uADF8\uC758 \uC9D5\uD6C4
5. \uAC1C\uC120\uC774 \uD544\uC694\uD55C \uBD80\uBD84

\uBD84\uC11D \uACB0\uACFC\uB97C \uAD6C\uCCB4\uC801\uC774\uACE0 \uC2E4\uC6A9\uC801\uC73C\uB85C \uC791\uC131\uD574\uC8FC\uC138\uC694. \uB9CC\uC57D \uBA85\uD655\uD55C \uC624\uB958\uAC00 \uBCF4\uC774\uC9C0 \uC54A\uB294\uB2E4\uBA74, \uD654\uBA74\uC758 \uC804\uBC18\uC801\uC778 \uC0C1\uD0DC\uC640 \uC7A0\uC7AC\uC801 \uBB38\uC81C\uC810\uC744 \uC124\uBA85\uD574\uC8FC\uC138\uC694.`
    ];
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents
    });
    return response.text || "\uC774\uBBF8\uC9C0 \uBD84\uC11D \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.";
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error(`\uC774\uBBF8\uC9C0 \uBD84\uC11D \uC2E4\uD328: ${error}`);
  }
}
async function analyzeSystemCategory(content) {
  try {
    const systemPrompt = `\uB2F9\uC2E0\uC740 \uCCA0\uB3C4 \uC2DC\uC2A4\uD15C \uC624\uB958 \uBD84\uB958 \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4. 
\uB2E4\uC74C \uC624\uB958 \uB0B4\uC6A9\uC744 \uBD84\uC11D\uD558\uC5EC \uAC00\uC7A5 \uC801\uD569\uD55C \uC2DC\uC2A4\uD15C \uCE74\uD14C\uACE0\uB9AC\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.

\uCE74\uD14C\uACE0\uB9AC \uC124\uBA85:
- \uC5ED\uBB34\uC9C0\uC6D0: \uC2B9\uAC1D \uC11C\uBE44\uC2A4, \uB9E4\uD45C, \uC548\uB0B4, \uB300\uAE30\uC2E4, \uD50C\uB7AB\uD3FC \uAD00\uB828 \uC5C5\uBB34
- \uC548\uC804\uAD00\uB9AC: \uBCF4\uC548, \uC548\uC804 \uC810\uAC80, \uC0AC\uACE0 \uC608\uBC29, \uC751\uAE09\uC0C1\uD669 \uB300\uC751
- \uC2DC\uC124\uBB3C\uAD00\uB9AC: \uAC74\uBB3C, \uC124\uBE44, \uC720\uC9C0\uBCF4\uC218, \uC778\uD504\uB77C \uAD00\uB9AC

JSON \uD615\uC2DD\uC73C\uB85C \uC751\uB2F5\uD574\uC8FC\uC138\uC694: {"system": "\uCE74\uD14C\uACE0\uB9AC\uBA85"}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            system: {
              type: "string",
              enum: ["\uC5ED\uBB34\uC9C0\uC6D0", "\uC548\uC804\uAD00\uB9AC", "\uC2DC\uC124\uBB3C\uAD00\uB9AC"]
            }
          },
          required: ["system"]
        }
      },
      contents: `\uC624\uB958 \uB0B4\uC6A9: ${content}`
    });
    const rawJson = response.text;
    if (rawJson) {
      const data = JSON.parse(rawJson);
      return data.system || "\uC5ED\uBB34\uC9C0\uC6D0";
    } else {
      return "\uC5ED\uBB34\uC9C0\uC6D0";
    }
  } catch (error) {
    console.error("Error analyzing system category:", error);
    return "\uC5ED\uBB34\uC9C0\uC6D0";
  }
}
var ai;
var init_gemini = __esm({
  "server/gemini.ts"() {
    "use strict";
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  errors: () => errors,
  insertErrorSchema: () => insertErrorSchema,
  insertUserSchema: () => insertUserSchema,
  sessions: () => sessions,
  updateErrorSchema: () => updateErrorSchema,
  users: () => users
});
import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  serial
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var errors = pgTable("errors", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  priority: varchar("priority", { length: 50 }).notNull().default("\uBCF4\uD1B5"),
  system: varchar("system", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("\uC811\uC218\uB428"),
  browser: varchar("browser", { length: 255 }),
  os: varchar("os", { length: 255 }),
  attachments: text("attachments").array(),
  reporterId: varchar("reporter_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertErrorSchema = createInsertSchema(errors).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateErrorSchema = insertErrorSchema.partial();

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, and, or, like, count, gte } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  // Error operations
  async createError(error) {
    const [newError] = await db.insert(errors).values(error).returning();
    return newError;
  }
  async getErrors(options = {}) {
    const { search, status, limit = 20, offset = 0 } = options;
    let whereConditions = [];
    if (search) {
      whereConditions.push(
        or(
          like(errors.title, `%${search}%`),
          like(errors.content, `%${search}%`)
        )
      );
    }
    if (status && status !== "\uBAA8\uB4E0 \uC0C1\uD0DC") {
      whereConditions.push(eq(errors.status, status));
    }
    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : void 0;
    const [errorResults, totalResults] = await Promise.all([
      db.select().from(errors).where(whereClause).orderBy(desc(errors.createdAt)).limit(limit).offset(offset),
      db.select({ count: count() }).from(errors).where(whereClause)
    ]);
    return {
      errors: errorResults,
      total: totalResults[0].count
    };
  }
  async getError(id) {
    const [error] = await db.select().from(errors).where(eq(errors.id, id));
    return error;
  }
  async updateError(id, updates) {
    const [updatedError] = await db.update(errors).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(errors.id, id)).returning();
    return updatedError;
  }
  async deleteError(id) {
    const result = await db.delete(errors).where(eq(errors.id, id));
    return (result.rowCount ?? 0) > 0;
  }
  async getErrorStats() {
    const stats = await db.select({
      status: errors.status,
      count: count()
    }).from(errors).groupBy(errors.status);
    const result = {
      newErrors: 0,
      inProgress: 0,
      completed: 0,
      onHold: 0
    };
    stats.forEach((stat) => {
      switch (stat.status) {
        case "\uC811\uC218\uB428":
          result.newErrors = stat.count;
          break;
        case "\uCC98\uB9AC\uC911":
          result.inProgress = stat.count;
          break;
        case "\uC644\uB8CC":
          result.completed = stat.count;
          break;
        case "\uBCF4\uB958":
          result.onHold = stat.count;
          break;
      }
    });
    return result;
  }
  async getWeeklyStats() {
    const now = /* @__PURE__ */ new Date();
    const sevenWeeksAgo = new Date(now.getTime() - 7 * 7 * 24 * 60 * 60 * 1e3);
    const allErrors = await db.select({
      id: errors.id,
      createdAt: errors.createdAt,
      updatedAt: errors.updatedAt,
      status: errors.status
    }).from(errors).where(gte(errors.createdAt, sevenWeeksAgo)).orderBy(desc(errors.createdAt));
    const weekMap = /* @__PURE__ */ new Map();
    for (let i = 6; i >= 0; i--) {
      const weekStart = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1e3);
      const monday = new Date(weekStart);
      monday.setDate(monday.getDate() - monday.getDay() + 1);
      const weekLabel = `${monday.getMonth() + 1}\uC6D4 ${monday.getDate()}\uC77C`;
      weekMap.set(weekLabel, { errors: 0, resolved: 0 });
    }
    allErrors.forEach((error) => {
      if (error.createdAt) {
        const errorDate = new Date(error.createdAt);
        const monday = new Date(errorDate);
        monday.setDate(monday.getDate() - monday.getDay() + 1);
        const weekLabel = `${monday.getMonth() + 1}\uC6D4 ${monday.getDate()}\uC77C`;
        const weekStats = weekMap.get(weekLabel);
        if (weekStats) {
          weekStats.errors++;
          if (error.status === "\uC644\uB8CC") {
            weekStats.resolved++;
          }
        }
      }
    });
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const weekStart = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1e3);
      const monday = new Date(weekStart);
      monday.setDate(monday.getDate() - monday.getDay() + 1);
      const weekLabel = `${monday.getMonth() + 1}\uC6D4 ${monday.getDate()}\uC77C`;
      const stats = weekMap.get(weekLabel) || { errors: 0, resolved: 0 };
      result.push({
        week: weekLabel,
        errors: stats.errors,
        resolved: stats.resolved
      });
    }
    return result;
  }
  async getCategoryStats() {
    const stats = await db.select({
      system: errors.system,
      count: count()
    }).from(errors).groupBy(errors.system);
    return stats.map((stat) => ({
      category: stat.system,
      count: stat.count
    }));
  }
};
var storage = new DatabaseStorage();

// server/replitAuth.ts
import * as client from "openid-client";
import { Strategy } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}
var getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl
    }
  });
}
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
async function upsertUser(claims) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"]
  });
}
async function setupAuth(app2) {
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  const config = await getOidcConfig();
  const verify = async (tokens, verified) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };
  for (const domain of process.env.REPLIT_DOMAINS.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`
      },
      verify
    );
    passport.use(strategy);
  }
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));
  app2.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login"
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`
        }).href
      );
    });
  });
}
var isAuthenticated = async (req, res, next) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

// server/routes.ts
init_gemini();
import multer from "multer";
import path from "path";
import fs from "fs";
async function registerRoutes(app2) {
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const storage_config = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage_config,
    limits: {
      fileSize: 10 * 1024 * 1024,
      // 10MB limit
      files: 5
      // maximum 5 files
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  });
  await setupAuth(app2);
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.post("/api/errors/generate-title", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content || content.length < 10) {
        return res.status(400).json({
          message: "Content must be at least 10 characters long"
        });
      }
      const { generateErrorTitle: generateErrorTitle2 } = await Promise.resolve().then(() => (init_gemini(), gemini_exports));
      const title = await generateErrorTitle2(content);
      res.json({ title });
    } catch (error) {
      console.error("Error generating title:", error);
      res.status(500).json({
        message: "Failed to generate title"
      });
    }
  });
  app2.post("/api/errors/analyze-system", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content || content.length < 5) {
        return res.status(400).json({
          message: "Content must be at least 5 characters long"
        });
      }
      const { analyzeSystemCategory: analyzeSystemCategory2 } = await Promise.resolve().then(() => (init_gemini(), gemini_exports));
      const system = await analyzeSystemCategory2(content);
      res.json({ system });
    } catch (error) {
      console.error("Error analyzing system category:", error);
      res.status(500).json({
        message: "Failed to analyze system category"
      });
    }
  });
  app2.post("/api/errors/analyze-image", isAuthenticated, async (req, res) => {
    try {
      const { imagePath } = req.body;
      if (!imagePath) {
        return res.status(400).json({
          message: "Image path is required"
        });
      }
      const absolutePath = path.resolve(imagePath.startsWith("/uploads/") ? `.${imagePath}` : `./uploads/${imagePath}`);
      if (!fs.existsSync(absolutePath)) {
        return res.status(404).json({
          message: "Image file not found"
        });
      }
      const { analyzeImageError: analyzeImageError2 } = await Promise.resolve().then(() => (init_gemini(), gemini_exports));
      const analysis = await analyzeImageError2(absolutePath);
      res.json({ analysis });
    } catch (error) {
      console.error("Error analyzing image:", error);
      res.status(500).json({
        message: "Failed to analyze image"
      });
    }
  });
  app2.post("/api/errors", isAuthenticated, upload.array("attachments", 5), async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const files = req.files;
      const attachments = files ? files.map((file) => `/uploads/${file.filename}`) : [];
      const errorData = insertErrorSchema.parse({
        ...req.body,
        reporterId: userId,
        attachments: attachments.length > 0 ? attachments : null
      });
      const newError = await storage.createError(errorData);
      res.json(newError);
    } catch (error) {
      console.error("Error creating error report:", error);
      res.status(400).json({ message: "Failed to create error report" });
    }
  });
  app2.get("/uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(uploadsDir, filename);
    if (fs.existsSync(filepath)) {
      res.sendFile(filepath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  });
  app2.get("/api/errors/:id", isAuthenticated, async (req, res) => {
    try {
      const errorId = parseInt(req.params.id);
      if (isNaN(errorId)) {
        return res.status(400).json({ message: "Invalid error ID" });
      }
      const error = await storage.getError(errorId);
      if (!error) {
        return res.status(404).json({ message: "Error not found" });
      }
      res.json(error);
    } catch (error) {
      console.error("Error fetching error:", error);
      res.status(500).json({ message: "Failed to fetch error" });
    }
  });
  app2.get("/api/errors", isAuthenticated, async (req, res) => {
    try {
      const { search, status, page = "1", limit = "20" } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const result = await storage.getErrors({
        search,
        status,
        limit: parseInt(limit),
        offset
      });
      res.json(result);
    } catch (error) {
      console.error("Error fetching errors:", error);
      res.status(500).json({ message: "Failed to fetch errors" });
    }
  });
  app2.get("/api/errors/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid error ID" });
      }
      const error = await storage.getError(id);
      if (!error) {
        return res.status(404).json({ message: "Error not found" });
      }
      res.json(error);
    } catch (error) {
      console.error("Error fetching error:", error);
      res.status(500).json({ message: "Failed to fetch error" });
    }
  });
  app2.patch("/api/errors/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid error ID" });
      }
      const updates = updateErrorSchema.parse(req.body);
      const updatedError = await storage.updateError(id, updates);
      if (!updatedError) {
        return res.status(404).json({ message: "Error not found" });
      }
      res.json(updatedError);
    } catch (error) {
      console.error("Error updating error:", error);
      res.status(400).json({ message: "Failed to update error" });
    }
  });
  app2.delete("/api/errors/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid error ID" });
      }
      const success = await storage.deleteError(id);
      if (!success) {
        return res.status(404).json({ message: "Error not found" });
      }
      res.json({ message: "Error deleted successfully" });
    } catch (error) {
      console.error("Error deleting error:", error);
      res.status(500).json({ message: "Failed to delete error" });
    }
  });
  app2.get("/api/stats/errors", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getErrorStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching error stats:", error);
      res.status(500).json({ message: "Failed to fetch error stats" });
    }
  });
  app2.get("/api/stats/weekly", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getWeeklyStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching weekly stats:", error);
      res.status(500).json({ message: "Failed to fetch weekly stats" });
    }
  });
  app2.get("/api/stats/categories", isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getCategoryStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching category stats:", error);
      res.status(500).json({ message: "Failed to fetch category stats" });
    }
  });
  app2.post("/api/ai/generate-title", isAuthenticated, async (req, res) => {
    try {
      const { content } = req.body;
      if (!content || content.length < 10) {
        return res.status(400).json({ message: "Content must be at least 10 characters long" });
      }
      const title = await generateErrorTitle(content);
      res.json({ title });
    } catch (error) {
      console.error("Error generating title:", error);
      res.status(500).json({ message: "Failed to generate title" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
