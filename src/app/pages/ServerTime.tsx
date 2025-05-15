import { time } from '@/lib/utils'

export async function serverTime() {
  'use server'
  return time()
}

export async function ServerTime() {
  return (
    <div className="border-green-500 border-2 m-1 p-2 rounded-md min-w-xs font-mono text-center">
      {`ServerTime RSC: ${await serverTime()}`}
    </div>
  )
}
