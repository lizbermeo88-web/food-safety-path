// @lovable.dev/vite-tanstack-config handles the server entry point automatically.
import { createStartHandler } from '@tanstack/start/server';
import { createRouter } from './router';

const router = createRouter();
export default createStartHandler({
  createRouter: () => router,
  getRouter: () => router,
});
