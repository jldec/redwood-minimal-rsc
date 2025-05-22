import { realtimeRoute, renderRealtimeClients } from 'rwsdk/realtime/worker'
import { render, route } from 'rwsdk/router'
import { env } from 'cloudflare:workers'

import { Document } from './Document'
import { Time } from './Time'
import { time } from './utils'

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

export const timeRoutes = [
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  render(Document, [route('/time', [Time])]),
  route('/api/time', handleTime),
  route('/api/bump', handleBump)
]