import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // relative asset paths: works on a user site (abtinzero.github.io) or a project site (/repo-name/)
  base: './',
  plugins: [vue()],
})
