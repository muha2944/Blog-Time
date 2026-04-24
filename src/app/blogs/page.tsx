'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import styles from './page.module.css'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  created_at: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
      return
    }

    if (user) {
      fetchBlogs()
    }
  }, [user, authLoading, router])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      if (!response.ok) {
        throw new Error('Failed to fetch blogs')
      }
      const data = await response.json()
      setBlogs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingText}>Loading blogs...</div>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Our Blog Collection</h1>
          <p className={styles.heroSubtitle}>Explore articles, insights, and stories from our community</p>
        </div>
      </section>

      <main className={styles.mainContent}>
        {error && <div className={styles.errorBox}>{error}</div>}

        {blogs.length > 0 ? (
          <div className={styles.blogGrid}>
            {blogs.map((blog) => (
              <article key={blog.id} className={styles.blogCard}>
                <div className={styles.blogImage}>
                  📚
                </div>
                <div className={styles.blogBody}>
                  <div className={styles.blogBadge}>Blog</div>
                  <h2 className={styles.blogTitle}>
                    <Link href={`/blogs/${blog.slug}`} className={styles.blogLink}>
                      {blog.title}
                    </Link>
                  </h2>
                  <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                  <div className={styles.blogMeta}>
                    <time className={styles.blogTime}>
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <Link href={`/blogs/${blog.slug}`} className={styles.readMoreLink}>
                      Read More -▶
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747 10-4.998 10-10.747c0-5.287-3.5-9.749-8-10.747z" />
            </svg>
            <p className={styles.emptyText}>No blogs found. Please check back later!</p>
          </div>
        )}
      </main>
    </div>
  )
}
