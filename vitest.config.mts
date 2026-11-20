import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    // Only plain logic is tested; components are checked by eye and by the build.
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
