import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, subject, message } = await request.json()

    if (!email || !subject) {
      return NextResponse.json({ error: 'Email and subject are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('support_messages')
      .insert({
        email,
        subject,
        message: message || '',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to submit support message' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Support message submitted successfully', data })
  } catch (error) {
    console.error('Support submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}