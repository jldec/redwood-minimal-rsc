'use server'

import { serverTime } from './server-functions'

export async function ServerTime() {
  return <div className="border-green-500 border-2 m-1 p-2 rounded-md min-w-xs font-mono text-center">{serverTime()}</div>
}
