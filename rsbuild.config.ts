import { defineConfig } from "@rsbuild/core";
import { pluginHtmlMinifierTerser } from "rsbuild-plugin-html-minifier-terser";

export default defineConfig({
  html: {
    template: "src/index.ejs",
    title: "Yuzu Dreams",
  },
  plugins: [pluginHtmlMinifierTerser()],
});
