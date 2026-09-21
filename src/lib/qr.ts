import QRCode from "qrcode";

export async function generateQRCodeDataURL(registrationId: string): Promise<string> {
  const qrValue = JSON.stringify({
    event: "CARE_CONFERENCE_2026",
    id: registrationId,
    checkin: `https://careconference.ng/checkin/${registrationId}`,
  });

  const dataUrl = await QRCode.toDataURL(qrValue, {
    width: 300,
    margin: 2,
    color: {
      dark: "#1a0a2e",
      light: "#ffffff",
    },
  });

  return dataUrl;
}

export function generateQRCodeBuffer(registrationId: string): Promise<Buffer> {
  const qrValue = JSON.stringify({
    event: "CARE_CONFERENCE_2026",
    id: registrationId,
    checkin: `https://careconference.ng/checkin/${registrationId}`,
  });

  return QRCode.toBuffer(qrValue, {
    width: 300,
    margin: 2,
    color: {
      dark: "#1a0a2e",
      light: "#ffffff",
    },
  });
}
