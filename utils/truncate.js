export default function truncate(str = "", limit = 200) {
  // যদি str না থাকে বা string না হয় → safe fallback
  if (typeof str !== "string") {
    return "";
  }

  // Strip HTML tags
  const noTags = str.replace(/<\/?[^>]+(>|$)/g, "");

  // Decode basic HTML entities manually
  let decodedString = noTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  // Truncate logic
  if (decodedString.length > limit) {
    let truncated = decodedString.substring(0, limit);

    if (decodedString.charAt(limit) !== " ") {
      const lastSpace = truncated.lastIndexOf(" ");
      if (lastSpace > 0) {
        truncated = truncated.substring(0, lastSpace);
      }
    }

    decodedString = truncated + "...";
  }

  return decodedString;
}