import { useState } from 'react'
import { PlayIcon } from './icons'
import styles from './MediaCard.module.css'
import VideoModal from './VideoModal'
import { getYouTubeEmbedUrl } from '../../video-modal/youtube.js'

interface MediaCardProps {
  imageUrl: string | null
  videoUrl: string | null
  imageBadgeText: string
}

export default function MediaCard({
  imageUrl,
  videoUrl,
  imageBadgeText,
}: MediaCardProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const hasMedia = Boolean(imageUrl || videoUrl)
  const hasVideo = Boolean(videoUrl && getYouTubeEmbedUrl(videoUrl))

  return (
    <>
      <div className="w-full min-w-0 max-w-[540px] justify-self-center lg:max-w-none lg:justify-self-end">
        {/* Blue Background Card */}
        <div className="relative rounded-[8px] bg-[#152d68] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">

          {/* Badge */}
          {imageBadgeText ? (
            <div className="absolute -top-4 right-0 z-20">
              <span className="inline-flex h-8 items-center whitespace-nowrap rounded-full bg-[#f26522] px-4 text-xs font-semibold text-white shadow-[0_10px_30px_rgba(242,101,34,0.35)] sm:h-9 sm:px-5 sm:text-sm">
                {imageBadgeText}
              </span>
            </div>
          ) : null}

          {/* White Video Card */}
          <div
            className={`${styles.videoCard} overflow-hidden rounded-[8px] bg-white ring-1 ring-white/10`}
          >

            <div className={styles.thumbnailContainer}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt=""
                  className={styles.thumbnailImage}
                />
              ) : hasMedia ? (
                <div className={styles.thumbnailFallback} />
              ) : null}

              {hasVideo && (
                <button
                  type="button"
                  className={styles.playButton}
                  aria-label="Play video"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <PlayIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {hasVideo && videoUrl ? (
        <VideoModal
          videoUrl={videoUrl}
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
        />
      ) : null}
    </>
  )
}