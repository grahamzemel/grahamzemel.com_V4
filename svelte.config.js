import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    // Vercel adapter with explicit runtime to avoid build-time Node version mismatches.
    adapter: adapter({ runtime: "nodejs18.x" }),
    csp: {
      directives: {
        "default-src": ["*", "unsafe-inline", "unsafe-eval"],
        "img-src": ["*"],
        "worker-src": ["blob:"],
        "script-src": ["*", "unsafe-inline", "unsafe-eval", "blob:"],
      },
    },
  },
};

export default config;
