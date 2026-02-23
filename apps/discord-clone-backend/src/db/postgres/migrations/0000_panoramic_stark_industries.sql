CREATE TYPE "public"."channel_type" AS ENUM('text', 'voice');--> statement-breakpoint
CREATE TABLE "channels" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"channelType" "channel_type" DEFAULT 'text' NOT NULL,
	"guildId" bigint NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "guilds" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"iconUrl" varchar NOT NULL,
	"ownerId" bigint NOT NULL,
	"inviteCode" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	CONSTRAINT "guilds_inviteCode_unique" UNIQUE("inviteCode")
);
--> statement-breakpoint
CREATE TABLE "member_roles" (
	"id" bigint PRIMARY KEY NOT NULL,
	"memberId" bigint NOT NULL,
	"roleId" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" bigint PRIMARY KEY NOT NULL,
	"userId" bigint NOT NULL,
	"guildId" bigint NOT NULL,
	"joinedAt" timestamp DEFAULT now() NOT NULL,
	"nickname" varchar DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"color" varchar NOT NULL,
	"permissions" bigint NOT NULL,
	"guildId" bigint NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar DEFAULT '' NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"passwordHash" text NOT NULL,
	"avatarUrl" varchar DEFAULT '' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "channels" ADD CONSTRAINT "channels_guildId_guilds_id_fk" FOREIGN KEY ("guildId") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guilds" ADD CONSTRAINT "guilds_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_roles" ADD CONSTRAINT "member_roles_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_roles" ADD CONSTRAINT "member_roles_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_guildId_guilds_id_fk" FOREIGN KEY ("guildId") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_guildId_guilds_id_fk" FOREIGN KEY ("guildId") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "guild_id_index" ON "channels" USING btree ("guildId");--> statement-breakpoint
CREATE UNIQUE INDEX "invite_code_index" ON "guilds" USING btree ("inviteCode");--> statement-breakpoint
CREATE INDEX "id_index" ON "guilds" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_id_guild_id_unique" ON "members" USING btree ("userId","guildId");--> statement-breakpoint
CREATE INDEX "guild_id_role_index" ON "roles" USING btree ("guildId");--> statement-breakpoint
CREATE UNIQUE INDEX "username_index" ON "users" USING btree ("username");