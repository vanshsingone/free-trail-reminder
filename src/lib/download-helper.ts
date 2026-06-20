/**
 * Download Helper
 * Uses URL.createObjectURL to convert text content into a downloadable .ics file.
 * No external dependencies — browser-native APIs only.
 */

/**
 * Triggers a browser download of the given content as a file.
 *
 * How it works:
 * 1. Creates a Blob from the icsContent string with text/calendar MIME type
 * 2. Creates a temporary object URL via URL.createObjectURL
 * 3. Programmatically creates an <a> tag and clicks it to trigger download
 * 4. Cleans up the object URL to free memory
 */
export function downloadICSFile(icsContent: string, fileName: string): void {
  // Create a Blob with the .ics content
  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });

  // Create a temporary object URL
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element and trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);

  // Revoke the object URL after a short delay to ensure download starts
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}
