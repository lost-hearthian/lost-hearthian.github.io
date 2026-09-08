import { defineConfig } from "@rsbuild/core";
import { pluginHtmlMinifierTerser } from "rsbuild-plugin-html-minifier-terser";
import fs from "node:fs/promises";

const translations: Map<string, any> = new Map();
for (const file of await fs.readdir("translations")) {
  if (!file.endsWith(".ts")) {
    continue;
  }
  const mod = await import(`./translations/${file}`);
  translations.set(file.slice(0, 2), mod.default);
}

export default defineConfig({
  source: {
    entry: {
      ...Object.fromEntries(
        translations.keys().map((lang) => [lang, "./src/index.ts"]),
      ),
    },
  },
  html: {
    template: "src/index.ejs",
    title: ({ entryName }) => translations.get(entryName).title,
    templateParameters: { translations },
  },
  plugins: [pluginHtmlMinifierTerser()],
});
