BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "points" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"point_id"	integer,
	"point"	text,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_packages_point" FOREIGN KEY("point_id") REFERENCES "packages"("id")
);
CREATE TABLE IF NOT EXISTS "table_statuses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"table_status_id"	integer,
	"status"	text,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_tables_table_status_id" FOREIGN KEY("table_status_id") REFERENCES "tables"("id")
);
CREATE TABLE IF NOT EXISTS "soups" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"soup_id"	integer,
	"name"	text,
	"price"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "bookings" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"booking_id"	integer,
	"number_of_customers"	integer,
	"date"	datetime,
	"soup1_id"	integer,
	"soup2_id"	integer,
	"soup3_id"	integer,
	"soup4_id"	integer,
	"package_id"	integer,
	"table_id"	integer,
	"member_id"	integer,
	"employee_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_bookings_soup1" FOREIGN KEY("soup1_id") REFERENCES "soups"("id"),
	CONSTRAINT "fk_bookings_member" FOREIGN KEY("member_id") REFERENCES "members"("id"),
	CONSTRAINT "fk_employees_booking" FOREIGN KEY("employee_id") REFERENCES "employees"("id"),
	CONSTRAINT "fk_bookings_soup2" FOREIGN KEY("soup2_id") REFERENCES "soups"("id"),
	CONSTRAINT "fk_bookings_soup3" FOREIGN KEY("soup3_id") REFERENCES "soups"("id"),
	CONSTRAINT "fk_bookings_soup4" FOREIGN KEY("soup4_id") REFERENCES "soups"("id"),
	CONSTRAINT "fk_orders_booking" FOREIGN KEY("booking_id") REFERENCES "orders"("id")
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
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_bookings_package" FOREIGN KEY("package_id") REFERENCES "bookings"("id")
);
CREATE TABLE IF NOT EXISTS "tables" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"table_id"	integer,
	"table_type"	integer,
	"price"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_bookings_table" FOREIGN KEY("table_id") REFERENCES "bookings"("id")
);
INSERT INTO "table_statuses" VALUES (1,'2024-08-16 21:57:44.0653408+07:00','2024-08-16 21:57:44.0653408+07:00',NULL,0,'Available');
INSERT INTO "table_statuses" VALUES (2,'2024-08-16 21:57:44.0673459+07:00','2024-08-16 21:57:44.0673459+07:00',NULL,0,'Busy');
INSERT INTO "table_statuses" VALUES (3,'2024-08-16 21:57:44.070343+07:00','2024-08-16 21:57:44.070343+07:00',NULL,0,'Not Ready');
INSERT INTO "soups" VALUES (1,'2024-08-16 21:57:44.0808609+07:00','2024-08-16 21:57:44.0808609+07:00',NULL,0,'น้ำใส',0);
INSERT INTO "soups" VALUES (2,'2024-08-16 21:57:44.085782+07:00','2024-08-16 21:57:44.085782+07:00',NULL,0,'น้ำดำ',0);
INSERT INTO "soups" VALUES (3,'2024-08-16 21:57:44.0868217+07:00','2024-08-16 21:57:44.0868217+07:00',NULL,0,'ซุปหม่าล่า',0);
INSERT INTO "soups" VALUES (4,'2024-08-16 21:57:44.0889576+07:00','2024-08-16 21:57:44.0889576+07:00',NULL,0,'ซุปทงคัตสึ',0);
INSERT INTO "packages" VALUES (1,'2024-08-16 21:57:44.090014+07:00','2024-08-16 21:57:44.090014+07:00',NULL,0,'หมู, ไก่',0,NULL);
INSERT INTO "packages" VALUES (2,'2024-08-16 21:57:44.0915901+07:00','2024-08-16 21:57:44.0915901+07:00',NULL,0,'ทะเล',0,NULL);
INSERT INTO "packages" VALUES (3,'2024-08-16 21:57:44.0926518+07:00','2024-08-16 21:57:44.0926518+07:00',NULL,0,'เนื้อ',0,NULL);
CREATE INDEX IF NOT EXISTS "idx_points_deleted_at" ON "points" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_table_statuses_deleted_at" ON "table_statuses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_soups_deleted_at" ON "soups" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_bookings_deleted_at" ON "bookings" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_packages_deleted_at" ON "packages" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_tables_deleted_at" ON "tables" (
	"deleted_at"
);
COMMIT;
