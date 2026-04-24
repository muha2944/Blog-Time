import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div>
              <h1 className={styles.heroTitle}>Explore Clicon Blog</h1>
              <p className={styles.heroText}>
                Discover amazing articles, tech insights, and stories from our community. Stay updated with the latest trends and knowledge.
              </p>
              <div className={styles.buttonRow}>
                <Link href="/blogs" className={styles.primaryButton}>
                  Read Blogs
                  <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/faq" className={styles.secondaryButton}>
                  Learn More
                  <svg className={styles.buttonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Featured Categories</h2>
          <div className={styles.categoryGrid}>
            {[
              { title: 'Technology', icon: './Cpu.svg'},
              { title: 'Business', icon: './Buildings.svg'},
              { title: 'Lifestyle', icon: './Barbell.svg'},
              { title: 'Travel', icon: './AirplaneTilt.svg' },
            ].map((category) => (
              <div key={category.title} className={`${styles.categoryCard}`}>
                    <Image
                      src={category.icon}
                      alt="Logo"
                      width={30}
                      height={30}
                      className={styles.categoryIcon}
                      priority
                    />
                <div>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <p className={styles.categorySubtitle}>Explore articles</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className={styles.articlesSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Latest Articles</h2>
          <div className={styles.articleGrid}>
            {[1, 2, 3].map((item) => (
              <Link key={item} href="/blogs" className={styles.articleCard}>
                <div className={styles.articleHeader}>📰</div>
                <div className={styles.articleBody}>
                  <div className={styles.articleTag}>Article</div>
                  <h3 className={styles.articleTitle}>Featured Blog Post {item}</h3>
                  <p className={styles.articleDesc}>
                    Discover insights and tips about the latest trends in tech, business, and lifestyle.
                  </p>
                  <div className={styles.readMore}>
                    Read More
                    <svg className={styles.readMoreIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle}>Stay Updated</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of readers getting valuable insights and updates delivered to their inbox.
            </p>
          </div>
          <div className={styles.ctaForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.emailInput}
            />
            <button className={styles.subscribeButton}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}
