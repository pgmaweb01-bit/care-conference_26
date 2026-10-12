import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import JSZip from "jszip";
import {
  Download,
  FileText,
  ImageIcon,
  Link2,
  Loader2,
  Mail,
  MapPin,
  Plane,
  RefreshCw,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dataUrlExtension, downloadDataUrl, downloadText, safeFileName } from "@/lib/media";
import type { Registration, SpeakerProfile } from "@/lib/db";

export const Route = createFileRoute("/admin/speakers")({
  component: AdminSpeakers,
});

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0] ?? "")
    .filter((c) => c === c.toUpperCase() && c !== c.toLowerCase())
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function hasText(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function profileBioText(profile: SpeakerProfile | null): string {
  if (!profile || !hasText(profile.bio)) return "";
  return profile.bio.trim();
}

function profileText(reg: Registration): string {
  const p = reg.speaker_profile;
  const lines: string[] = [
    "CARE CONFERENCE 2026 - SPEAKER PROFILE",
    "======================================",
    "",
    `Registration ID: ${reg.registration_id}`,
    `Submitted:       ${formatDate(reg.created_at)}`,
    `Status:          ${reg.status}`,
    "",
    "-- PERSONAL --",
    `Full Name:          ${reg.full_name}`,
    `Title:              ${p?.title || "-"}`,
    `Gender:             ${reg.gender || "-"}`,
    `Email:              ${reg.email}`,
    `Phone:              ${reg.phone || "-"}`,
    `Organisation:       ${reg.organisation || "-"}`,
    `Position:           ${reg.position || "-"}`,
    `Nationality:        ${p?.nationality || reg.country || "-"}`,
    `Years of Experience:${p?.yearsExperience ? ` ${p.yearsExperience}` : " -"}`,
    "",
    "-- SPEAKER PROFILE --",
    `Biography:`,
    hasText(profileBioText(p)) ? profileBioText(p) : "-",
    "",
    `Areas of Expertise: ${p?.expertise || reg.profession || "-"}`,
    `Profile Link:       ${p?.profileUrl || "-"}`,
    "",
    "-- PERSONAL ASSISTANT --",
    `Name:  ${p?.paName || "-"}`,
    `Email: ${p?.paEmail || "-"}`,
    `Phone: ${p?.paPhone || "-"}`,
    "",
    "-- TRAVEL --",
    `Departure Country: ${p?.departureCountry || "-"}`,
    `Departure City:    ${p?.departureCity || "-"}`,
    `Preferred Airport: ${p?.airport || "-"}`,
    `Passport Name:     ${p?.passportName || "-"}`,
    `Passport Number:   ${p?.passportNumber || "-"}`,
    "",
    "-- FLIGHT --",
    `Airline:       ${p?.airline || "-"}`,
    `Flight Number: ${p?.flightNumber || "-"}`,
    `Arrival:       ${p?.arrivalDate || "-"} ${p?.arrivalTime || ""}`,
    `Departure:     ${p?.departureDate || "-"} ${p?.departureTime || ""}`,
    "",
    "-- ACCOMMODATION --",
    `Hotel Preference: ${p?.hotelPreference || "-"}`,
    `Room Type:        ${p?.roomType || "-"}`,
    `Dietary:          ${p?.dietary || "-"}`,
    "",
    "-- MEDIA --",
    `Headshot:      ${p?.headshot ? "attached" : "not provided"}`,
    `Photos:        ${p?.photos?.length ? `${p.photos.length} attached` : "none"}`,
    `CV / Resume:   ${p?.cv?.name || "not provided"}`,
  ];
  return lines.join("\n");
}

function photoCount(profile: SpeakerProfile | null): number {
  return profile?.photos?.length ?? 0;
}

function DetailRow({ label, value }: { label: string; value?: string | null | undefined }) {
  if (!hasText(value)) return null;
  return (
    <div className="flex gap-3 py-1.5 text-sm">
      <span className="w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="min-w-0 break-words text-foreground">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-background/60 p-4">
      <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
        {title}
      </h3>
      <div className="mt-2 divide-y divide-border/60">{children}</div>
    </section>
  );
}

function AdminSpeakers() {
  const [speakers, setSpeakers] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Registration | null>(null);
  const [zipping, setZipping] = useState(false);

  const stats = useMemo(() => {
    const withProfile = speakers.filter((s) => s.speaker_profile).length;
    const withPhotos = speakers.filter((s) => photoCount(s.speaker_profile) > 0).length;
    const withCv = speakers.filter((s) => s.speaker_profile?.cv).length;
    return { withProfile, withPhotos, withCv };
  }, [speakers]);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/speakers");
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Unexpected response");
      setSpeakers(data as Registration[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load speaker profiles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function downloadProfileTxt(reg: Registration) {
    downloadText(
      profileText(reg),
      `${safeFileName(`${reg.registration_id} ${reg.full_name}`)}.txt`,
    );
  }

  async function downloadAllZip() {
    if (zipping) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      for (const reg of speakers) {
        const dir = zip.folder(safeFileName(`${reg.registration_id} - ${reg.full_name}`));
        if (!dir) continue;
        dir.file("profile.txt", profileText(reg));
        const p = reg.speaker_profile;
        if (p?.headshot) {
          const b64 = p.headshot.split(",")[1];
          if (b64)
            dir.file(`headshot${dataUrlExtension(p.headshot) || ".jpg"}`, b64, { base64: true });
        }
        p?.photos?.forEach((photo, idx) => {
          const b64 = photo.split(",")[1];
          if (b64)
            dir.file(`photo-${idx + 1}${dataUrlExtension(photo) || ".jpg"}`, b64, { base64: true });
        });
        if (p?.cv?.dataUrl) {
          const b64 = p.cv.dataUrl.split(",")[1];
          if (b64) dir.file(safeFileName(p.cv.name || "cv"), b64, { base64: true });
        }
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "speaker-profiles.zip";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not build the ZIP file");
    } finally {
      setZipping(false);
    }
  }

  const profile = selected?.speaker_profile ?? null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Speaker Profiles</h1>
          <p className="mt-1 text-muted-foreground">
            Full details submitted through the speaker registration form — bios, photos and CVs.
          </p>
        </div>
        <button
          onClick={() => void downloadAllZip()}
          disabled={zipping || speakers.length === 0}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {zipping ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Download className="size-3.5" />
          )}
          {zipping ? "Preparing ZIP…" : "Download all (ZIP)"}
        </button>
      </div>

      {!loading && !error && speakers.length > 0 ? (
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border bg-card px-3 py-1">
            {speakers.length} speaker{speakers.length === 1 ? "" : "s"}
          </span>
          <span className="rounded-full border border-border bg-card px-3 py-1">
            {stats.withProfile} with full profiles
          </span>
          <span className="rounded-full border border-border bg-card px-3 py-1">
            {stats.withPhotos} with photos
          </span>
          <span className="rounded-full border border-border bg-card px-3 py-1">
            {stats.withCv} with CV
          </span>
        </div>
      ) : null}

      {loading ? (
        <div className="grid place-items-center gap-3 py-16 text-muted-foreground">
          <Loader2 className="size-6 animate-spin" />
          <p className="text-sm">Loading speaker profiles…</p>
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-sm text-red-700">
          <p className="font-semibold">{error}</p>
          <button
            onClick={() => void load()}
            className="mt-3 inline-flex items-center gap-2 rounded-md border border-red-300 px-3 py-1.5 font-medium transition-colors hover:bg-red-100"
          >
            <RefreshCw className="size-3.5" />
            Try again
          </button>
        </div>
      ) : speakers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
          <ImageIcon className="mx-auto size-8 text-muted-foreground/60" />
          <p className="mt-3 font-display text-lg font-bold">No speaker submissions yet</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Profiles submitted through the website's speaker registration form will appear here with
            their photos, bios and CVs.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {speakers.map((reg) => {
            const p = reg.speaker_profile;
            const photos = photoCount(p);
            return (
              <div
                key={reg.id}
                className="flex flex-col rounded-lg border border-border bg-card p-5"
              >
                <div className="flex items-start gap-3">
                  {p?.headshot ? (
                    <img
                      src={p.headshot}
                      alt={reg.full_name}
                      className="size-14 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
                    />
                  ) : (
                    <div className="grid size-14 shrink-0 place-items-center rounded-full bg-primary/10 font-display text-lg font-extrabold text-primary">
                      {initialsOf(reg.full_name) || "?"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-base font-bold" title={reg.full_name}>
                      {reg.full_name}
                    </h2>
                    <p className="truncate text-xs text-muted-foreground" title={reg.organisation}>
                      {p?.title ? `${p.title} · ` : ""}
                      {reg.organisation || reg.position || "—"}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                      {reg.registration_id} · {formatDate(reg.created_at)}
                    </p>
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {hasText(profileBioText(p)) ? profileBioText(p) : "No biography submitted yet."}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  {p ? (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                      Full profile
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-2 py-0.5 font-semibold text-muted-foreground">
                      Basic details only
                    </span>
                  )}
                  {photos > 0 ? (
                    <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-foreground/70">
                      {photos} photo{photos === 1 ? "" : "s"}
                    </span>
                  ) : null}
                  {p?.cv ? (
                    <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-foreground/70">
                      CV
                    </span>
                  ) : null}
                  {hasText(p?.profileUrl) ? (
                    <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold text-foreground/70">
                      Link
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex gap-2 border-t border-border pt-4">
                  <button
                    onClick={() => setSelected(reg)}
                    className="flex-1 rounded-md bg-primary px-3 py-2 font-display text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    View full details
                  </button>
                  <button
                    onClick={() => downloadProfileTxt(reg)}
                    title="Download profile as text file"
                    className="grid size-9 place-items-center rounded-md border border-input text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    <FileText className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
          {selected ? (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  {profile?.headshot ? (
                    <img
                      src={profile.headshot}
                      alt={selected.full_name}
                      className="size-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                  ) : (
                    <div className="grid size-16 place-items-center rounded-full bg-primary/10 font-display text-xl font-extrabold text-primary">
                      {initialsOf(selected.full_name) || "?"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <DialogTitle className="font-display text-xl font-extrabold">
                      {selected.full_name}
                    </DialogTitle>
                    <DialogDescription className="truncate">
                      {profile?.title ? `${profile.title} · ` : ""}
                      {selected.organisation || selected.position || "Speaker"}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {!profile ? (
                <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  This registration was made before profile capture — only basic registration
                  details are available. New submissions include bio, photos and CV.
                </div>
              ) : null}

              <div className="space-y-4">
                <Section title="Biography & Expertise">
                  <div className="py-2">
                    {hasText(profileBioText(profile)) ? (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {profileBioText(profile)}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No biography submitted.</p>
                    )}
                  </div>
                  <DetailRow label="Expertise" value={profile?.expertise || selected.profession} />
                  <DetailRow label="Years of Experience" value={profile?.yearsExperience} />
                  {hasText(profile?.profileUrl) ? (
                    <div className="flex gap-3 py-1.5 text-sm">
                      <span className="w-44 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Profile Link
                      </span>
                      <a
                        href={profile.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-w-0 items-center gap-1 break-all text-primary hover:underline"
                      >
                        <Link2 className="size-3.5 shrink-0" />
                        {profile.profileUrl}
                      </a>
                    </div>
                  ) : null}
                </Section>

                <Section title="Media">
                  <div className="space-y-4 py-2">
                    {profile?.headshot ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={profile.headshot}
                          alt={`${selected.full_name} headshot`}
                          className="size-24 rounded-lg object-cover ring-1 ring-border"
                        />
                        <div>
                          <p className="text-sm font-semibold">Professional headshot</p>
                          <button
                            onClick={() =>
                              downloadDataUrl(
                                profile.headshot ?? "",
                                `headshot-${safeFileName(selected.full_name)}${
                                  dataUrlExtension(profile.headshot ?? "") || ".jpg"
                                }`,
                              )
                            }
                            className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-input px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary"
                          >
                            <Download className="size-3.5" />
                            Download
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No headshot uploaded.</p>
                    )}

                    {photoCount(profile) > 0 ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Additional photos ({photoCount(profile)})
                        </p>
                        <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
                          {profile?.photos?.map((photo, idx) => (
                            <div
                              key={idx}
                              className="group relative overflow-hidden rounded-md border border-border"
                            >
                              <img
                                src={photo}
                                alt={`${selected.full_name} photo ${idx + 1}`}
                                className="aspect-square w-full object-cover"
                              />
                              <button
                                onClick={() =>
                                  downloadDataUrl(
                                    photo,
                                    `photo-${idx + 1}-${safeFileName(selected.full_name)}${
                                      dataUrlExtension(photo) || ".jpg"
                                    }`,
                                  )
                                }
                                title="Download photo"
                                className="absolute right-1 top-1 grid size-7 place-items-center rounded-md bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                              >
                                <Download className="size-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {profile?.cv ? (
                      <div className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{profile.cv.name}</p>
                          <p className="text-[11px] text-muted-foreground">CV / Resume</p>
                        </div>
                        <button
                          onClick={() =>
                            downloadDataUrl(profile.cv?.dataUrl ?? "", profile.cv?.name ?? "cv.pdf")
                          }
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-input px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary"
                        >
                          <Download className="size-3.5" />
                          Download
                        </button>
                      </div>
                    ) : null}
                  </div>
                </Section>

                <Section title="Personal Details">
                  <DetailRow label="Email" value={selected.email} />
                  <DetailRow label="Phone" value={selected.phone} />
                  <DetailRow label="Gender" value={selected.gender} />
                  <DetailRow label="Nationality" value={profile?.nationality || selected.country} />
                  <DetailRow label="Position" value={selected.position} />
                  <DetailRow label="Profession" value={selected.profession} />
                  <DetailRow label="Status" value={selected.status} />
                </Section>

                <Section title="Personal Assistant">
                  <DetailRow label="Name" value={profile?.paName} />
                  <DetailRow label="Email" value={profile?.paEmail} />
                  <DetailRow label="Phone" value={profile?.paPhone} />
                  {!hasText(profile?.paName) &&
                  !hasText(profile?.paEmail) &&
                  !hasText(profile?.paPhone) ? (
                    <p className="py-2 text-sm text-muted-foreground">Not provided.</p>
                  ) : null}
                </Section>

                <Section title="Travel & Documents">
                  <DetailRow label="Departure Country" value={profile?.departureCountry} />
                  <DetailRow label="Departure City" value={profile?.departureCity} />
                  <DetailRow label="Preferred Airport" value={profile?.airport} />
                  <DetailRow label="Passport Name" value={profile?.passportName} />
                  <DetailRow label="Passport Number" value={profile?.passportNumber} />
                </Section>

                <Section title="Flight">
                  <DetailRow label="Airline" value={profile?.airline} />
                  <DetailRow label="Flight Number" value={profile?.flightNumber} />
                  <DetailRow
                    label="Arrival"
                    value={
                      hasText(profile?.arrivalDate)
                        ? `${profile.arrivalDate} ${profile.arrivalTime ?? ""}`.trim()
                        : undefined
                    }
                  />
                  <DetailRow
                    label="Departure"
                    value={
                      hasText(profile?.departureDate)
                        ? `${profile.departureDate} ${profile.departureTime ?? ""}`.trim()
                        : undefined
                    }
                  />
                </Section>

                <Section title="Accommodation">
                  <DetailRow label="Hotel Preference" value={profile?.hotelPreference} />
                  <DetailRow label="Room Type" value={profile?.roomType} />
                  <DetailRow label="Dietary Requirements" value={profile?.dietary} />
                </Section>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="size-3.5" />
                    {selected.email}
                  </span>
                  {selected.city || selected.country ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-3.5" />
                      {[selected.city, selected.country].filter(Boolean).join(", ")}
                    </span>
                  ) : null}
                  {profile?.flightNumber ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Plane className="size-3.5" />
                      {profile.flightNumber}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5">
                    <User className="size-3.5" />
                    {selected.registration_id}
                  </span>
                </div>
                <button
                  onClick={() => downloadProfileTxt(selected)}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Download className="size-3.5" />
                  Download profile (.txt)
                </button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
