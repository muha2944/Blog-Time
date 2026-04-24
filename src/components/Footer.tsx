import styles from './Footer.module.css'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <div className={styles.logoRow}>
              <div className={styles.logoBadge}>
                <span className={styles.logoBadgeText}>B</span>
              </div>
              <span className={styles.logoText}>BLOG TIME</span>
            </div>
<p className={styles.paragraph}>
  A space to share insights, tutorials, and stories on web development, design, and technology.
</p>
<p className={styles.contactText}>
  (629) 555-0129
</p>
<p className={styles.contactText}>
  4517 Washington Ave.<br />
  Manchester, Kentucky 39495
</p>
<p className={styles.contactText}>editor@myblog.com</p>
</div>

<div className={styles.section}>
  <h4 className={styles.sectionTitle}>TOP CATEGORIES</h4>
  <ul className={styles.linkList}>
    <li><a href="/category/web-development" className={styles.linkItem}>Web Development</a></li>
    <li><a href="/category/javascript" className={styles.linkItem}>JavaScript</a></li>
    <li><a href="/category/react" className={styles.linkItem}>React & Next.js</a></li>
    <li><a href="/category/ui-ux" className={styles.linkItem}>UI/UX Design</a></li>
    <li><a href="/category/career" className={styles.linkItem}>Career & Productivity</a></li>
  </ul>
</div>

<div className={styles.section}>
  <h4 className={styles.sectionTitle}>QUICK LINKS</h4>
  <ul className={styles.linkList}>
    <li><a href="/about" className={styles.linkItem}>About</a></li>
    <li><a href="/blog" className={styles.linkItem}>All Posts</a></li>
    <li><a href="/tags" className={styles.linkItem}>Browse by Tags</a></li>
    <li><a href="/contact" className={styles.linkItem}>Contact</a></li>
    <li><a href="/privacy-policy" className={styles.linkItem}>Privacy Policy</a></li>
  </ul>
</div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>DOWNLOAD APP</h4>
            <p className={styles.paragraph}>Get it now at the App Store & Google Play</p>
            <div className={styles.appDownloadList}>
              <div className={styles.appDownloadItem}>
                <Image
                 src="/google-play.svg"
                  alt=" Logo"
                  width={20.9}
                  height={20.9}
                 priority
                />
                <span className={styles.appDownloadText}>Google Play</span>
              </div>
              <div className={styles.appDownloadItem}>
                  <Image
                    src="/app-store.svg"
                    alt=" Logo"
                    width={20.9}
                    height={20.9}
                    priority
                  />
                <span className={styles.appDownloadText}>App Store</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>POPULAR TAG</h4>
            <div className={styles.tagList}>
              {['Web Development','React','Next.js','TypeScript','UI/UX Design','APIs','Productivity','Career','JavaScript','CSS','Frontend','Backend','Database','Supabase','Internship','Contest Design'].map((tag) => (
                <a key={tag} href="#" className={styles.tag}>
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomRow}>
            <p>&copy; 2024 Clicon. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <a href="#" className={styles.bottomLink}>Privacy Policy</a>
              <a href="#" className={styles.bottomLink}>Terms & Conditions</a>
              <a href="#" className={styles.bottomLink}>About Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
