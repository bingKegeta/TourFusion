import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import cesium from "vite-plugin-cesium";

export default defineConfig({
  plugins: [reactRefresh(), cesium()],
});
