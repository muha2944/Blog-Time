'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import styles from './page.module.css'
import Image from 'next/image'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      if (isLogin) {
        login(data.user)
        router.push('/blogs')
      } else {
        setSuccess('Account created successfully! Switching to login...')
        setTimeout(() => {
          setIsLogin(true)
          setEmail('')
          setPassword('')
          setConfirmPassword('')
        }, 2000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (


      <div className={styles.mainContent}>
        <div className={styles.card}>
          <div className={styles.tabs}>
            <button
              type="button"
              onClick={() => {
                setIsLogin(true)
                setError('')
                setSuccess('')
              }}
              className={`${styles.tabButton} ${isLogin ? styles.activeTab : styles.inactiveTab}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false)
                setError('')
                setSuccess('')
              }}
              className={`${styles.tabButton} ${!isLogin ? styles.activeTab : styles.inactiveTab}`}
            >
              Sign Up
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.headerRow}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                {isLogin && (
                  <Link href="#" className={styles.navLink}>
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className={styles.inputGroup}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? (
                    <svg className={styles.svgIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className={styles.svgIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-14-14zM4.333 4.776A3 3 0 018.5 7H2.5a3 3 0 011.833-2.224zM10 12.5a2.5 2.5 0 01-2.5-2.5m5 0a5 5 0 11-10 0 5 5 0 0110 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className={styles.field}>
                <label htmlFor="confirmPassword" className={styles.label}>
                  Confirm Password
                </label>
                <div className={styles.inputGroup}>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={styles.input}
                  />
                </div>
              </div>
            )}

            {error && <div className={styles.messageError}>{error}</div>}
            {success && <div className={styles.messageSuccess}>{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Please wait...' : (
                <>
                  {isLogin ? 'SIGN IN' : 'SIGN UP'}
                  <svg className={styles.svgIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className={styles.dividerWrapper}>
            <div className={styles.dividerInner}>
              <div className={styles.dividerLine} />
            </div>
          </div>

          <div className={styles.socialArea}>
            <button type="button" className={styles.socialButton}>
              <Image
                 src="/Google.svg"
                  alt=" Logo"
                  width={20.9}
                  height={20.9}
                 priority
                />
              <span>Sign with Google</span>
            </button>
            <button type="button" className={styles.socialButton}>
              <Image
                 src="/apple.svg"
                  alt=" Logo"
                  width={20.9}
                  height={20.9}
                 priority
                />
              <span>Sign with Apple</span>
            </button>
          </div>

          <div className={styles.footerText}>
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button type="button" onClick={() => setIsLogin(false)} className={styles.footerAction}>
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => setIsLogin(true)} className={styles.footerAction}>
                  Sign in here
                </button>
              </>
            )}
          </div>
        </div>
      </div>
  )
}
