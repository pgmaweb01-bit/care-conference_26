import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface Registration {
  id: number;
  registration_id: string;
  full_name: string;
  email: string;
  phone: string;
  organisation: string;
  type: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  profession: string;
  position: string;
  side_room1: string;
  side_room2: string;
  category: string;
  status: string;
  checked_in: boolean;
  created_at: string;
}

export async function getRegistrations(): Promise<Registration[]> {
  const rows = await sql`
    SELECT * FROM registrations ORDER BY created_at DESC
  `;
  return rows as Registration[];
}

export async function getRegistrationStats() {
  const rows = await sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'Confirmed')::int AS confirmed,
      COUNT(*) FILTER (WHERE checked_in = true)::int AS "checkedIn",
      COUNT(*) FILTER (WHERE type = 'speaker')::int AS speakers
    FROM registrations
  `;
  return rows[0] as { total: number; confirmed: number; checkedIn: number; speakers: number };
}

export async function addRegistration(data: {
  registrationId: string;
  fullName: string;
  email: string;
  phone?: string;
  organisation?: string;
  type?: string;
  gender?: string;
  country?: string;
  state?: string;
  city?: string;
  profession?: string;
  position?: string;
  sideRoom1?: string;
  sideRoom2?: string;
  category?: string;
}): Promise<Registration> {
  const rows = await sql`
    INSERT INTO registrations (registration_id, full_name, email, phone, organisation, type, gender, country, state, city, profession, position, side_room1, side_room2, category)
    VALUES (${data.registrationId}, ${data.fullName}, ${data.email}, ${data.phone || ""}, ${data.organisation || ""}, ${data.type || "attendee"}, ${data.gender || ""}, ${data.country || ""}, ${data.state || ""}, ${data.city || ""}, ${data.profession || ""}, ${data.position || ""}, ${data.sideRoom1 || ""}, ${data.sideRoom2 || ""}, ${data.category || ""})
    RETURNING *
  `;
  return rows[0] as Registration;
}
