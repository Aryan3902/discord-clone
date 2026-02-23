import {
  bigint,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

// Common columns
const timestampColumns = {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp(),
};

const idColumn = bigint({ mode: "bigint" }).primaryKey();

// Users
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

// Guilds
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

// Members
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

// Roles
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
  (table) => [index("guild_id_role_index").on(table.guildId)],
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

// Channels
export const channelTypeEnum = pgEnum("channel_type", ["text", "voice"]);

export const channelsTable = pgTable(
  "channels",
  {
    id: idColumn,
    name: varchar().notNull(),
    channelType: channelTypeEnum().default("text").notNull(),
    guildId: bigint({ mode: "bigint" })
      .references(() => guildsTable.id)
      .notNull(),
    position: integer().notNull().default(0),
    ...timestampColumns,
  },
  (table) => [index("guild_id_index").on(table.guildId)],
);
