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

export interface PitchApplication {
  id: number;
  application_id: string;
  full_name: string;
  role_at_company: string;
  phone: string;
  email: string;
  linkedin: string;
  company_name: string;
  started_when: string;
  cac_registration: string;
  cac_number: string;
  based_in: string;
  states_working: string;
  team_size: string;
  website_social: string;
  what_company_does: string;
  problem_solving: string;
  care_at_home_impact: string;
  areas_touched: string;
  current_stage: string;
  clients_served: string;
  proud_of: string;
  raised_money: string;
  raising_now: string;
  who_pitches: string;
  show_method: string;
  pitch_deck_url: string;
  day_needs: string;
  confirmations: string;
  status: string;
  created_at: string;
}

export async function getPitchApplications(): Promise<PitchApplication[]> {
  const rows = await sql`
    SELECT * FROM pitch_applications ORDER BY created_at DESC
  `;
  return rows as PitchApplication[];
}

export async function getPitchApplicationStats() {
  const rows = await sql`
    SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'New')::int AS "newApplications",
      COUNT(*) FILTER (WHERE status = 'Selected')::int AS selected,
      COUNT(*) FILTER (WHERE status = 'Declined')::int AS declined
    FROM pitch_applications
  `;
  return rows[0] as { total: number; newApplications: number; selected: number; declined: number };
}

export async function addPitchApplication(data: {
  applicationId: string;
  fullName: string;
  roleAtCompany: string;
  phone: string;
  email: string;
  linkedin?: string;
  companyName: string;
  startedWhen: string;
  cacRegistration: string;
  cacNumber?: string;
  basedIn: string;
  statesWorking: string;
  teamSize: string;
  websiteSocial?: string;
  whatCompanyDoes: string;
  problemSolving: string;
  careAtHomeImpact: string;
  areasTouched: string[];
  currentStage: string;
  clientsServed: string;
  proudOf?: string;
  raisedMoney: string;
  raisingNow?: string;
  whoPitches: string;
  showMethod: string;
  pitchDeckUrl: string;
  dayNeeds?: string;
  confirmations: string[];
}): Promise<PitchApplication> {
  const rows = await sql`
    INSERT INTO pitch_applications (
      application_id, full_name, role_at_company, phone, email, linkedin,
      company_name, started_when, cac_registration, cac_number, based_in, states_working,
      team_size, website_social, what_company_does, problem_solving, care_at_home_impact,
      areas_touched, current_stage, clients_served, proud_of, raised_money, raising_now,
      who_pitches, show_method, pitch_deck_url, day_needs, confirmations
    )
    VALUES (
      ${data.applicationId}, ${data.fullName}, ${data.roleAtCompany}, ${data.phone}, ${data.email}, ${data.linkedin || ""},
      ${data.companyName}, ${data.startedWhen}, ${data.cacRegistration}, ${data.cacNumber || ""}, ${data.basedIn}, ${data.statesWorking},
      ${data.teamSize}, ${data.websiteSocial || ""}, ${data.whatCompanyDoes}, ${data.problemSolving}, ${data.careAtHomeImpact},
      ${JSON.stringify(data.areasTouched)}::jsonb, ${data.currentStage}, ${data.clientsServed}, ${data.proudOf || ""}, ${data.raisedMoney}, ${data.raisingNow || ""},
      ${data.whoPitches}, ${data.showMethod}, ${data.pitchDeckUrl}, ${data.dayNeeds || ""}, ${JSON.stringify(data.confirmations)}::jsonb
    )
    RETURNING *
  `;
  return rows[0] as PitchApplication;
}
