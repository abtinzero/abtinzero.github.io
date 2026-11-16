<script setup>
import { ref } from 'vue'
import GameCover from './GameCover.vue'

defineProps({ game: Object, index: Number })
defineEmits(['open'])

// gentle 3D tilt following the pointer
const card = ref(null)
const tilt = ref({ x: 0, y: 0 })
function onMove(e) {
  const r = card.value.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  tilt.value = { x: -py * 6, y: px * 8 }
}
function onLeave() {
  tilt.value = { x: 0, y: 0 }
}

const statusClass = {
  Released: 'mint',
  Jam: 'yellow',
  'In development': 'blue',
  Prototype: 'violet',
}
</script>

<template>
  <article
    ref="card"
    class="card"
    :style="{
      '--accent': game.color,
      transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    }"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <button class="card__hit" :aria-label="`Open ${game.title} details`" @click="$emit('open')"></button>

    <div class="card__cover">
      <GameCover :game="game" />
      <span v-if="game.links?.steam" class="badge badge--steam">On Steam</span>
      <span v-else class="badge" :class="`badge--${statusClass[game.status] || 'violet'}`">{{ game.jam ? 'Game jam' : game.status }}</span>
    </div>

    <div class="card__body">
      <div class="card__meta pixel">
        <span>{{ game.engine }}</span>
        <span>{{ game.year }}</span>
      </div>
      <h3>{{ game.title }}</h3>
      <p>{{ game.tagline }}</p>
      <ul class="tags">
        <li v-for="t in game.tags.slice(0, 3)" :key="t">{{ t }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 3px solid #000;
  border-radius: var(--radius);
  box-shadow: 6px 6px 0 0 #000;
  overflow: hidden;
  transition: transform 0.15s ease-out, box-shadow 0.15s;
  will-change: transform;
}
.card:hover {
  box-shadow: 10px 10px 0 0 var(--accent);
}
.card__hit {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: none;
  border: 0;
  cursor: pointer;
  border-radius: inherit;
}
.card__cover {
  position: relative;
  aspect-ratio: 16 / 9;
  border-bottom: 3px solid #000;
  overflow: hidden;
}
.card__cover :deep(.cover) {
  transition: transform 0.4s ease;
}
.card:hover .card__cover :deep(.cover) {
  transform: scale(1.05);
}
.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: var(--font-pixel);
  font-size: 9px;
  text-transform: uppercase;
  padding: 6px 8px;
  border: 2px solid #000;
  border-radius: 6px;
  color: #000;
  box-shadow: 2px 2px 0 #000;
}
.badge--mint { background: var(--mint); }
.badge--yellow { background: var(--yellow); }
.badge--blue { background: var(--blue); }
.badge--violet { background: var(--violet); color: #fff; }
.badge--steam { background: var(--accent); }

.card__body {
  padding: 18px 20px 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card__meta {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  color: var(--accent);
  text-transform: uppercase;
}
h3 {
  font-size: 24px;
  margin: 10px 0 6px;
  letter-spacing: -0.01em;
}
p {
  margin: 0 0 16px;
  color: var(--muted);
  font-size: 15px;
}
.tags {
  list-style: none;
  padding: 0;
  margin: auto 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tags li {
  font-size: 12px;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--surface-2);
  color: var(--muted);
}
</style>
