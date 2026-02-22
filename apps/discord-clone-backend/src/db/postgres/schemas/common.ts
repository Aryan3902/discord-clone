import { bigint, timestamp } from "drizzle-orm/pg-core";

const timestampColumns = {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp(),
};

const idColumn = bigint({ mode: "bigint" }).primaryKey();

export { timestampColumns, idColumn };
