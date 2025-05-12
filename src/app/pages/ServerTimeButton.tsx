'use client'

import { useState } from 'react'
import { serverTime } from './server-functions'

export function ServerTimeButton() {
  const [val, setVal] = useState('Get server time')

  async function handleClick() {
    setVal(await serverTime())
  }

  return (
    <button onClick={handleClick} className="border-amber-500 border-2 m-1 p-2 rounded-md min-w-xs font-mono">
      {val}
    </button>
  )
}
