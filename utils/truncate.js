export default function truncate(str, limit = 200) {
  // Strip HTML tags
  const noTags = str.replace(/<\/?[^>]+(>|$)/g, '')

  // Decode basic HTML entities manually (DOMParser is not available server-side)
  let decodedString = noTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  // Truncate logic
  if (decodedString.length > limit) {
    let truncated = decodedString.substring(0, limit)

    if (decodedString.charAt(limit) !== ' ') {
      truncated = truncated.substring(0, truncated.lastIndexOf(' '))
    }

    decodedString = truncated + '...'
  }

  return decodedString
}
