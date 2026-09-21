export function registrationEmailHTML(data: {
  fullName: string;
  registrationId: string;
  qrCodeDataURL: string;
  type: string;
}): string {
  const isSpeaker = data.type === "speaker";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmation - Care Conference 2026</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                The Care Conference 2026
              </h1>
              <p style="margin: 8px 0 0; color: #a78bfa; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                Care as Infrastructure
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 16px; color: #1a0a2e; font-size: 24px; font-weight: 700;">
                ${isSpeaker ? "Speaker Profile Received!" : "You're Registered!"}
              </h2>
              <p style="margin: 0 0 24px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Dear <strong>${data.fullName}</strong>,
              </p>
              <p style="margin: 0 0 24px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                ${isSpeaker
                  ? "Thank you for submitting your speaker profile for The Care Conference 2026. Our Speaker Coordinator will be in touch within 5 business days."
                  : "Thank you for registering for The Care Conference 2026! Your registration has been confirmed. Please find your unique QR code below."}
              </p>

              ${!isSpeaker ? `
              <!-- QR Code Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td align="center" style="background-color: #f8f9fa; border-radius: 12px; padding: 30px;">
                    <p style="margin: 0 0 8px; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                      Your Check-In QR Code
                    </p>
                    <img src="${data.qrCodeDataURL}" alt="QR Code" style="width: 200px; height: 200px; margin: 16px 0;" />
                    <p style="margin: 0 0 4px; color: #1a0a2e; font-size: 14px; font-weight: 600;">
                      Registration ID
                    </p>
                    <p style="margin: 0; color: #1a0a2e; font-size: 20px; font-weight: 800; font-family: monospace; letter-spacing: 2px;">
                      ${data.registrationId}
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                      <strong>Important:</strong> Present this QR code at the venue for instant check-in. Save this email or screenshot the QR code for easy access.
                    </p>
                  </td>
                </tr>
              </table>
              ` : ""}
            </td>
          </tr>

          <!-- Event Details -->
          <tr>
            <td style="padding: 0 30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4ff; border-radius: 12px; padding: 24px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 16px; color: #1a0a2e; font-size: 18px; font-weight: 700;">
                      Event Details
                    </h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #4a5568; font-size: 14px; width: 120px;">
                          <strong>Date:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #1a0a2e; font-size: 14px;">
                          19 November 2026
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #4a5568; font-size: 14px;">
                          <strong>Time:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #1a0a2e; font-size: 14px;">
                          08:00 - 17:45 WAT
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #4a5568; font-size: 14px;">
                          <strong>Venue:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #1a0a2e; font-size: 14px;">
                          IALA Hub, The Chair Centre, Lagos
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a0a2e; padding: 30px; text-align: center;">
              <p style="margin: 0 0 8px; color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                The Purple Global Mission
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Questions? Contact us at thepurpleglobalmission@gmail.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
