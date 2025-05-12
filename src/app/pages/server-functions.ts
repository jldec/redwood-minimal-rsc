'use server'
import { time } from '@/lib/utils'

export async function serverTime() {
  return `Server time: ${time()}`
}
