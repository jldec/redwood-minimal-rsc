import { Clock } from './Clock'
import { ClientTimeButton } from './ClientTimeButton'
import { ServerTimeButton } from './ServerTimeButton'
import { ServerTime } from './ServerTime'

export function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold my-2">RedwoodSDK RSC vs Client rendered</h1>
      <Clock />
      <ClientTimeButton />
      <ServerTimeButton />
      <ServerTime />
    </div>
  )
}
