export interface User {
  id: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author_id: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  created_at: string
  updated_at: string
}

export interface SupportMessage {
  id: string
  email: string
  subject: string
  message: string
  created_at: string
}