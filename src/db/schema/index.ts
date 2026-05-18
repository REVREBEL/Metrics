import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

export const roleTypeEnum = pgEnum("role_type", ["admin", "manager", "analyst", "viewer"])
export const taskStatusEnum = pgEnum("task_status", ["todo", "in_progress", "blocked", "done"])
export const eventTypeEnum = pgEnum("event_type", ["meeting", "call", "onsite", "milestone", "other"])
export const campaignStatusEnum = pgEnum("campaign_status", ["draft", "active", "paused", "archived"])

export const appUsers = pgTable(
  "app_users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    displayName: varchar("display_name", { length: 255 }),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("app_users_clerk_user_id_uq").on(table.clerkUserId)]
)

export const userRoles = pgTable(
  "user_roles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => appUsers.id, { onDelete: "cascade" }),
    role: roleTypeEnum("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("user_roles_user_role_uq").on(table.userId, table.role)]
)

export const hotelProfiles = pgTable("hotel_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyCode: varchar("property_code", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  timezone: varchar("timezone", { length: 64 }),
  market: varchar("market", { length: 255 }),
  profileData: jsonb("profile_data").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const hotelUserAccess = pgTable(
  "hotel_user_access",
  {
    userId: uuid("user_id").notNull().references(() => appUsers.id, { onDelete: "cascade" }),
    hotelId: uuid("hotel_id").notNull().references(() => hotelProfiles.id, { onDelete: "cascade" }),
    canEdit: boolean("can_edit").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.hotelId] })]
)

export const hotelNotes = pgTable("hotel_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotelId: uuid("hotel_id").notNull().references(() => hotelProfiles.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  createdByUserId: uuid("created_by_user_id").references(() => appUsers.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const hotelEvents = pgTable("hotel_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotelId: uuid("hotel_id").notNull().references(() => hotelProfiles.id, { onDelete: "cascade" }),
  eventType: eventTypeEnum("event_type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  details: text("details"),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  createdByUserId: uuid("created_by_user_id").references(() => appUsers.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const hotelTaskStatuses = pgTable("hotel_task_statuses", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: taskStatusEnum("code").notNull().unique(),
  label: varchar("label", { length: 100 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
})

export const hotelTasks = pgTable("hotel_tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotelId: uuid("hotel_id").notNull().references(() => hotelProfiles.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  statusId: uuid("status_id").references(() => hotelTaskStatuses.id),
  assigneeUserId: uuid("assignee_user_id").references(() => appUsers.id),
  dueDate: timestamp("due_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const hotelTaskComments = pgTable("hotel_task_comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  taskId: uuid("task_id").notNull().references(() => hotelTasks.id, { onDelete: "cascade" }),
  authorUserId: uuid("author_user_id").references(() => appUsers.id),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotelId: uuid("hotel_id").notNull().references(() => hotelProfiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  status: campaignStatusEnum("status").default("draft").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const campaignTrackingRules = pgTable("campaign_tracking_rules", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  rule: jsonb("rule").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const campaignMetricSelections = pgTable(
  "campaign_metric_selections",
  {
    campaignId: uuid("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
    metricKey: varchar("metric_key", { length: 128 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.campaignId, table.metricKey] })]
)

export const strategyTemplates = pgTable("strategy_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  content: jsonb("content").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const hotelStrategyNotes = pgTable("hotel_strategy_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotelId: uuid("hotel_id").notNull().references(() => hotelProfiles.id, { onDelete: "cascade" }),
  strategyTemplateId: uuid("strategy_template_id").references(() => strategyTemplates.id),
  note: text("note").notNull(),
  createdByUserId: uuid("created_by_user_id").references(() => appUsers.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const dataLibraryTables = pgTable("data_library_tables", {
  id: uuid("id").defaultRandom().primaryKey(),
  tableName: varchar("table_name", { length: 255 }).notNull().unique(),
  displayName: varchar("display_name", { length: 255 }),
  description: text("description"),
  uiMetadata: jsonb("ui_metadata").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const lookupTableDraftEdits = pgTable("lookup_table_draft_edits", {
  id: uuid("id").defaultRandom().primaryKey(),
  dataLibraryTableId: uuid("data_library_table_id")
    .notNull()
    .references(() => dataLibraryTables.id, { onDelete: "cascade" }),
  rowIdentifier: varchar("row_identifier", { length: 255 }).notNull(),
  draftPayload: jsonb("draft_payload").$type<Record<string, unknown>>().notNull(),
  createdByUserId: uuid("created_by_user_id").references(() => appUsers.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const lookupTableChangeRequests = pgTable("lookup_table_change_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  draftEditId: uuid("draft_edit_id").references(() => lookupTableDraftEdits.id, { onDelete: "set null" }),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  rationale: text("rationale"),
  requestedByUserId: uuid("requested_by_user_id").references(() => appUsers.id),
  approvedByUserId: uuid("approved_by_user_id").references(() => appUsers.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

export const appAuditLog = pgTable(
  "app_audit_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorUserId: uuid("actor_user_id").references(() => appUsers.id, { onDelete: "set null" }),
    entityType: varchar("entity_type", { length: 120 }).notNull(),
    entityId: varchar("entity_id", { length: 255 }).notNull(),
    action: varchar("action", { length: 120 }).notNull(),
    beforeState: jsonb("before_state").$type<Record<string, unknown>>(),
    afterState: jsonb("after_state").$type<Record<string, unknown>>(),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("app_audit_log_entity_idx").on(table.entityType, table.entityId),
    index("app_audit_log_created_at_idx").on(table.createdAt),
  ]
)
