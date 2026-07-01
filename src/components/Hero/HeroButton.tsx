import type { ReactNode } from 'react'
import { ArrowRightIcon } from './icons'

type HeroButtonVariant = 'primary' | 'secondary' | 'badge'

interface HeroButtonProps {
  href: string
  variant: HeroButtonVariant
  children: ReactNode
  icon?: ReactNode
  showArrow?: boolean
}

const variantClasses: Record<HeroButtonVariant, string> = {
  primary:
    'inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#f26522] px-3 py-2 text-[0.9375rem] font-semibold text-white shadow-[0_8px_24px_rgba(242,101,34,0.35)] transition-all duration-200 hover:bg-[#e05a1c] hover:shadow-[0_10px_28px_rgba(242,101,34,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2',
  secondary:
    'inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/35 bg-transparent px-3 py-2 text-[0.9375rem] font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2',
  badge:
    'inline-flex w-fit max-w-max self-start items-center gap-2 rounded-full border border-white/20 bg-[#0a1f4d]/60 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white/35 hover:bg-[#0a1f4d]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2',
}

export default function HeroButton({
  href,
  variant,
  children,
  icon,
  showArrow = false,
}: HeroButtonProps) {
  return (
    <a href={href} className={variantClasses[variant]}>
      {icon}
      <span>{children}</span>
      {showArrow ? <ArrowRightIcon className="shrink-0" /> : null}
    </a>
  )
}
