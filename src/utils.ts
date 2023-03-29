import { PDFDocument, StandardFonts } from "pdf-lib";
import {
  AutoGeneratedFieldProperties,
  FieldCollection,
  Fields,
  UserGeneratedFieldProperties,
} from "./fieldTypes";

import type { FieldState } from "./components/Form";

interface EmailMessageProps {
  attachment: Uint8Array;
  message: string;
  recipients: Array<string>;
  subject: string;
}

interface WriteDataToPdfProps {
  collections: Array<FieldCollection>;
  fields: Fields;
  formState: FieldState;
  pdf: PDFDocument;
}

/**
 *
 * @param e - MouseEvent
 * @param page - Page number
 */
function addClickEventToCanvas(e: React.MouseEvent, page: number) {
  const mouseX = e.pageX;
  const mouseY = 792 - e.pageY;
  console.log(`Position: (${mouseX}, ${mouseY}) for page: ${page}`);
}

/**
 *
 * @param dateString -
 * @returns
 */
function formatDate(dateString: string) {
  try {
    const timeString = new Date().toISOString().split("T")[1];
    const date = new Date(`${dateString}T${timeString}`);
    if (isNaN(date.getTime())) return "";

    const formattedDate = `${`${date.getUTCMonth() + 1}`.padStart(
      2,
      "0"
    )}/${`${date.getUTCDate()}`.padStart(2, "0")}/${date.getUTCFullYear()}`;
    return formattedDate;
  } catch (error) {
    // Pass
    return dateString;
  }
}

/**
 *
 * @param dateTimeString -
 * @returns
 */
function formatDateTime(dateTimeString: string) {
  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return "";

    const formattedDate = `${`${date.getMonth() + 1}`.padStart(
      2,
      "0"
    )}/${`${date.getDate()}`.padStart(
      2,
      "0"
    )}/${date.getFullYear()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  } catch (error) {
    // Pass
    return dateTimeString;
  }
}

/**
 *
 * @param phoneNumberString -
 * @returns
 */
function formatPhoneNumber(phoneNumberString: string) {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return phoneNumberString;
}

/**
 *
 * @returns Unique string
 */
function generateUniqueId(): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-=_+[]{};':,./<>?";
  return Array(20)
    .fill(undefined)
    .map(() => chars[Math.round(Math.random() * chars.length)])
    .join("");
}

/**
 *
 * @param properties - Field properties, comes in as either auto generated field props or user generated field props
 * @returns
 */
function isUserFieldObject(
  properties: UserGeneratedFieldProperties | AutoGeneratedFieldProperties
): properties is UserGeneratedFieldProperties {
  return properties.renderFieldInPDF;
}

/**
 *
 * @async
 *
 * @returns Promise<PDFDocument>
 */
async function loadPdf(): Promise<PDFDocument> {
  const arrayBuffer = await fetch("/mrwetjet-docusign-alt/pdf/waiver.pdf").then((res) =>
    res.arrayBuffer()
  );
  const doc = await PDFDocument.load(arrayBuffer);
  return doc;
}

/**
 *
 * @param byte - The bytes for the PDF
 */
function openPDFInSeparateTab(byte: Uint8Array) {
  const blob = new Blob([byte], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  window.open(link.href, "_blank");
  link.remove();
}

/**
 * Send an email to the GoogleCloud API endpoint
 *
 * @param props -
 * @param props.attachment - PDF attachment
 * @param props.message - The message to send in the email
 * @param props.recipients - Email(s) of the user sending an email
 * @param props.subject - Subject of the email
 * @returns The status of the response
 */
async function sendMail({
  attachment,
  message,
  recipients,
  subject,
}: EmailMessageProps): Promise<number> {
  const response = await fetch("https://empirical-weft-381301.ue.r.appspot.com/send_email", {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attachment: Array.from(attachment),
      message,
      recipients,
      subject,
    }),
  });

  return response.status;
}

/**
 * To pascal case
 *
 * @param value - String that is meant to be `snake cased` and will be properly formatted into Pascal case with `_` being interpreted as spaces
 * @returns string
 */
function toPascalCase(value: string): string {
  return value
    .split("_")
    .map((word: string) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

/**
 *
 * @async
 *
 * @param props -
 * @param props.collections - The array of collections
 * @param props.fields - The fields we'll need to write in, this is the field's metadata
 * @param props.formState - The actual data we'll inject into each of the field's coordinates
 * @param props.pdf - The PDF document
 * @returns Promise of the PDF document with the data written in
 */
async function writeDataToPdf({
  collections,
  fields,
  formState,
  pdf,
}: WriteDataToPdfProps): Promise<PDFDocument> {
  const signatureFont = await pdf.embedFont(StandardFonts.TimesRomanItalic);
  Object.entries(fields).forEach(([fieldIdentifier, fieldProperties]) => {
    const { coordinates, default: defaultValue } = fieldProperties;
    const calculatedDefaultValue = defaultValue
      ?.map((idOrValue: string) => {
        // First look for identifier's and their user entered data
        const identifiersValue = formState[idOrValue];
        // If we have a value for it, then return it
        if (identifiersValue) return identifiersValue.join();
        // Otherwise just return the string
        return idOrValue;
      })
      .join();

    const fieldValue = formState[fieldIdentifier] || calculatedDefaultValue;

    if (fieldValue === undefined)
      throw Error("Cannot calculate value for field!");

    coordinates.forEach(({ coordinate: [x, y], page: pageNum }, index) => {
      const page = pdf.getPage(pageNum - 1);

      let text;
      if (isUserFieldObject(fieldProperties)) {
        if (
          fieldProperties.maxCount === fieldProperties.minCount &&
          fieldProperties.maxCount === 1 &&
          collections.every(
            (collection) =>
              !collection.fieldIdentifiers.includes(fieldIdentifier)
          )
        ) {
          text = fieldValue instanceof Array ? fieldValue[0] : fieldValue;
        } else {
          text = fieldValue instanceof Array ? fieldValue[index] : fieldValue;
        }
      } else {
        text = fieldValue instanceof Array ? fieldValue[index] : fieldValue;
      }

      if (!text) return;

      page.moveTo(x, y);
      page.drawText(text, {
        size: 14,
        ...(fieldIdentifier.includes("signature") && {
          font: signatureFont,
        }),
      });
    });
  });

  return pdf;
}

export {
  addClickEventToCanvas,
  formatDate,
  formatDateTime,
  formatPhoneNumber,
  generateUniqueId,
  isUserFieldObject,
  loadPdf,
  openPDFInSeparateTab,
  sendMail,
  toPascalCase,
  writeDataToPdf,
};
