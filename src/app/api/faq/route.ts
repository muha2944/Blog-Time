import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: faqs, error } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
    }

    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Get FAQs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}