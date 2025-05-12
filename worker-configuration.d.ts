declare namespace Cloudflare {
  interface Env {
    REALTIME_DURABLE_OBJECT: DurableObjectNamespace<RealtimeDurableObject>
  }
}

interface Env extends Cloudflare.Env {}
