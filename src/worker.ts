import { defineApp } from 'rwsdk/worker'
import { index, render } from 'rwsdk/router'
import { timeRoutes } from './app/time/timeRoutes'
import { Document } from './app/Document'
import { Home } from './app/Home'
export { RealtimeDurableObject } from 'rwsdk/realtime/durableObject'

export default defineApp([
  render(Document, [index(Home)]),
  ...timeRoutes
])
