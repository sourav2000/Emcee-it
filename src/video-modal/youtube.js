/**
 * Extract a YouTube video ID from common URL formats.
 * @param {string} url
 * @returns {string | null}
 */
export function parseYouTubeVideoId(url) {
  if (!url) {
    return null
  }

  const embedMatch = url.match(/youtube\.com\/embed\/([^?&/]+)/)
  if (embedMatch) {
    return embedMatch[1]
  }

  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) {
    return watchMatch[1]
  }

  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/)
  if (shortMatch) {
    return shortMatch[1]
  }

  if (/^[\w-]{11}$/.test(url)) {
    return url
  }

  return null
}

/**
 * Build a YouTube embed URL from a watch, short, embed, or raw ID string.
 * @param {string} url
 * @returns {string | null}
 */
export function getYouTubeEmbedUrl(url) {
  const id = parseYouTubeVideoId(url)
  if (!id) {
    return null
  }

  return `https://www.youtube.com/embed/${id}`
}
