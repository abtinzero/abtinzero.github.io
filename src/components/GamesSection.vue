<script setup>
import { ref, computed } from 'vue'
import { games } from '../data/games'
import GameCard from './GameCard.vue'

defineEmits(['open'])

const ALL = 'All'
const filter = ref(ALL)

// Filter chips = engines + tags, ordered by how often they appear
const filters = computed(() => {
  const counts = {}
  for (const g of games) {
    for (const t of [g.engine, ...g.tags]) counts[t] = (counts[t] || 0) + 1
  }
  const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
  return [ALL, ...sorted.slice(0, 9)]
})

const visible = computed(() =>
  filter.value === ALL ? games : games.filter((g) => g.engine === filter.value || g.tags.includes(filter.value)),
)
</script>

<template>
  <section id="games" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">World 1 · Select a level</span>
        <h2>Games</h2>
        <p>Commercial releases and game jam entries. Click any cartridge for trailers, screenshots and credits.</p>
      </div>

      <div v-if="games.length >= 5" class="filters" role="group" aria-label="Filter games">
        <button
          v-for="f in filters"
          :key="f"
          class="chip"
          :class="{ 'chip--active': filter === f }"
          :aria-pressed="filter === f"
          @click="filter = f"
        >
          {{ f }}
        </button>
      </div>

      <TransitionGroup name="grid" tag="div" class="grid">
        <GameCard
          v-for="(g, i) in visible"
          :key="g.id"
          :game="g"
          :index="i"
          @open="$emit('open', g)"
        />
      </TransitionGroup>

      <p v-if="!visible.length" class="empty pixel">No games here… yet.</p>
    </div>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}
.chip {
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--muted);
  cursor: pointer;
  transition: all 0.15s;
}
.chip:hover {
  color: var(--text);
  border-color: var(--muted);
}
.chip--active {
  background: var(--text);
  color: var(--bg);
  border-color: var(--text);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
@media (max-width: 660px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition: all 0.3s ease;
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.94);
}
.grid-leave-active {
  position: absolute;
  visibility: hidden;
}
.empty {
  font-size: 12px;
  color: var(--muted);
  text-align: center;
  padding: 40px 0;
}
</style>
