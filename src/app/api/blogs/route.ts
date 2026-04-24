import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
    }

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Get blogs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt, author_id } = await request.json()

    if (!title || !content || !author_id) {
      return NextResponse.json({ error: 'Title, content, and author_id are required' }, { status: 400 })
    }

    // Create slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title,
        slug,
        content,
        excerpt: excerpt || content.substring(0, 200) + '...',
        author_id,
        published: true,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Create blog error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}