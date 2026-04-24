'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles.topBanner}>
        <div className={styles.topBannerInner}>
          <p>Welcome to BLOG TIME online blog page.</p>
          <div className={styles.socialLinks}>
            <span>Follow us:</span>
            <div className={styles.socialLinks}>
              <Link href="#" className={styles.socialLink}>f</Link>
              <Link href="#" className={styles.socialLink}>𝕏</Link>
              <a href="#" className={styles.socialLink}>in</a>
            </div>
          </div>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerRow}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoIcon}>
                <span className={styles.logoMark}>B</span>
              </div>
              <span className={styles.logoText}>BLOG TIME</span>
            </Link>

            <div className={styles.searchWrapper}>
              <div className={styles.searchInner}>
                <input
                  type="text"
                  placeholder="Search for anything"
                  className={styles.searchInput}
                />
                <button type="button" className={styles.searchButton}>
                  <svg className={styles.svgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.iconRow}>
              <button type="button" className={styles.iconButton}>
                  <Image
                    src="/Heart.svg"
                    alt=" Logo"
                    width={20.9}
                    height={20.9}
                    priority
                  />
              </button>
              {user ? (
                <div className={styles.menuGroup}>
                  <button type="button" className={styles.menuButton}>
                    <Image
                      src="/User.svg"
                      alt=" Logo"
                      width={20.9}
                      height={20.9}
                      priority
                    />
                  </button>
                  <div className={styles.menuDropdown}>
                    <div className={styles.menuHeader}>
                      <p className={styles.menuUser}>{user.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={logout}
                      className={styles.menuItem}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className={styles.menuButton}
                  title="Login"
                >
                  <svg className={styles.svgIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className={styles.navBar}>
        <div className={styles.navInner}>
          <div className={styles.navRow}>
            <div className={styles.navLinks}>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
              <Link href="/blogs" className={styles.navLink}>
                Blogs
              </Link>
              <Link href="/faq" className={styles.navLink}>
                FAQ
              </Link>
            </div>
            <div className={styles.contactText}>
              <Image
                src="/Vector.svg"
                alt=" Logo"
                width={20.9}
                height={20.9}
                priority
              /> +1-202-555-0104
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
