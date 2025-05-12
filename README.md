# RedwoodSDK minimal RSC demo
https://redwood-minimal-rsc.jldec.workers.dev/

### Clock
A live-updating clock rendered on the client. It uses a React effect to update every second.
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

  return <div className="border-purple-500 border-2 m-1 p-2 rounded-md min-w-sm font-mono text-center">{val}</div>
}
```

### ClientTimeButton
A button that displays the current time using a client-side function.
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
    <button onClick={handleClick} className="border-blue-500 cursor-pointer hover:translate-y-0.5 border-2 m-1 p-2 rounded-md min-w-sm font-mono">
      {val}
    </button>
  )
}
```

### ServerTimeButton
A button that calls a server function to fetch the current time.
```tsx
// src/app/pages/ServerTimeButton.tsx
'use client'

import { useState } from 'react'
import { serverTime } from './ServerTime'

export function ServerTimeButton() {
  const [val, setVal] = useState('Call serverTime() server function')

  async function handleClick() {
    setVal(`serverTime(): ${await serverTime()}`)
  }

  return (
    <button
      onClick={handleClick}
      className="border-amber-500 cursor-pointer hover:translate-y-0.5 border-2 m-1 p-2 rounded-md min-w-sm font-mono"
    >
      {val}
    </button>
  )
}
```

### ServerTime
A RSC (React Server Component) that displays the current time. This is rendered as part of the initial page load, and re-rendered when the server function above is called.

- `'use server'` in `serverTime()` makes the server function callable via fetch from the client.
- `ServerTime()` (with uppercase 'S') is the server component.

```tsx
// src/app/pages/ServerTime.tsx
import { time } from '@/lib/utils'

export async function serverTime() {
  'use server'
  return time()
}

export async function ServerTime() {
  return (
    <div className="border-green-500 border-2 m-1 p-2 rounded-md min-w-sm font-mono text-center">
      {`ServerTime RSC: ${await serverTime()}`}
    </div>
  )
}
```

**Shared Utility:**
All four components use the same utility to get the formatted time:
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
