import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { closeVideoModal, openVideoModal } from '../../video-modal/video-modal.js'
import { getYouTubeEmbedUrl } from '../../video-modal/youtube.js'
import '../../video-modal/video-modal.css'

interface VideoModalProps {
  videoUrl: string
  isOpen: boolean
  onClose: () => void
}

export default function VideoModal({ videoUrl, isOpen, onClose }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const isYouTube = Boolean(getYouTubeEmbedUrl(videoUrl))

  useEffect(() => {
    const modal = modalRef.current

    return () => {
      if (modal) {
        closeVideoModal(modal)
      }
    }
  }, [])

  useEffect(() => {
    const modal = modalRef.current
    if (!modal || !isYouTube) {
      return
    }

    if (isOpen) {
      openVideoModal(modal, videoUrl)
    } else {
      closeVideoModal(modal)
    }
  }, [isOpen, isYouTube, videoUrl])

  useEffect(() => {
    const modal = modalRef.current
    if (!modal || !isYouTube) {
      return
    }

    const overlay = modal.querySelector('[data-video-modal-overlay]')
    const closeButton = modal.querySelector('[data-video-modal-close]')

    const handleClose = () => {
      onClose()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    overlay?.addEventListener('click', handleClose)
    closeButton?.addEventListener('click', handleClose)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      overlay?.removeEventListener('click', handleClose)
      closeButton?.removeEventListener('click', handleClose)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, isYouTube, onClose])

  if (!isYouTube) {
    return null
  }

  return createPortal(
    <div
      ref={modalRef}
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      aria-hidden="true"
    >
      <div className="video-modal__overlay" data-video-modal-overlay aria-hidden="true" />
      <div className="video-modal__dialog">
        <button
          type="button"
          className="video-modal__close"
          data-video-modal-close
          aria-label="Close video"
        >
          &times;
        </button>
        <div className="video-modal__player">
          <iframe
            className="video-modal__iframe"
            data-video-modal-iframe
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
