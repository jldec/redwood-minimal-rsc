import { Clock } from './Clock'
import { ClientTimeButton } from './ClientTimeButton'
import { ServerTimeButton } from './ServerTimeButton'
import { ServerTime } from './ServerTime'
import { BumpServerButton } from './BumpServerButton'

export function Home() {
  console.log('Home RSC')
  return (
    <div className="flex flex-col items-center min-h-screen text-sm">
      <h1 className="text-xl font-bold my-2">RedwoodSDK minimal RSC demo</h1>
      <a href="https://github.com/jldec/redwood-minimal-rsc#readme" className="text-blue-600 p-2 underline mb-8 text-base">
        github.com/jldec/redwood-minimal-rsc
      </a>
      <Clock />
      <ClientTimeButton />
      <ServerTimeButton callFetch />
      <ServerTimeButton />
      <ServerTime />
      <BumpServerButton />
    </div>
  )
}
