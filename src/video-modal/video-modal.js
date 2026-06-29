import { getYouTubeEmbedUrl } from './youtube.js'

/**
 * @param {string} baseUrl
 * @returns {string}
 */
function withAutoplay(baseUrl) {
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}autoplay=1`
}

/**
 * @param {HTMLElement} modal
 * @param {string} videoUrl
 */
export function openVideoModal(modal, videoUrl) {
  const iframe = modal.querySelector('[data-video-modal-iframe]')
  const embedUrl = getYouTubeEmbedUrl(videoUrl)

  if (!iframe || !embedUrl) {
    return
  }

  iframe.src = withAutoplay(embedUrl)
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'

  const closeButton = modal.querySelector('[data-video-modal-close]')
  closeButton?.focus()
}

/**
 * @param {HTMLElement} modal
 */
export function closeVideoModal(modal) {
  const iframe = modal.querySelector('[data-video-modal-iframe]')

  if (iframe) {
    iframe.src = ''
  }

  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
}

/**
 * Wire up a play button and modal with vanilla JavaScript.
 *
 * @param {{
 *   playButton: HTMLElement
 *   modal: HTMLElement
 *   videoUrl: string
 *   onOpen?: () => void
 *   onClose?: () => void
 * }} options
 * @returns {() => void} cleanup function
 */
export function initVideoModal({ playButton, modal, videoUrl, onOpen, onClose }) {
  const overlay = modal.querySelector('[data-video-modal-overlay]')
  const closeButton = modal.querySelector('[data-video-modal-close]')

  const handleOpen = () => {
    openVideoModal(modal, videoUrl)
    onOpen?.()
  }

  const handleClose = () => {
    closeVideoModal(modal)
    onClose?.()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      handleClose()
    }
  }

  playButton.addEventListener('click', handleOpen)
  overlay?.addEventListener('click', handleClose)
  closeButton?.addEventListener('click', handleClose)
  document.addEventListener('keydown', handleKeyDown)

  return () => {
    playButton.removeEventListener('click', handleOpen)
    overlay?.removeEventListener('click', handleClose)
    closeButton?.removeEventListener('click', handleClose)
    document.removeEventListener('keydown', handleKeyDown)
    closeVideoModal(modal)
  }
}
