CREATE TYPE "public"."gp_assignee_type" AS ENUM('app_user', 'external_assignee', 'department_placeholder', 'entity_placeholder');--> statement-breakpoint
CREATE TYPE "public"."gp_task_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."gp_task_status" AS ENUM('not_started', 'in_progress', 'waiting', 'blocked', 'complete', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."gp_workstream_entity_type" AS ENUM('internal_department', 'third_party_agency', 'ownership', 'vendor', 'brand_corporate', 'management_company', 'hotel_team', 'other');--> statement-breakpoint
CREATE TYPE "public"."gp_workstream_status" AS ENUM('not_started', 'in_progress', 'waiting', 'blocked', 'complete');--> statement-breakpoint
CREATE TYPE "public"."initiative_priority" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."initiative_status" AS ENUM('discussed', 'planning', 'active', 'blocked', 'at_risk', 'completed', 'canceled', 'archived');--> statement-breakpoint
CREATE TABLE "growth_plan_external_assignees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"entity_type" "gp_workstream_entity_type",
	"contact_email" varchar(320),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "growth_plan_initiatives" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid,
	"meeting_id" uuid,
	"title" varchar(255) NOT NULL,
	"strategy_type" varchar(100) NOT NULL,
	"objective" text,
	"background" text,
	"priority" "initiative_priority" NOT NULL,
	"status" "initiative_status" NOT NULL,
	"target_launch_date" timestamp with time zone,
	"target_completion_date" timestamp with time zone,
	"booking_start_date" timestamp with time zone,
	"booking_end_date" timestamp with time zone,
	"stay_start_date" timestamp with time zone,
	"stay_end_date" timestamp with time zone,
	"lead_department" varchar(100),
	"lead_owner_user_id" uuid,
	"lead_owner_external_assignee_id" uuid,
	"expected_impact" text,
	"owner_facing_summary" text,
	"risks_blockers" text,
	"next_steps" text,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "growth_plan_meetings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"meeting_date" timestamp with time zone NOT NULL,
	"meeting_type" varchar(100) NOT NULL,
	"title" varchar(255),
	"notes" text,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "growth_plan_tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"initiative_id" uuid NOT NULL,
	"workstream_id" uuid,
	"parent_task_id" uuid,
	"title" varchar(255) NOT NULL,
	"description" text,
	"status" "gp_task_status" NOT NULL,
	"priority" "gp_task_priority" NOT NULL,
	"due_date" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"dependency_notes" text,
	"blocker_notes" text,
	"owner_update" text,
	"internal_notes" text,
	"external_update_enabled" boolean DEFAULT false NOT NULL,
	"reminder_enabled" boolean DEFAULT false NOT NULL,
	"assigned_to" varchar(255),
	"assigned_department" varchar(100),
	"assignee_type" "gp_assignee_type",
	"assignee_user_id" uuid,
	"assignee_external_id" uuid,
	"created_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "growth_plan_workstreams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"initiative_id" uuid NOT NULL,
	"responsible_entity_type" "gp_workstream_entity_type" NOT NULL,
	"responsible_entity_name" varchar(255) NOT NULL,
	"owner_user_id" uuid,
	"owner_external_assignee_id" uuid,
	"owner_name" varchar(255),
	"responsibility_summary" text NOT NULL,
	"status" "gp_workstream_status" NOT NULL,
	"due_date" timestamp with time zone,
	"dependencies" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "growth_plan_external_assignees" ADD CONSTRAINT "growth_plan_external_assignees_hotel_id_hotel_profiles_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_initiatives" ADD CONSTRAINT "growth_plan_initiatives_property_id_hotel_profiles_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_initiatives" ADD CONSTRAINT "growth_plan_initiatives_meeting_id_growth_plan_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."growth_plan_meetings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_initiatives" ADD CONSTRAINT "growth_plan_initiatives_lead_owner_user_id_app_users_id_fk" FOREIGN KEY ("lead_owner_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_initiatives" ADD CONSTRAINT "growth_plan_initiatives_lead_owner_external_assignee_id_growth_plan_external_assignees_id_fk" FOREIGN KEY ("lead_owner_external_assignee_id") REFERENCES "public"."growth_plan_external_assignees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_initiatives" ADD CONSTRAINT "growth_plan_initiatives_created_by_user_id_app_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_meetings" ADD CONSTRAINT "growth_plan_meetings_hotel_id_hotel_profiles_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."hotel_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_meetings" ADD CONSTRAINT "growth_plan_meetings_created_by_user_id_app_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_tasks" ADD CONSTRAINT "growth_plan_tasks_initiative_id_growth_plan_initiatives_id_fk" FOREIGN KEY ("initiative_id") REFERENCES "public"."growth_plan_initiatives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_tasks" ADD CONSTRAINT "growth_plan_tasks_workstream_id_growth_plan_workstreams_id_fk" FOREIGN KEY ("workstream_id") REFERENCES "public"."growth_plan_workstreams"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_tasks" ADD CONSTRAINT "growth_plan_tasks_parent_task_id_growth_plan_tasks_id_fk" FOREIGN KEY ("parent_task_id") REFERENCES "public"."growth_plan_tasks"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_tasks" ADD CONSTRAINT "growth_plan_tasks_assignee_user_id_app_users_id_fk" FOREIGN KEY ("assignee_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_tasks" ADD CONSTRAINT "growth_plan_tasks_assignee_external_id_growth_plan_external_assignees_id_fk" FOREIGN KEY ("assignee_external_id") REFERENCES "public"."growth_plan_external_assignees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_tasks" ADD CONSTRAINT "growth_plan_tasks_created_by_user_id_app_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_workstreams" ADD CONSTRAINT "growth_plan_workstreams_initiative_id_growth_plan_initiatives_id_fk" FOREIGN KEY ("initiative_id") REFERENCES "public"."growth_plan_initiatives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_workstreams" ADD CONSTRAINT "growth_plan_workstreams_owner_user_id_app_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_plan_workstreams" ADD CONSTRAINT "growth_plan_workstreams_owner_external_assignee_id_growth_plan_external_assignees_id_fk" FOREIGN KEY ("owner_external_assignee_id") REFERENCES "public"."growth_plan_external_assignees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "gp_tasks_initiative_id_idx" ON "growth_plan_tasks" USING btree ("initiative_id");--> statement-breakpoint
CREATE INDEX "gp_tasks_status_idx" ON "growth_plan_tasks" USING btree ("status");