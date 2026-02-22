import {
  bigint,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users.js";
import { idColumn } from "./common.js";
import { guildsTable } from "./guilds.js";

export const membersTable = pgTable(
  "members",
  {
    id: idColumn,
    userId: bigint({ mode: "bigint" })
      .references(() => usersTable.id)
      .notNull(),
    guildId: bigint({ mode: "bigint" })
      .references(() => guildsTable.id)
      .notNull(),
    joinedAt: timestamp().notNull().defaultNow(),
    nickname: varchar().notNull().default(""),
  },
  (table) => [
    uniqueIndex("user_id_guild_id_unique").on(table.userId, table.guildId),
  ],
);
