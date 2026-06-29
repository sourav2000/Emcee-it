import { CheckIcon } from './icons'
import InfoPopover from './InfoPopover'

const AI_READY_DESCRIPTION =
  'This solution is built on an AI-ready architecture, so you can seamlessly integrate AI features anytime. AI integration is available as an add-on service.'

interface FeatureItemProps {
  text: string
  showInfo?: boolean
  infoId?: string
}

export default function FeatureItem({
  text,
  showInfo = false,
  infoId = 'feature-info',
}: FeatureItemProps) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f26522] text-white">
        <CheckIcon />
      </span>
      <span className="flex items-center gap-2 text-base font-normal leading-snug text-white">
        {text}
        {showInfo ? (
          <InfoPopover
            id={infoId}
            description={AI_READY_DESCRIPTION}
            ctaText="Learn more about AI-ready apps"
            ctaHref="/ai-solutions"
          />
        ) : null}
      </span>
    </li>
  )
}
