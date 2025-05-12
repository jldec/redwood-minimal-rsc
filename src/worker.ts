import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";

import { defineApp } from "rwsdk/worker";
import { index, render, route } from "rwsdk/router";
import { time } from "@/lib/utils"

export default defineApp([
  render(Document, [index([Home])]),
  route('/api/time', () => new Response(time()))
]);
