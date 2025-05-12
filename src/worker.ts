import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";

import { defineApp } from "rwsdk/worker";
import { index, render } from "rwsdk/router";

export default defineApp([
  render(Document, [index([Home])]),
]);
