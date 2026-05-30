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
ALTER INDEX "hotel_profiles_property_code_unique" RENAME TO "property_profiles_property_code_unique";