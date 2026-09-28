import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Forzamos al enrutador a operar en modo cliente puro para evitar las funciones /_server
    router: {
      type: 'hash'
    },
    server: { entry: "server" }
  }
});



