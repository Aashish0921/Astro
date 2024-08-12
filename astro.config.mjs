import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";
import react from '@astrojs/react';
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: netlify()
});