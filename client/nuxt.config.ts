export default defineNuxtConfig({
  ssr: false, 
  app: {
    baseURL: "./" 
  },
  nitro: {
    preset: "static" 
  },
  modules: [
    '@nuxt/ui',
  ],
});
