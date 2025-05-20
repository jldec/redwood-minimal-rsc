import { time } from '@/lib/utils'

export async function ServerTime() {
  console.log('ServerTime RSC')
  return (
    <div className="border-green-500 border-2 m-1 p-2 rounded-md min-w-xs font-mono text-center">
      {`ServerTime RSC: ${time()}`}
    </div>
  )
}
