'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import styles from './page.module.css'

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [supportForm, setSupportForm] = useState({
    email: '',
    subject: '',
    message: ''
  })
  const [supportLoading, setSupportLoading] = useState(false)
  const [supportMessage, setSupportMessage] = useState('')
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
      return
    }

    if (user) {
      fetchFAQs()
    }
  }, [user, authLoading, router])

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq')
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs')
      }
      const data = await response.json()
      setFaqs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const toggleAccordion = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSupportMessage('')
    setSupportLoading(true)

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supportForm),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit support request')
      }

      setSupportMessage('Support request submitted successfully!')
      setSupportForm({ email: '', subject: '', message: '' })
    } catch (err) {
      setSupportMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSupportLoading(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className={styles.loadingWrapper}>
        <Navbar />
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingText}>Loading...</div>
        </div>
      </div>
    )
  }

  const supportMessageClass = supportMessage.includes('successfully') ? styles.statusSuccess : styles.statusError

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>Find answers to common questions or contact our support team.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Common Questions</h2>
            </div>
            <div className={styles.faqList}>
              {loading ? (
                <div className={styles.faqItem}>
                  <p className={styles.loadingText}>Loading FAQs...</p>
                </div>
              ) : error ? (
                <div className={styles.faqItem}>
                  <p className={styles.statusError}>{error}</p>
                </div>
              ) : faqs.length === 0 ? (
                <div className={styles.faqItem}>
                  <p className={styles.loadingText}>No FAQs available.</p>
                </div>
              ) : (
                faqs.map((faq) => (
                  <div key={faq.id} className={styles.faqItem}>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      className={styles.faqButton}
                    >
                      <span className={styles.faqQuestion}>{faq.question}</span>
                      <span className={styles.faqIcon}>
                        {openItems.has(faq.id) ? (
                          <svg className={styles.svgIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className={styles.svgIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </span>
                    </button>
                    {openItems.has(faq.id) && (
                      <div className={styles.faqContent}>
                        <p className={styles.faqAnswer}>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={styles.supportCard}>
            <div className={styles.supportHeader}>
              <h2 className={styles.supportTitle}>Ask for Support</h2>
              <p className={styles.supportDesc}>Can't find what you're looking for? Send us a message.</p>
            </div>
            <div className={styles.supportBody}>
              <form onSubmit={handleSupportSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={supportForm.email}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, email: e.target.value }))}
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="subject" className={styles.label}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={supportForm.message}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                    className={styles.textarea}
                    placeholder="Describe your question or issue..."
                  />
                </div>
                {supportMessage && (
                  <div className={`${styles.statusMessage} ${supportMessageClass}`}>{supportMessage}</div>
                )}
                <button
                  type="submit"
                  disabled={supportLoading}
                  className={styles.submitButton}
                >
                  {supportLoading ? 'Sending...' : 'SEND MESSAGE  →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
