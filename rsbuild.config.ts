import { defineConfig, type Rspack } from "@rsbuild/core";
import { pluginHtmlMinifierTerser } from "rsbuild-plugin-html-minifier-terser";
import fs from "node:fs/promises";
import { pluginEjs } from "rsbuild-plugin-ejs";

const translations: Map<string, any> = new Map();
for (const file of (await fs.readdir("translations")).sort()) {
  if (!file.endsWith(".ts")) {
    continue;
  }
  const mod = await import(`./translations/${file}`);
  translations.set(file.slice(0, 2), mod.default);
}

export default defineConfig({
  source: {
    entry: {
      index: "./src/redirect",
      ...Object.fromEntries(
        translations.keys().map((lang) => [lang, "./src/index"]),
      ),
    },
  },
  html: {
    template: ({ entryName }) => {
      if (entryName === "index") return "src/redirect.ejs";
      return "src/index.ejs";
    },
    title: "",
    templateParameters: (defaultValue, { entryName }) => {
      const language = entryName === "index" ? "en" : entryName;
      const compilation = defaultValue.compilation as Rspack.Compilation;
      return {
        ...defaultValue,
        translations,
        language,
        t: translations.get(language),
        asset: (s: string) => {
          const assets = compilation.getAssets();
          const asset = assets.find((a) => a.info.sourceFilename === s);
          if (asset === undefined) {
            throw new Error(
              `asset not found: ${s}\n\nfound assets:\n${assets
                .map((a) => a.info.sourceFilename)
                .filter((v) => v !== undefined)
                .join("\n")}`,
            );
          }
          return asset.name;
        },
      };
    },
  },
  plugins: [pluginHtmlMinifierTerser(), pluginEjs()],
  tools: {
    htmlPlugin(config, { entryName }) {
      if (entryName === "index") {
        config.scriptLoading = "blocking";
      }
    },
  },
});
