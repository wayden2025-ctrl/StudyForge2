'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) {
    redirect('/signup?error=Please fill in all fields')
  }

  if (password.length < 6) {
    redirect('/signup?error=Password must be at least 6 characters')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        generation_count: 0,
      },
    },
  })

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`)
  }

  // If Supabase requires email confirmation (user exists but no session)
  if (data?.user && !data?.session) {
    redirect('/login?message=Account created! Check your email to confirm, then sign in.')
  }

  // User is signed up and logged in
  revalidatePath('/', 'layout')
  redirect('/app')
}
