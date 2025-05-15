# RedwoodSDK minimal RSC demo
First steps using React Server Components with [RedwoodSDK](https://rwsdk.com/).

#### Deployed at https://redwood-minimal-rsc.jldec.workers.dev/

[<img width="365" alt="Screenshot 2025-05-15 at 16 30 46" src="https://github.com/user-attachments/assets/4dbff635-a735-4a0a-94f4-d7a6925973b2" />](https://redwood-minimal-rsc.jldec.workers.dev/)

### Clock
Live-updating clock rendered on the client.
```tsx
// src/app/pages/Clock.tsx
'use client'

import { time } from '@/lib/utils'
import { useState, useEffect } from 'react'

export function Clock() {
  const [val, setVal] = useState('Clock')

  useEffect(() => {
    const interval = setInterval(() => {
      setVal(`Clock: ${time()}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return <div className="border-purple-500 border-2 m-1 p-2 rounded-md min-w-xs font-mono text-center">{val}</div>
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
  const [val, setVal] = useState('Call time() in client')

  function handleClick() {
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
import { time } from '@/lib/utils'

// server function
export async function serverTime() {
  'use server'
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
  const label = callFetch ? 'fetch /api/time' : 'Call serverTime() server function'
  const [val, setVal] = useState(label)

  async function handleClick() {
    if (callFetch) {
      const res = await fetch('/api/time')
      const text = await res.text()
      setVal(`fetch /api/time: ${text}`)
    } else {
      // realtime returns { node, actionResult } object
      // @ts-ignore
      setVal(`serverTime(): ${(await serverTime()).actionResult}`)
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
  return (
    <div className="border-green-500 border-2 m-1 p-2 rounded-md min-w-xs font-mono text-center">
      {`ServerTime RSC: ${await time()}`}
    </div>
  )
}
```

### Realtime RSC updates
RedwoodSDK supports realtime updates using Cloudflare Durable Objects and WebSockets.

See https://docs.rwsdk.com/core/realtime/

**client.tsx**
```tsx
import { initRealtimeClient } from 'rwsdk/realtime/client'

initRealtimeClient({
  key: 'rwsdk-realtime-demo',
})
```

**worker.ts**
```ts
import { Document } from '@/app/Document'
import { Home } from '@/app/pages/Home'

import { defineApp } from 'rwsdk/worker'
import { index, render, route } from 'rwsdk/router'
import { time } from '@/lib/utils'

import { realtimeRoute, renderRealtimeClients } from 'rwsdk/realtime/worker'
import { env } from 'cloudflare:workers'
export { RealtimeDurableObject } from 'rwsdk/realtime/durableObject'

async function bump() {
  await renderRealtimeClients({
    durableObjectNamespace: env.REALTIME_DURABLE_OBJECT,
    key: 'rwsdk-realtime-demo'
  })
  return new Response(time())
}

export default defineApp([
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  render(Document, [index([Home])]),
  route('/api/time', () => new Response(time())),
  route('/api/bump', bump)
])
```

### BumpServerButton
This button simulates a realtime update from the server by fetching /api/bump.

```tsx
'use client'

import { useState } from 'react'

export function BumpServerButton() {
  const [val, setVal] = useState('Trigger realtime update')

  async function handleClick() {
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
