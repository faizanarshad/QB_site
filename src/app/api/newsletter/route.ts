import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, action = 'subscribe' } = body
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (action === 'unsubscribe') {
      await db.newsletter.unsubscribe(email)
      return NextResponse.json(
        { message: 'Successfully unsubscribed from newsletter' }
      )
    } else {
      await db.newsletter.subscribe(email)
      return NextResponse.json(
        { message: 'Successfully subscribed to newsletter' }
      )
    }
  } catch (error) {
    console.error('Error handling newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    )
  }
} 