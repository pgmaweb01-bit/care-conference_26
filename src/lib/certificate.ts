import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, type PDFFont, rgb } from "pdf-lib";
import { CERTIFICATE_TEMPLATE_BASE64, MONTSERRAT_BOLD_BASE64 } from "./certificate-assets";

// Coordinates measured from the Canva export's text layer. The original
// placeholder ("Full Name of Participants") sat at x=191..601, baseline 339,
// rendered at 41.18pt scaled by 0.75 — i.e. 30.885pt in PDF page space.
const NAME_CENTER_X = 396;
const NAME_BASELINE_Y = 339;
const NAME_MAX_WIDTH = 410;
const BASE_SIZE = 41.18 * 0.75;

let templateCache: Uint8Array | null = null;
let fontCache: Uint8Array | null = null;

function getTemplate(): Uint8Array {
  if (!templateCache) {
    templateCache = Buffer.from(CERTIFICATE_TEMPLATE_BASE64, "base64");
  }
  return templateCache;
}

function getFont(): Uint8Array {
  if (!fontCache) {
    fontCache = Buffer.from(MONTSERRAT_BOLD_BASE64, "base64");
  }
  return fontCache;
}

/** Renders the Canva certificate with `name` in place of the placeholder. */
export async function renderCertificatePdf(name: string): Promise<Uint8Array> {
  const trimmed = String(name || "")
    .trim()
    .replace(/\s+/g, " ");
  if (!trimmed) throw new Error("Certificate name is required");

  const doc = await PDFDocument.load(getTemplate());
  doc.registerFontkit(fontkit as never);
  const font = await doc.embedFont(getFont(), { subset: true });

  let size = BASE_SIZE;
  let width = font.widthOfTextAtSize(trimmed, size);
  if (width > NAME_MAX_WIDTH) {
    size = (size * NAME_MAX_WIDTH) / width;
    width = font.widthOfTextAtSize(trimmed, size);
  }

  pageDraw(doc, font, trimmed, size, width);
  return doc.save();
}

function pageDraw(
  doc: PDFDocument,
  font: PDFFont,
  name: string,
  size: number,
  width: number,
): void {
  doc.getPage(0).drawText(name, {
    x: NAME_CENTER_X - width / 2,
    y: NAME_BASELINE_Y,
    size,
    font,
    color: rgb(0, 0, 0),
  });
}

export function certificateFilename(name: string): string {
  const slug = String(name || "attendee")
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return `Care-Conference-2026-Certificate-${slug || "attendee"}.pdf`;
}
