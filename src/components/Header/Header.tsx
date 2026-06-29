import { useCallback, useEffect, useState } from 'react'
import logo from '../../assets/logo/emcee_it.png'
import HeaderNavLink from './HeaderNavLink'
import MobileNavMenu from './MobileNavMenu'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { label: 'AI Solutions', href: '/ai-solutions' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Whitelabel', href: '/whitelabel' },
  { label: 'Gov Contracting', href: '/gov-contracting' },
] as const

const CTA_HREF = '/estimate'
const CTA_LABEL = 'Start Your Estimate'

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    const syncPath = () => {
      setActivePath(window.location.pathname)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('popstate', syncPath)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', syncPath)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const handleNavClick = (href: string) => {
    setActivePath(href)
    closeMenu()
  }

  const headerClassName = [styles.header, isScrolled ? styles.scrolled : '']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClassName}>
      <div className={styles.container}>
        <a href="/" className={styles.logoLink} aria-label="Emcee IT Solutions - Home">
          <img src={logo} alt="Emcee IT Solutions" className={styles.logo} />
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <HeaderNavLink
                  href={item.href}
                  isActive={isActivePath(activePath, item.href)}
                >
                  {item.label}
                </HeaderNavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a href={CTA_HREF} className={styles.cta}>
          {CTA_LABEL}
        </a>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#1e293b] shadow-sm transition-colors duration-200 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E40AF] focus-visible:outline-offset-2 lg:hidden"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={openMenu}
        >
          <HamburgerIcon />
        </button>
      </div>

      <MobileNavMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navItems={NAV_ITEMS}
        activePath={activePath}
        onNavClick={handleNavClick}
        ctaHref={CTA_HREF}
        ctaLabel={CTA_LABEL}
        isActivePath={isActivePath}
      />
    </header>
  )
}
