import {
  pgTable,
  varchar,
  uniqueIndex,
  index,
  text,
} from "drizzle-orm/pg-core";
import { idColumn, timestampColumns } from "./common.js";

export const usersTable = pgTable(
  "users",
  {
    id: idColumn,
    name: varchar().notNull().default(""),
    username: varchar().notNull().unique(),
    email: varchar().notNull().unique(),
    passwordHash: text().notNull(),
    avatarUrl: varchar().notNull().default(""),
    ...timestampColumns,
  },
  (table) => [uniqueIndex("username_index").on(table.username)],
);
