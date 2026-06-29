export function openVideoModal(modal: HTMLElement, videoUrl: string): void
export function closeVideoModal(modal: HTMLElement): void

export function initVideoModal(options: {
  playButton: HTMLElement
  modal: HTMLElement
  videoUrl: string
  onOpen?: () => void
  onClose?: () => void
}): () => void
