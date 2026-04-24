'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import styles from './page.module.css'

interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  created_at: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
      return
    }

    if (user && params.slug) {
      fetchBlog()
    }
  }, [user, authLoading, params.slug, router])

  const fetchBlog = async () => {
    try {
      const response = await fetch(/api/blogs/)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Blog not found')
        }
        throw new Error('Failed to fetch blog')
      }
      const data = await response.json()
      setBlog(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className={styles.loadingWrapper}>
        <Navbar />
        <div className={styles.loadingText}>Loading...</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <Navbar />
        <div className={styles.loadingText}>Loading blog...</div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.mainWrapper}>
          <div className={styles.notFoundWrapper}>
            <h1 className={styles.notFoundTitle}>Blog Not Found</h1>
            <p className={styles.notFoundText}>{error}</p>
            <Link href="/blogs" className={styles.backLink}>
              ← Back to Blogs
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.mainWrapper}>
        <article className={styles.articleCard}>
          <div className={styles.articleBody}>
            <header className={styles.articleHeader}>
              <h1 className={styles.articleTitle}>{blog.title}</h1>
              <time className={styles.articleDate}>
                Published on {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </header>
            <div className={styles.proseWrapper}>
              <div className={styles.contentText}>{blog.content}</div>
            </div>
          </div>
        </article>
        <div className={styles.backButtonRow}>
          <Link href="/blogs" className={styles.backLink}>
            ← Back to All Blogs
          </Link>
        </div>
      </main>
    </div>
  )
}
