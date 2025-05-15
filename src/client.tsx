import { initRealtimeClient } from 'rwsdk/realtime/client'

initRealtimeClient({
  key: window.location.pathname // Used to group related clients
})
