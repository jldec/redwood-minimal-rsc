'use server'
import { time } from './utils'

export async function serverTime() {
  console.log('serverTime server function')
  return time()
}
