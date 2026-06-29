import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRightIcon, InfoIcon } from './icons'
import { useInfoPopoverState } from './InfoPopoverContext'

const POPOVER_GAP = 8

interface InfoPopoverProps {
  id: string
  description: string
  ctaText: string
  ctaHref: string
  triggerLabel?: string
}

export default function InfoPopover({
  id,
  description,
  ctaText,
  ctaHref,
  triggerLabel = 'More information',
}: InfoPopoverProps) {
  const popoverId = useId()
  const { isOpen, toggle, close } = useInfoPopoverState(id)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) {
      return
    }

    const rect = trigger.getBoundingClientRect()
    const popoverWidth = Math.min(360, window.innerWidth - 32)
    let left = rect.left

    if (left + popoverWidth > window.innerWidth - 16) {
      left = window.innerWidth - 16 - popoverWidth
    }

    if (left < 16) {
      left = 16
    }

    setPosition({
      top: rect.bottom + POPOVER_GAP,
      left,
    })
  }, [])

  useLayoutEffect(() => {
    if (!isOpen) {
      return
    }

    updatePosition()

    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isOpen, updatePosition])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [close, isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node

      if (triggerRef.current?.contains(target) || popoverRef.current?.contains(target)) {
        return
      }

      close()
    }

    const timer = window.setTimeout(() => {
      document.addEventListener('click', handleOutsideClick)
    }, 0)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [close, isOpen])

  const handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    toggle()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex cursor-pointer text-[#f26522] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        aria-label={triggerLabel}
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={handleTriggerClick}
      >
        <InfoIcon />
      </button>

      {isOpen
        ? createPortal(
            <div
              ref={popoverRef}
              id={popoverId}
              role="dialog"
              aria-label={triggerLabel}
              className="fixed z-[500] w-[min(360px,calc(100vw-2rem))] rounded-lg bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-6"
              style={{ top: position.top, left: position.left }}
            >
              <p className="text-sm leading-relaxed text-[#334155]">{description}</p>
              <a
                href={ctaHref}
                className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#1c3c8c] transition-colors hover:text-[#1d4ed8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1c3c8c] focus-visible:outline-offset-2"
              >
                {ctaText}
                <ArrowRightIcon className="shrink-0" />
              </a>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
