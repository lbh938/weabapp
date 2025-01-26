import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { Database } from '@/types/supabase';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*, products(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Error fetching reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const body = await request.json();

    const { data: review, error } = await supabase
      .from('reviews')
      .insert([{
        user_id: body.userId,
        product_id: body.productId,
        rating: body.rating,
        comment: body.comment
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Error creating review' },
      { status: 500 }
    );
  }
} 