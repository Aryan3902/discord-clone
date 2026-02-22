import { bigint, index, pgTable, varchar } from "drizzle-orm/pg-core";
import { idColumn, timestampColumns } from "./common.js";
import { guildsTable } from "./guilds.js";
import { membersTable } from "./members.js";

export const rolesTable = pgTable(
  "roles",
  {
    id: idColumn,
    name: varchar().notNull(),
    color: varchar().notNull(),
    permissions: bigint({ mode: "bigint" }).notNull(),
    guildId: bigint({ mode: "bigint" })
      .references(() => guildsTable.id)
      .notNull(),
    ...timestampColumns,
  },
  (table) => [index("guild_id_index").on(table.guildId)],
);

export const memberRolesTable = pgTable("member_roles", {
  id: idColumn,
  memberId: bigint({ mode: "bigint" })
    .references(() => membersTable.id)
    .notNull(),
  roleId: bigint({ mode: "bigint" })
    .references(() => rolesTable.id)
    .notNull(),
});
