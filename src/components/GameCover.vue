<script setup>
// Shows game.cover if set, otherwise a generated "cartridge art" placeholder.
import { asset } from '../data/games'
defineProps({ game: Object })
</script>

<template>
  <img v-if="game.cover" class="cover" :src="asset(game.cover)" :alt="`${game.title} cover art`" loading="lazy" />
  <div v-else class="cover cover--gen" :style="{ '--c': game.color }" aria-hidden="true">
    <span class="cover__icon">{{ game.icon || '🎮' }}</span>
    <span class="cover__title pixel">{{ game.title }}</span>
  </div>
</template>

<style scoped>
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover--gen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background:
    radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--c) 55%, transparent), transparent 60%),
    radial-gradient(circle at 80% 90%, color-mix(in srgb, var(--c) 35%, transparent), transparent 55%),
    repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03) 0 10px, transparent 10px 20px),
    #120f24;
}
.cover__icon {
  font-size: clamp(44px, 6vw, 64px);
  filter: drop-shadow(4px 4px 0 #000);
}
.cover__title {
  font-size: 11px;
  color: var(--c);
  text-shadow: 2px 2px 0 #000;
  text-transform: uppercase;
  text-align: center;
  padding: 0 12px;
}
</style>
