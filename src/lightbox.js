// Tiny shared state for the full-size viewer.
import { reactive } from 'vue'

export const lightbox = reactive({
  item: null, // { type: 'image', src, alt } | { type: 'youtube', id, title }
})

export const openLightbox = (item) => (lightbox.item = item)
export const closeLightbox = () => (lightbox.item = null)
