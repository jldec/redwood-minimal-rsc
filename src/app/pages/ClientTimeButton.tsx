'use client'

import { useState } from 'react'
import { time } from '@/lib/utils'

export function ClientTimeButton() {
  const [val, setVal] = useState('ClientTimeButton')

  function handleClick() {
    setVal(`ClientTimeButton: ${time()}`)
  }

  return (
    <button onClick={handleClick} className="border-blue-500 border-2 m-1 p-2 rounded-md min-w-sm font-mono">
      {val}
    </button>
  )
}
