import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: 'server',
  prefetch: {
    prefetchAll: true
  },
  adapter: netlify()
});