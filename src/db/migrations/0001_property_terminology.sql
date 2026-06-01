-- DOMAIN NAMING RULE: Metrics uses property terminology for app-owned schema.
-- This migration converts legacy hotel-prefixed app objects to property terminology.
ALTER TABLE "hotel_profiles" RENAME TO "property_profiles";--> statement-breakpoint
ALTER TABLE "hotel_user_access" RENAME TO "property_user_access";--> statement-breakpoint
ALTER TABLE "hotel_notes" RENAME TO "property_notes";--> statement-breakpoint
ALTER TABLE "hotel_events" RENAME TO "property_events";--> statement-breakpoint
ALTER TABLE "hotel_task_statuses" RENAME TO "property_task_statuses";--> statement-breakpoint
ALTER TABLE "hotel_tasks" RENAME TO "property_tasks";--> statement-breakpoint
ALTER TABLE "hotel_task_comments" RENAME TO "property_task_comments";--> statement-breakpoint
ALTER TABLE "hotel_strategy_notes" RENAME TO "property_strategy_notes";--> statement-breakpoint
ALTER TABLE "property_user_access" RENAME COLUMN "hotel_id" TO "property_id";--> statement-breakpoint
ALTER TABLE "property_notes" RENAME COLUMN "hotel_id" TO "property_id";--> statement-breakpoint
ALTER TABLE "property_events" RENAME COLUMN "hotel_id" TO "property_id";--> statement-breakpoint
ALTER TABLE "property_tasks" RENAME COLUMN "hotel_id" TO "property_id";--> statement-breakpoint
ALTER TABLE "property_strategy_notes" RENAME COLUMN "hotel_id" TO "property_id";--> statement-breakpoint
ALTER TABLE "campaigns" RENAME COLUMN "hotel_id" TO "property_id";--> statement-breakpoint
ALTER TABLE "property_profiles" RENAME CONSTRAINT "hotel_profiles_property_code_unique" TO "property_profiles_property_code_unique";--> statement-breakpoint
ALTER TABLE "property_user_access" RENAME CONSTRAINT "hotel_user_access_user_id_hotel_id_pk" TO "property_user_access_user_id_property_id_pk";--> statement-breakpoint
ALTER TABLE "property_user_access" RENAME CONSTRAINT "hotel_user_access_user_id_app_users_id_fk" TO "property_user_access_user_id_app_users_id_fk";--> statement-breakpoint
ALTER TABLE "property_user_access" RENAME CONSTRAINT "hotel_user_access_hotel_id_hotel_profiles_id_fk" TO "property_user_access_property_id_property_profiles_id_fk";--> statement-breakpoint
ALTER TABLE "property_notes" RENAME CONSTRAINT "hotel_notes_hotel_id_hotel_profiles_id_fk" TO "property_notes_property_id_property_profiles_id_fk";--> statement-breakpoint
ALTER TABLE "property_notes" RENAME CONSTRAINT "hotel_notes_created_by_user_id_app_users_id_fk" TO "property_notes_created_by_user_id_app_users_id_fk";--> statement-breakpoint
ALTER TABLE "property_events" RENAME CONSTRAINT "hotel_events_hotel_id_hotel_profiles_id_fk" TO "property_events_property_id_property_profiles_id_fk";--> statement-breakpoint
ALTER TABLE "property_events" RENAME CONSTRAINT "hotel_events_created_by_user_id_app_users_id_fk" TO "property_events_created_by_user_id_app_users_id_fk";--> statement-breakpoint
ALTER TABLE "property_task_statuses" RENAME CONSTRAINT "hotel_task_statuses_code_unique" TO "property_task_statuses_code_unique";--> statement-breakpoint
ALTER TABLE "property_tasks" RENAME CONSTRAINT "hotel_tasks_hotel_id_hotel_profiles_id_fk" TO "property_tasks_property_id_property_profiles_id_fk";--> statement-breakpoint
ALTER TABLE "property_tasks" RENAME CONSTRAINT "hotel_tasks_status_id_hotel_task_statuses_id_fk" TO "property_tasks_status_id_property_task_statuses_id_fk";--> statement-breakpoint
ALTER TABLE "property_tasks" RENAME CONSTRAINT "hotel_tasks_assignee_user_id_app_users_id_fk" TO "property_tasks_assignee_user_id_app_users_id_fk";--> statement-breakpoint
ALTER TABLE "property_task_comments" RENAME CONSTRAINT "hotel_task_comments_task_id_hotel_tasks_id_fk" TO "property_task_comments_task_id_property_tasks_id_fk";--> statement-breakpoint
ALTER TABLE "property_task_comments" RENAME CONSTRAINT "hotel_task_comments_author_user_id_app_users_id_fk" TO "property_task_comments_author_user_id_app_users_id_fk";--> statement-breakpoint
ALTER TABLE "property_strategy_notes" RENAME CONSTRAINT "hotel_strategy_notes_hotel_id_hotel_profiles_id_fk" TO "property_strategy_notes_property_id_property_profiles_id_fk";--> statement-breakpoint
ALTER TABLE "property_strategy_notes" RENAME CONSTRAINT "hotel_strategy_notes_strategy_template_id_strategy_templates_id_fk" TO "property_strategy_notes_strategy_template_id_strategy_templates_id_fk";--> statement-breakpoint
ALTER TABLE "property_strategy_notes" RENAME CONSTRAINT "hotel_strategy_notes_created_by_user_id_app_users_id_fk" TO "property_strategy_notes_created_by_user_id_app_users_id_fk";--> statement-breakpoint
ALTER TABLE "campaigns" RENAME CONSTRAINT "campaigns_hotel_id_hotel_profiles_id_fk" TO "campaigns_property_id_property_profiles_id_fk";