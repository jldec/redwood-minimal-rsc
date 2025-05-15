import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";

import { defineApp } from "rwsdk/worker";
import { index, render, route } from "rwsdk/router";
import { time } from "@/lib/utils"

import { realtimeRoute } from "rwsdk/realtime/worker";
import { env } from "cloudflare:workers";

export { RealtimeDurableObject } from "rwsdk/realtime/durableObject";

export default defineApp([
  realtimeRoute(() => env.REALTIME_DURABLE_OBJECT),
  render(Document, [index([Home])]),
  route('/api/time', () => new Response(time()))
]);
