import {
  bigint,
  pgEnum,
  integer,
  pgTable,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { guildsTable } from "./guilds.js";
import { idColumn, timestampColumns } from "./common.js";

export const channelTypeEnum = pgEnum("type", ["text", "voice"]);

export const channelsTable = pgTable(
  "channels",
  {
    id: idColumn,
    name: varchar().notNull(),
    type: channelTypeEnum("type").default("text").notNull(),
    guildId: bigint({ mode: "bigint" })
      .references(() => guildsTable.id)
      .notNull(),
    position: integer().notNull().default(0),
    ...timestampColumns,
  },
  (table) => [index("guild_id_index").on(table.guildId)],
);
