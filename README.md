# RedwoodSDK minimal RSC demo
First steps using React Server Components with [RedwoodSDK](https://rwsdk.com/).

#### Deployed at https://redwood-minimal-rsc.jldec.workers.dev/

Triggering the `serverTime()` server function or bumping `renderRealtimeClients()` will update all RSCs on the page. See [discord thread](https://discord.com/channels/679514959968993311/1371525865690632222) for discussion about why.

<img width="436" alt="Screenshot 2025-05-20 at 15 02 00" src="https://github.com/user-attachments/assets/4c3867bd-86f5-48e3-a43a-35de11cd2ea3" />

### Home
```tsx
// src/app/pages/Home.tsx
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
      <a
        href="https://github.com/jldec/redwood-minimal-rsc#readme"
        className="text-blue-600 p-2 underline mb-8 text-base"
      >
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
```

### Clock
Live-updating clock rendered on the client.
```tsx
// src/app/pages/Clock.tsx
'use client'

import { time } from '@/lib/utils'
import { useState, useEffect } from 'react'

export function Clock() {
  console.log('Clock')
  const [val, setVal] = useState('Clock')

  useEffect(() => {
    const interval = setInterval(() => {
      setVal(`Clock: ${time()}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-purple-500 border-2 m-1 p-2 rounded-md min-w-xs font-mono text-center">
      {val}
    </div>
  )
}
```

### ClientTimeButton
Calls client-side function to display the time.
```tsx
// src/app/pages/ClientTimeButton.tsx
'use client'

import { useState } from 'react'
import { time } from '@/lib/utils'

export function ClientTimeButton() {
  console.log('ClientTimeButton')
  const [val, setVal] = useState('Call time() in client')

  function handleClick() {
    console.log('ClientTimeButton clicked - calling time()')
    setVal(`ClientTimeButton: ${time()}`)
  }

  return (
    <button onClick={handleClick} className="border-blue-500 cursor-pointer hover:translate-y-0.5 border-2 m-1 p-2 rounded-md min-w-xs font-mono">
      {val}
    </button>
  )
}
```

### serverTime()
This is a RSC server function.

NOTE: `'use server'` makes serverTime() callable from the client via fetch or realtime.
```ts
// src/app/pages/serverTimeFunction.ts
import { time } from '@/lib/utils'

export async function serverTime() {
  'use server'
  console.log('serverTime server function')
  return time()
}
```

### ServerTimeButton
Calls server function, or fetches from `/api/time` if the `callFetch` prop is set.
```tsx
// src/app/pages/ServerTimeButton.tsx
'use client'

import { useState } from 'react'
import { serverTime } from './serverTimeFunction'

export function ServerTimeButton({ callFetch = false }) {
  console.log(`ServerTimeButton (callFetch: ${callFetch})`)
  const label = callFetch ? 'fetch /api/time' : 'Call serverTime() server function'
  const [val, setVal] = useState(label)

  async function handleClick() {
    if (callFetch) {
      console.log('ServerTimeButton clicked - calling /api/time')
      const res = await fetch('/api/time')
      const text = await res.text()
      setVal(`fetch /api/time: ${text}`)
    } else {
      console.log('ServerTimeButton clicked - calling serverTime() server function')
      setVal(`serverTime(): ${await serverTime()}`)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="border-amber-500 cursor-pointer hover:translate-y-0.5 border-2 m-1 p-2 rounded-md min-w-xs font-mono"
    >
      {val}
    </button>
  )
}
```

### ServerTime
`ServerTime()` (with uppercase 'S') is a RSC (React Server Component) that displays the time. This is rendered as part of the initial page load, and re-rendered when serverTime() is called by the client.

```tsx
// src/app/pages/ServerTime.tsx
import { time } from '@/lib/utils'

export async function ServerTime() {
  console.log('ServerTime RSC')
  return (
    <div className="border-green-500 border-2 m-1 p-2 rounded-md min-w-xs font-mono text-center">
      {`ServerTime RSC: ${time()}`}
    </div>
  )
}
```

### Realtime RSC updates
RedwoodSDK supports realtime updates using Cloudflare Durable Objects and WebSockets.

See https://docs.rwsdk.com/core/realtime/

**client.tsx**
```tsx
// src/client.tsx
import { initRealtimeClient } from 'rwsdk/realtime/client'

initRealtimeClient({
  key: 'rwsdk-realtime-demo',
})
```

**worker.ts**
```ts
// src/worker.ts
import { Document } from '@/app/Document'
import { Home } from '@/app/pages/Home'

import { defineApp } from 'rwsdk/worker'
import { index, render, route } from 'rwsdk/router'
import { time } from '@/lib/utils'

import { realtimeRoute, renderRealtimeClients } from 'rwsdk/realtime/worker'
import { env } from 'cloudflare:workers'
export { RealtimeDurableObject } from 'rwsdk/realtime/durableObject'

async function handleBump() {
  console.log('handle /api/bump')
  await renderRealtimeClients({
    durableObjectNamespace: env.REALTIME_DURABLE_OBJECT,
    key: 'rwsdk-realtime-demo'
  })
  return new Response(time())
}

async function handleTime() {
  console.log('handle /api/time')
  return new Response(time())
}

export default defineApp([
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  render(Document, [index([Home])]),
  route('/api/time', handleTime),
  route('/api/bump', handleBump)
])
```

### BumpServerButton
This button simulates a realtime update from the server by fetching /api/bump.

```tsx
// src/app/pages/BumpServerButton.tsx
'use client'

import { useState } from 'react'

export function BumpServerButton() {
  console.log('BumpServerButton')
  const [val, setVal] = useState('Cross-client realtime update')

  async function handleClick() {
    console.log('BumpServerButton clicked - calling /api/bump')
      const res = await fetch('/api/bump')
      const text = await res.text()
      setVal(`fetch /api/bump: ${text}`)
  }

  return (
    <button
      onClick={handleClick}
      className="border-gray-300 cursor-pointer hover:translate-y-0.5 border-2 m-1 p-2 rounded-md min-w-xs font-mono"
    >
      {val}
    </button>
  )
}
```

### time()
Components share the time() function to get the formatted time.
```ts
// src/lib/utils.ts
export function formatTime(d: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    hour12: false,
    timeZoneName: 'short'
  }).format(d)
}

export function time() {
  return formatTime(new Date())
}
```

### scripts
based on redwoodjs/sdk/starters/minimal
```
dev: vite dev,
build: RWSDK_DEPLOY=1 vite build,
preview: vite preview,
ship: wrangler deploy,
types: wrangler types --include-runtime false
```
note: `RWSDK_DEPLOY=1` prevents the rwsdk/vite plugin from calling `npm run dev:init`

### Further Reading
- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
