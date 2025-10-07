import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type * as schema from "@/db/schema"

import "dotenv/config";
import { createDbConnection } from "@/db/createDbConnection";


// Stores the db connection in the global scope to prevent multiple instances due to hot reloading with Next.js
const globalForDb = globalThis as unknown as {
    drizzle: NodePgDatabase<typeof schema>;
};

const db = globalForDb.drizzle || createDbConnection();

// Only store in global during development to prevent hot reload issues
if (process.env.NODE_ENV !== "production") {
    globalForDb.drizzle = db;
}

export { db };
