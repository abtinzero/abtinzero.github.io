<script setup>
import { ref, watch } from 'vue'
import { lightbox, closeLightbox } from '../lightbox'

const dialog = ref(null)

watch(
  () => lightbox.item,
  (item) => {
    if (item && !dialog.value.open) dialog.value.showModal()
    if (!item && dialog.value?.open) dialog.value.close()
  },
)

// clicking the dimmed area (the dialog element itself) closes it
const onClick = (e) => e.target === dialog.value && closeLightbox()
</script>

<template>
  <dialog ref="dialog" class="lightbox" @close="closeLightbox" @click="onClick">
    <template v-if="lightbox.item">
      <img
        v-if="lightbox.item.type === 'image'"
        :src="lightbox.item.src"
        :alt="lightbox.item.alt"
        class="lightbox__media"
      />
      <video
        v-else-if="lightbox.item.type === 'video'"
        :src="lightbox.item.src"
        :poster="lightbox.item.poster"
        :aria-label="lightbox.item.title"
        class="lightbox__media lightbox__video"
        controls
        autoplay
        playsinline
      ></video>
      <div v-else class="lightbox__media lightbox__video">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${lightbox.item.id}?autoplay=1`"
          :title="lightbox.item.title"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <button class="lightbox__close" @click="closeLightbox">Close</button>
    </template>
  </dialog>
</template>

<style scoped>
.lightbox {
  border: 0;
  padding: 0;
  background: none;
  max-width: none;
  max-height: none;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
.lightbox:not([open]) {
  display: none;
}
.lightbox::backdrop {
  background: rgba(8, 11, 34, 0.92);
}
.lightbox[open] .lightbox__media {
  animation: develop 0.35s ease-out;
}
@keyframes develop {
  from {
    opacity: 0;
    filter: brightness(2.2) saturate(0);
  }
}
.lightbox__media {
  max-width: min(92vw, 1400px);
  max-height: 84vh;
  border: 10px solid var(--paper);
  border-radius: 2px;
  box-shadow: 0 30px 60px -20px #000;
}
.lightbox__video {
  width: min(92vw, 1200px);
  aspect-ratio: 16 / 9;
  background: #000;
}
.lightbox__video iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.lightbox__close {
  position: fixed;
  top: 18px;
  right: 18px;
  font: inherit;
  font-size: 16px;
  padding: 8px 16px;
  background: var(--paper);
  color: var(--paper-ink);
  border: 0;
  border-radius: 3px;
  cursor: pointer;
}
</style>
