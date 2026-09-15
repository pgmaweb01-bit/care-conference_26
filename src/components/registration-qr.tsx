import { QRCodeSVG } from "qrcode.react";

export function generateRegistrationId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "CC26-";
  for (let i = 0; i < 8; i++) {
    if (i === 4) id += "-";
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function RegistrationQR({
  registrationId,
  size = 200,
}: {
  registrationId: string;
  size?: number;
}) {
  const qrValue = JSON.stringify({
    event: "CARE_CONFERENCE_2026",
    id: registrationId,
    checkin: `https://careconference.ng/checkin/${registrationId}`,
  });

  return (
    <div className="inline-flex flex-col items-center gap-3">
      <div className="rounded-lg border border-border bg-white p-4">
        <QRCodeSVG
          value={qrValue}
          size={size}
          level="M"
          bgColor="#ffffff"
          fgColor="#1a0a2e"
          imageSettings={{
            src: "",
            height: 0,
            width: 0,
            excavate: false,
          }}
        />
      </div>
      <div className="text-center">
        <p className="eyebrow text-muted-foreground">Registration ID</p>
        <p className="mt-1 font-mono text-lg font-bold tracking-wider">{registrationId}</p>
      </div>
    </div>
  );
}
