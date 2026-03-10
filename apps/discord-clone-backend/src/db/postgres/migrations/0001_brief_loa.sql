ALTER TABLE "channels" RENAME COLUMN "channelType" TO "channel_type";--> statement-breakpoint
ALTER TABLE "channels" RENAME COLUMN "guildId" TO "guild_id";--> statement-breakpoint
ALTER TABLE "channels" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "channels" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "guilds" RENAME COLUMN "iconUrl" TO "icon_url";--> statement-breakpoint
ALTER TABLE "guilds" RENAME COLUMN "ownerId" TO "owner_id";--> statement-breakpoint
ALTER TABLE "guilds" RENAME COLUMN "inviteCode" TO "invite_code";--> statement-breakpoint
ALTER TABLE "guilds" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "guilds" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "member_roles" RENAME COLUMN "memberId" TO "member_id";--> statement-breakpoint
ALTER TABLE "member_roles" RENAME COLUMN "roleId" TO "role_id";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "guildId" TO "guild_id";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "joinedAt" TO "joined_at";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "guildId" TO "guild_id";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "passwordHash" TO "password_hash";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "avatarUrl" TO "avatar_url";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "guilds" DROP CONSTRAINT "guilds_inviteCode_unique";--> statement-breakpoint
ALTER TABLE "channels" DROP CONSTRAINT "channels_guildId_guilds_id_fk";
--> statement-breakpoint
ALTER TABLE "guilds" DROP CONSTRAINT "guilds_ownerId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "member_roles" DROP CONSTRAINT "member_roles_memberId_members_id_fk";
--> statement-breakpoint
ALTER TABLE "member_roles" DROP CONSTRAINT "member_roles_roleId_roles_id_fk";
--> statement-breakpoint
ALTER TABLE "members" DROP CONSTRAINT "members_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "members" DROP CONSTRAINT "members_guildId_guilds_id_fk";
--> statement-breakpoint
ALTER TABLE "roles" DROP CONSTRAINT "roles_guildId_guilds_id_fk";
--> statement-breakpoint
DROP INDEX "guild_id_index";--> statement-breakpoint
DROP INDEX "invite_code_index";--> statement-breakpoint
DROP INDEX "user_id_guild_id_unique";--> statement-breakpoint
DROP INDEX "guild_id_role_index";--> statement-breakpoint
ALTER TABLE "channels" ADD CONSTRAINT "channels_guild_id_guilds_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guilds" ADD CONSTRAINT "guilds_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_roles" ADD CONSTRAINT "member_roles_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_roles" ADD CONSTRAINT "member_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_guild_id_guilds_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_guild_id_guilds_id_fk" FOREIGN KEY ("guild_id") REFERENCES "public"."guilds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "guild_id_index" ON "channels" USING btree ("guild_id");--> statement-breakpoint
CREATE UNIQUE INDEX "invite_code_index" ON "guilds" USING btree ("invite_code");--> statement-breakpoint
CREATE UNIQUE INDEX "user_id_guild_id_unique" ON "members" USING btree ("user_id","guild_id");--> statement-breakpoint
CREATE INDEX "guild_id_role_index" ON "roles" USING btree ("guild_id");--> statement-breakpoint
ALTER TABLE "guilds" ADD CONSTRAINT "guilds_inviteCode_unique" UNIQUE("invite_code");