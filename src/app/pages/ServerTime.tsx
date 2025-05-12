import { time } from '@/lib/utils'
import { requestInfo } from 'rwsdk/worker'

export async function serverTime() {
  'use server'
  return (requestInfo.request.method || 'NO METHOD') + ' ' + time()
}

export async function ServerTime() {
  return (
    <div className="border-green-500 border-2 m-1 p-2 rounded-md min-w-sm font-mono text-center">
      {`ServerTime: ${await serverTime()}`}
    </div>
  )
}
