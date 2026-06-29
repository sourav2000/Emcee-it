import { useCallback, useEffect, useRef } from 'react'
import { CloseIcon } from './icons'

interface VideoModalProps {
  videoUrl: string
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ videoUrl, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, isOpen])

  useEffect(() => {
    const video = videoRef.current
    if (!isOpen || !video) {
      return
    }

    void video.play().catch(() => {
      // Autoplay may be blocked by the browser; controls remain available.
    })

    return () => {
      video.pause()
      video.currentTime = 0
    }
  }, [isOpen, videoUrl])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/85 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Close video"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <video
          ref={videoRef}
          className="w-full rounded-xl bg-black shadow-2xl"
          controls
          playsInline
          src={videoUrl}
        >
          <track kind="captions" />
        </video>
      </div>
    </div>
  )
}
