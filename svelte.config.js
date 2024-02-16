import adapter from '@sveltejs/adapter-auto';

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
  }
};

export default config;
