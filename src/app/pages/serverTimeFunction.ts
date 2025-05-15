import { time } from '@/lib/utils'

// server function
export async function serverTime() {
  'use server'
  return time()
}
