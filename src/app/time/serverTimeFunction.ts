import { time } from './utils'

export async function serverTime() {
  'use server'
  console.log('serverTime server function')
  return time()
}
