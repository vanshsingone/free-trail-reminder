/**
 * ICS Calendar File Generator
 * Generates standard iCalendar (.ics) format strings for free trial reminders.
 * No external dependencies — pure TypeScript.
 */

export interface ReminderData {
  serviceName: string;
  trialStartDate: Date;
  durationDays: number;
}

export interface ReminderResult {
  expirationDate: Date;
  reminderDate: Date;
  icsContent: string;
  fileName: string;
}

/**
 * Formats a Date object into iCalendar DTSTART/DTEND format: YYYYMMDDTHHMMSSZ
 */
function formatDateToICS(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generates a unique UID for the calendar event
 */
function generateUID(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}@free-trial-reminder`;
}

/**
 * Folds long lines per RFC 5545 (max 75 octets per line)
 */
function foldLine(line: string): string {
  if (line.length <= 75) return line;
  let result = line.substring(0, 75);
  let remaining = line.substring(75);
  while (remaining.length > 0) {
    result += "\r\n " + remaining.substring(0, 74);
    remaining = remaining.substring(74);
  }
  return result;
}

/**
 * Generates an .ics calendar file content for a free trial reminder.
 *
 * Logic:
 * 1. expirationDate = trialStartDate + durationDays
 * 2. reminderDate = expirationDate - 24 hours
 * 3. Creates a 1-hour event at the reminder time
 * 4. Includes a VALARM that triggers at the event start (0 minutes before)
 */
export function generateICS(data: ReminderData): ReminderResult {
  const { serviceName, trialStartDate, durationDays } = data;

  // Calculate expiration date
  const expirationDate = new Date(trialStartDate);
  expirationDate.setDate(expirationDate.getDate() + durationDays);

  // Calculate reminder date (24 hours before expiration)
  const reminderDate = new Date(expirationDate);
  reminderDate.setHours(reminderDate.getHours() - 24);

  // Format dates for .ics
  const dtStart = formatDateToICS(reminderDate);
  const dtEnd = formatDateToICS(
    new Date(reminderDate.getTime() + 60 * 60 * 1000)
  ); // +1 hour
  const dtStamp = formatDateToICS(new Date()); // Current timestamp
  const uid = generateUID();

  const summary = `⚠️ Cancel ${serviceName} — Trial Expires Tomorrow!`;
  const description = `Your ${serviceName} free trial expires on ${expirationDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}. Cancel now to avoid being charged!`;

  // Build the iCalendar content per RFC 5545
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Free Trial Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    foldLine(`SUMMARY:${summary}`),
    foldLine(`DESCRIPTION:${description}`),
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    // VALARM: triggers at event start time (0 minutes before)
    "BEGIN:VALARM",
    "TRIGGER:PT0M",
    "ACTION:DISPLAY",
    foldLine(`DESCRIPTION:${summary}`),
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const icsContent = lines.join("\r\n");

  // Generate a clean filename
  const cleanName = serviceName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const fileName = `${cleanName}-trial-reminder.ics`;

  return {
    expirationDate,
    reminderDate,
    icsContent,
    fileName,
  };
}
