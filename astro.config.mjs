// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  // Autoriser les images distantes depuis festicloze.rahmaproject.fr
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'festicloze.rahmaproject.fr',
      },
    ],
  },

  adapter: netlify({
    imageCDN: false,
  }),
});