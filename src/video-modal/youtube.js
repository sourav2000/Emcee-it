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

  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    controls: '1',
    modestbranding: '1',
    playsinline: '1',
    fs: '1',
    iv_load_policy: '3',
    cc_load_policy: '1',
    cc_lang_pref: 'en',
    disablekb: '0',
  })

  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}