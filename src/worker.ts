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
