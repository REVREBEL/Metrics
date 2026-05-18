CREATE TYPE "public"."campaign_status" AS ENUM('draft', 'active', 'paused', 'archived');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('meeting', 'call', 'onsite', 'milestone', 'other');--> statement-breakpoint
CREATE TYPE "public"."role_type" AS ENUM('admin', 'manager', 'analyst', 'viewer');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('todo', 'in_progress', 'blocked', 'done');--> statement-breakpoint
CREATE TABLE "app_audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_user_id" uuid,
	"entity_type" varchar(120) NOT NULL,
	"entity_id" varchar(255) NOT NULL,
	"action" varchar(120) NOT NULL,
	"before_state" jsonb,
	"after_state" jsonb,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"display_name" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campaign_metric_selections" (
	"campaign_id" uuid NOT NULL,
	"metric_key" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "campaign_metric_selections_campaign_id_metric_key_pk" PRIMARY KEY("campaign_id","metric_key")
);
--> statement-breakpoint
CREATE TABLE "campaign_tracking_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campaign_id" uuid NOT NULL,
	"rule" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"status" "campaign_status" DEFAULT 'draft' NOT NULL,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "data_library_tables" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"table_name" varchar(255) NOT NULL,
	"display_name" varchar(255),
	"description" text,
	"ui_metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "data_library_tables_table_name_unique" UNIQUE("table_name")
);
--> statement-breakpoint
CREATE TABLE "hotel_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"event_type" "event_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"details" text,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_code" varchar(64) NOT NULL,
	"name" varchar(255) NOT NULL,
	"timezone" varchar(64),
	"market" varchar(255),
	"profile_data" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "hotel_profiles_property_code_unique" UNIQUE("property_code")
);
--> statement-breakpoint
CREATE TABLE "hotel_strategy_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"strategy_template_id" uuid,
	"note" text NOT NULL,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_task_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_id" uuid NOT NULL,
	"author_user_id" uuid,
	"comment" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_task_statuses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" "task_status" NOT NULL,
	"label" varchar(100) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "hotel_task_statuses_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "hotel_tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status_id" uuid,
	"assignee_user_id" uuid,
	"due_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_user_access" (
	"user_id" uuid NOT NULL,
	"hotel_id" uuid NOT NULL,
	"can_edit" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "hotel_user_access_user_id_hotel_id_pk" PRIMARY KEY("user_id","hotel_id")
);
--> statement-breakpoint
CREATE TABLE "lookup_table_change_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"draft_edit_id" uuid,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"rationale" text,
	"requested_by_user_id" uuid,
	"approved_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lookup_table_draft_edits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"data_library_table_id" uuid NOT NULL,
	"row_identifier" varchar(255) NOT NULL,
	"draft_payload" jsonb NOT NULL,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "strategy_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"content" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "strategy_templates_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "role_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app_audit_log" ADD CONSTRAINT "app_audit_log_actor_user_id_app_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."app_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_metric_selections" ADD CONSTRAINT "campaign_metric_selections_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_tracking_rules" ADD CONSTRAINT "campaign_tracking_rules_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_hotel_id_hotel_profiles_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_events" ADD CONSTRAINT "hotel_events_hotel_id_hotel_profiles_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_events" ADD CONSTRAINT "hotel_events_created_by_user_id_app_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_notes" ADD CONSTRAINT "hotel_notes_hotel_id_hotel_profiles_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_notes" ADD CONSTRAINT "hotel_notes_created_by_user_id_app_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_strategy_notes" ADD CONSTRAINT "hotel_strategy_notes_hotel_id_hotel_profiles_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_strategy_notes" ADD CONSTRAINT "hotel_strategy_notes_strategy_template_id_strategy_templates_id_fk" FOREIGN KEY ("strategy_template_id") REFERENCES "public"."strategy_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_strategy_notes" ADD CONSTRAINT "hotel_strategy_notes_created_by_user_id_app_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_task_comments" ADD CONSTRAINT "hotel_task_comments_task_id_hotel_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."hotel_tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_task_comments" ADD CONSTRAINT "hotel_task_comments_author_user_id_app_users_id_fk" FOREIGN KEY ("author_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_tasks" ADD CONSTRAINT "hotel_tasks_hotel_id_hotel_profiles_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_tasks" ADD CONSTRAINT "hotel_tasks_status_id_hotel_task_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."hotel_task_statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_tasks" ADD CONSTRAINT "hotel_tasks_assignee_user_id_app_users_id_fk" FOREIGN KEY ("assignee_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_user_access" ADD CONSTRAINT "hotel_user_access_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hotel_user_access" ADD CONSTRAINT "hotel_user_access_hotel_id_hotel_profiles_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lookup_table_change_requests" ADD CONSTRAINT "lookup_table_change_requests_draft_edit_id_lookup_table_draft_edits_id_fk" FOREIGN KEY ("draft_edit_id") REFERENCES "public"."lookup_table_draft_edits"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lookup_table_change_requests" ADD CONSTRAINT "lookup_table_change_requests_requested_by_user_id_app_users_id_fk" FOREIGN KEY ("requested_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lookup_table_change_requests" ADD CONSTRAINT "lookup_table_change_requests_approved_by_user_id_app_users_id_fk" FOREIGN KEY ("approved_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lookup_table_draft_edits" ADD CONSTRAINT "lookup_table_draft_edits_data_library_table_id_data_library_tables_id_fk" FOREIGN KEY ("data_library_table_id") REFERENCES "public"."data_library_tables"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lookup_table_draft_edits" ADD CONSTRAINT "lookup_table_draft_edits_created_by_user_id_app_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "app_audit_log_entity_idx" ON "app_audit_log" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "app_audit_log_created_at_idx" ON "app_audit_log" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "app_users_clerk_user_id_uq" ON "app_users" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_roles_user_role_uq" ON "user_roles" USING btree ("user_id","role");