import { useEffect } from 'react'
import HeaderNavLink from './HeaderNavLink'

type NavItem = {
  readonly label: string
  readonly href: string
}

type MobileNavMenuProps = {
  isOpen: boolean
  onClose: () => void
  navItems: readonly NavItem[]
  activePath: string
  onNavClick: (href: string) => void
  ctaHref: string
  ctaLabel: string
  isActivePath: (pathname: string, href: string) => boolean
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default function MobileNavMenu({
  isOpen,
  onClose,
  navItems,
  activePath,
  onNavClick,
  ctaHref,
  ctaLabel,
  isActivePath,
}: MobileNavMenuProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      <div
        className={[
          'fixed inset-0 z-[999] bg-black/50 transition-opacity duration-300 lg:hidden',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        id="mobile-navigation"
        className={[
          'fixed inset-y-0 right-0 z-[1001] flex w-full flex-col bg-[#fbfcfd] transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'visible translate-x-0' : 'invisible translate-x-full',
        ].join(' ')}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="flex shrink-0 justify-end px-5 pt-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#374151] transition-colors duration-200 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E40AF] focus-visible:outline-offset-2"
          >
            <CloseIcon />
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4 pt-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <HeaderNavLink
                href={item.href}
                isActive={isActivePath(activePath, item.href)}
                variant="mobile"
                onClick={() => onNavClick(item.href)}
              >
                {item.label}
              </HeaderNavLink>
            </li>
          ))}
        </ul>

        <div className="shrink-0 border-t border-black/[0.08] bg-[#fbfcfd] p-4">
          <a
            href={ctaHref}
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-lg bg-[#1c3c8c] px-5 py-3.5 text-base font-semibold text-white no-underline transition-colors duration-200 hover:bg-[#1d4ed8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E40AF] focus-visible:outline-offset-2"
          >
            {ctaLabel}
          </a>
        </div>
      </nav>
    </>
  )
}
