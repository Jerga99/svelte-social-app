import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      "@components": "./src/components/*",
      "@actions": "./src/actions/*",
      "@stores": "./src/stores/*",
      "@db": "./src/db/*",
      "@api": "./src/api/*"
    }
  },
  preprocess: vitePreprocess()
};

export default config;
