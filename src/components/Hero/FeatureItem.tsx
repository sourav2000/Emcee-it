import { CheckIcon, InfoIcon } from './icons'

interface FeatureItemProps {
  text: string
  showInfo?: boolean
}

export default function FeatureItem({ text, showInfo = false }: FeatureItemProps) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f26522] text-white">
        <CheckIcon />
      </span>
      <span className="flex items-center gap-2 text-base font-medium leading-snug text-white">
        {text}
        {showInfo ? (
          <span
            className="inline-flex text-white/70"
            title="More information"
            aria-label="More information"
          >
            <InfoIcon />
          </span>
        ) : null}
      </span>
    </li>
  )
}
