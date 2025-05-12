import { Clock } from './Clock'
import { ClientTimeButton } from './ClientTimeButton'
import { ServerTimeButton } from './ServerTimeButton'
import { ServerTime } from './ServerTime'

export function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold my-2">RedwoodSDK minimal RSC demo</h1>
      <a href="https://github.com/jldec/redwood-minimal-rsc#readme" className="text-blue-600 underline mb-8">https://github.com/jldec/redwood-minimal-rsc</a>
      <Clock />
      <ClientTimeButton />
      <ServerTimeButton />
      <ServerTime />
    </div>
  )
}
