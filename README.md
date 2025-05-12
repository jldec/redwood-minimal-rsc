# RedwoodSDK minimal RSC demo
First steps using React Server Components with [RedwoodSDK](https://rwsdk.com/).

#### Deployed at https://redwood-minimal-rsc.jldec.workers.dev/

<img width="449" alt="Screenshot 2025-05-12 at 14 07 27" src="https://github.com/user-attachments/assets/aa9aba9f-1fc7-49e7-a23c-8c55afbad65c" />

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

  return <div className="border-purple-500 border-2 m-1 p-2 rounded-md min-w-sm font-mono text-center">{val}</div>
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
    <button onClick={handleClick} className="border-blue-500 cursor-pointer hover:translate-y-0.5 border-2 m-1 p-2 rounded-md min-w-sm font-mono">
      {val}
    </button>
  )
}
```

### ServerTimeButton
Calls server function, or fetches from `/api/time` if the `callFetch` prop is set.
```tsx
// src/app/pages/ServerTimeButton.tsx
'use client'

import { useState } from 'react'
import { serverTime } from './ServerTime'

export function ServerTimeButton({ callFetch = false }) {
  const label = callFetch ? 'fetch /api/time' : 'Call serverTime() server function'
  const [val, setVal] = useState(label)

  async function handleClick() {
    if (callFetch) {
      const res = await fetch('/api/time')
      const text = await res.text()
      setVal(`fetch /api/time: ${text}`)
    } else {
      setVal(`serverTime(): ${await serverTime()}`)
    }
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
`ServerTime()` (with uppercase 'S') is a RSC (React Server Component) that displays the time. This is rendered as part of the initial page load, and re-rendered when serverTime() from the client.

NOTE: `'use server'` makes serverTime() callable via XHR fetch from the client.

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
Components share the time function to get the formatted time.
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
