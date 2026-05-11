import { defineConfig } from "prisma/config";

try {
  // Load .env in local dev; in Docker/prod DATABASE_URL is injected via env,
  // so dotenv is optional.
  require("dotenv/config");
} catch {
  // dotenv not installed in production image — fine.
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
