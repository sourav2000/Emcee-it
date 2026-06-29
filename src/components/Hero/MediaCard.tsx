import { useState } from 'react'
import { PlayIcon } from './icons'
import VideoModal from './VideoModal'

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
  const hasVideo = Boolean(videoUrl)

  return (
    <>
      <div className="relative w-full min-w-0 max-w-[540px] justify-self-center lg:max-w-none lg:justify-self-end">
        {imageBadgeText ? (
          <div className="absolute -top-3 right-4 z-20 sm:right-6 lg:-top-4 lg:right-8">
            <span className="inline-block rounded-full bg-[#f26522] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(242,101,34,0.4)] sm:px-5 sm:text-sm">
              {imageBadgeText}
            </span>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
          <div className="flex min-h-[280px] flex-col sm:min-h-[320px] sm:flex-row">

            <div className="relative min-h-[200px] flex-1 bg-[#0f2d6e] sm:min-h-[320px]">
              {hasMedia ? (
                <img
                  src={imageUrl ?? undefined}
                  alt=""
                  className="absolute inset-0 h-full w-full max-w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a7a] to-[#0c1f4d]" />
              )}

              {hasVideo ? (
                <button
                  type="button"
                  className="absolute top-1/2 left-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f26522] text-white shadow-[0_12px_32px_rgba(242,101,34,0.5)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
                  aria-label="Play video"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <PlayIcon />
                </button>
              ) : null}
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
