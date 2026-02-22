import {
  bigint,
  index,
  pgTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { idColumn, timestampColumns } from "./common.js";
import { usersTable } from "./users.js";

export const guildsTable = pgTable(
  "guilds",
  {
    id: idColumn,
    name: varchar().notNull(),
    iconUrl: varchar().notNull(),
    ownerId: bigint({ mode: "bigint" })
      .references(() => usersTable.id)
      .notNull(),
    inviteCode: varchar().notNull().unique(),
    ...timestampColumns,
  },
  (table) => [
    uniqueIndex("invite_code_index").on(table.inviteCode),
    index("id_index").on(table.id),
  ],
);
