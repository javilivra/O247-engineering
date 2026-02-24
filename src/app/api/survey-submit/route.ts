import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, answers, skipped } = body;

    const { error } = await supabase
      .from('survey_responses')
      .insert({
        session_id: randomUUID(),
        email: email || null,
        experience: answers?.experience || null,
        group: answers?.group || null,
        duration: answers?.duration || null,
        travel_date: answers?.travel_date || null,
        budget: answers?.budget || null,
        visa: answers?.visa || null,
        priority: answers?.priority || null,
        perfect_trip: answers?.perfect_trip || null,
        source: answers?.source || null,
        skipped: skipped ? JSON.stringify(skipped) : null,
      });

    if (error) {
      console.error('[survey-submit] Supabase error:', error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[survey-submit] Unexpected error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
