/** Cloudflare Worker entry point for TB Electrical. */
import handler from "vinext/server/app-router-entry";
import { handleContactRequest, type ContactEnv } from "./contact";

interface Env extends ContactEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") return handleContactRequest(request, env);

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
