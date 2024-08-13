BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "bookings" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"booking_id"	integer,
	"number_of_customers"	integer,
	"date"	datetime,
	"table_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "employees" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"employee_id"	integer,
	"first_name"	text,
	"last_name"	text,
	"username"	text,
	"password"	text,
	"regiter_date"	datetime,
	CONSTRAINT "fk_bookings_employee_id" FOREIGN KEY("employee_id") REFERENCES "bookings"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "members" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"member_id"	integer,
	"first_name"	text,
	"lastname"	text,
	"phone_number"	text,
	"point"	integer,
	"regiter_date"	datetime,
	CONSTRAINT "fk_bookings_member_id" FOREIGN KEY("member_id") REFERENCES "bookings"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "packages" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"package_id"	integer,
	"name"	text,
	"price"	integer,
	"point_id"	integer,
	CONSTRAINT "fk_bookings_package_id" FOREIGN KEY("package_id") REFERENCES "bookings"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "soups" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"soup_id"	integer,
	"name"	text,
	"price"	integer,
	CONSTRAINT "fk_bookings_soup1_id" FOREIGN KEY("soup_id") REFERENCES "bookings"("id"),
	CONSTRAINT "fk_bookings_soup2_id" FOREIGN KEY("soup_id") REFERENCES "bookings"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "tables" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"table_id"	integer,
	"table_type"	integer,
	"price"	integer,
	CONSTRAINT "fk_bookings_table" FOREIGN KEY("table_id") REFERENCES "bookings"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "table_statuses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"table_status_id"	integer,
	"status"	text,
	CONSTRAINT "fk_tables_table_status_id" FOREIGN KEY("table_status_id") REFERENCES "tables"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "points" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"point_id"	integer,
	"name"	text,
	"price"	integer,
	CONSTRAINT "fk_packages_points" FOREIGN KEY("point_id") REFERENCES "packages"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_bookings_deleted_at" ON "bookings" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_employees_deleted_at" ON "employees" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_members_deleted_at" ON "members" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_packages_deleted_at" ON "packages" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_soups_deleted_at" ON "soups" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_tables_deleted_at" ON "tables" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_table_statuses_deleted_at" ON "table_statuses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_points_deleted_at" ON "points" (
	"deleted_at"
);
COMMIT;
