import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function setup() {
  await sql`
    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      registration_id VARCHAR(20) UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT DEFAULT '',
      organisation TEXT DEFAULT '',
      type VARCHAR(20) NOT NULL DEFAULT 'attendee',
      gender TEXT DEFAULT '',
      country TEXT DEFAULT '',
      state TEXT DEFAULT '',
      city TEXT DEFAULT '',
      profession TEXT DEFAULT '',
      position TEXT DEFAULT '',
      side_room1 TEXT DEFAULT '',
      side_room2 TEXT DEFAULT '',
      category TEXT DEFAULT '',
      status VARCHAR(20) NOT NULL DEFAULT 'Confirmed',
      checked_in BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("Table 'registrations' created successfully.");

  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      setting_key TEXT PRIMARY KEY,
      setting_value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  await sql`
    INSERT INTO site_settings (setting_key, setting_value)
    VALUES ('registration_open', 'true')
    ON CONFLICT (setting_key) DO NOTHING;
  `;
  console.log("Table 'site_settings' created successfully.");

  await sql`
    CREATE TABLE IF NOT EXISTS photo_access (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      access_count INT NOT NULL DEFAULT 1,
      first_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log("Table 'photo_access' created successfully.");
}

setup().catch(console.error);
