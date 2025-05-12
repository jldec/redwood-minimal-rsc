'use client'

import { useState } from 'react'
import { serverTime } from './ServerTime'

export function ServerTimeButton() {
  const [val, setVal] = useState('serverTime() server function')

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
