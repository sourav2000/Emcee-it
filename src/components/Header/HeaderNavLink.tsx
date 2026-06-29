type HeaderNavLinkProps = {
  href: string
  children: string
  isActive: boolean
  variant?: 'desktop' | 'mobile'
  onClick?: () => void
}

const focusClasses =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1c3c8c] focus-visible:outline-offset-2'

const desktopLinkBase =
  'relative inline-block font-medium no-underline transition-colors duration-300'

const desktopUnderline =
  "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-[#1E40AF] after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"

export default function HeaderNavLink({
  href,
  children,
  isActive,
  variant = 'desktop',
  onClick,
}: HeaderNavLinkProps) {
  if (variant === 'mobile') {
    const mobileClasses = isActive
      ? 'block w-full rounded-lg bg-[#EFF6FF] px-4 py-3.5 text-base font-medium leading-snug text-[#1E40AF] no-underline transition-colors duration-300'
      : 'block w-full rounded-lg px-4 py-3.5 text-base font-medium leading-snug text-[#374151] no-underline transition-colors duration-300 hover:bg-gray-100'

    return (
      <a
        href={href}
        className={`${mobileClasses} ${focusClasses}`}
        aria-current={isActive ? 'page' : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  const stateClasses = isActive
    ? 'text-[#1c3c8c] after:scale-x-100'
    : 'text-[#374151] hover:text-[#1c3c8c]'

  return (
    <a
      href={href}
      className={`${desktopLinkBase} ${desktopUnderline} ${stateClasses} px-3 py-2 text-[0.9375rem] leading-snug whitespace-nowrap ${focusClasses}`}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
