'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/login?error=Please fill in all fields')
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // If credentials are invalid, suggest creating an account
    if (error.message.includes('Invalid login credentials')) {
      redirect('/login?error=Invalid email or password. Don\'t have an account? Click "Create one" below.')
    }
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/app')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function guestLogin() {
  const cookieStore = await cookies()
  cookieStore.set('guest_mode', 'true', { maxAge: 60 * 60 * 24 * 30 }) // 30 days
  
  revalidatePath('/', 'layout')
  redirect('/app')
}
