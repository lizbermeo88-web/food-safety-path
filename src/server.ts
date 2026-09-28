// @lovable.dev/vite-tanstack-config handles the server entry point automatically.
// This file serves as an optional SSR error wrapper or customization hook.
export default {
  async fetch(request: Request, env: any, ctx: any) {
    return new Response("OK", { status: 200 });
  }
};
