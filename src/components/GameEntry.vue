<script setup>
import { computed } from 'vue'
import PhotoPrint from './PhotoPrint.vue'
import { asset } from '../data/games'
import { openLightbox } from '../lightbox'

const props = defineProps({ game: Object, index: Number })

// small, varied tilts so the prints look placed by hand
const TILTS = [-2, 1.5, -1, 2.2, -1.6, 0.8, -2.4]
const coverTilt = computed(() => (props.index % 2 ? 1.6 : -1.8))

const facts = computed(() => {
  const g = props.game
  return [
    g.released ? ['Released', g.released] : ['Year', g.year],
    ['Made with', [g.engine, ...(g.tools || [])].join(', ')],
    ['My role', g.role],
    ['Team', g.team],
    ['Platforms', g.platforms?.join(', ')],
  ].filter(([, v]) => v)
})

function playTrailer() {
  const g = props.game
  if (g.youtube) openLightbox({ type: 'youtube', id: g.youtube, title: `${g.title} trailer` })
  else if (g.trailer) openLightbox({ type: 'video', src: g.trailer, poster: asset(g.cover), title: `${g.title} trailer` })
}
</script>

<template>
  <article class="entry" :id="game.id">
    <div class="entry__cover">
      <PhotoPrint
        :src="asset(game.cover)"
        :alt="`${game.title} cover art`"
        :caption="game.caption"
        :stamp="game.stamp"
        :tilt="coverTilt"
        :ratio="game.id === 'unstable-space-raiding' ? '5 / 4' : '16 / 9'"
      />
    </div>

    <div class="entry__body">
      <h3 class="entry__title">{{ game.title }}</h3>
      <p class="entry__lede">{{ game.tagline }}</p>
      <p v-for="(para, i) in [].concat(game.description)" :key="i" class="entry__text">{{ para }}</p>

      <dl class="entry__facts">
        <div v-for="[k, v] in facts" :key="k">
          <dt>{{ k }}</dt>
          <dd>{{ v }}</dd>
        </div>
        <div v-if="game.jam">
          <dt>Jam</dt>
          <dd><a :href="game.jam.url" target="_blank" rel="noopener">{{ game.jam.name }}</a></dd>
        </div>
      </dl>

      <div class="entry__actions">
        <a v-if="game.links.steam" :href="game.links.steam" target="_blank" rel="noopener" class="button">
          Buy on Steam, {{ game.price }}
        </a>
        <a v-else-if="game.links.play" :href="game.links.play" target="_blank" rel="noopener" class="button">
          Play in your browser
        </a>
        <button v-if="game.youtube || game.trailer" class="linkish" @click="playTrailer">Watch the trailer</button>
        <a v-if="game.links.itch" :href="game.links.itch" target="_blank" rel="noopener">itch.io page</a>
      </div>
    </div>

    <ul v-if="game.screenshots?.length" class="entry__shots" :aria-label="`${game.title} screenshots`">
      <li v-for="(s, i) in game.screenshots" :key="s">
        <button
          class="shot"
          :aria-label="`View screenshot ${i + 1} of ${game.title}`"
          @click="openLightbox({ type: 'image', src: asset(s), alt: `${game.title} screenshot ${i + 1}` })"
        >
          <PhotoPrint :src="asset(s)" :tilt="TILTS[(i + index) % TILTS.length]" />
        </button>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: 32px 64px;
  align-items: start;
}
.entry__cover {
  padding-top: 8px;
}
.entry__title {
  font-size: clamp(40px, 5vw, 62px);
  font-weight: 200;
  font-variation-settings: 'wdth' 70;
  letter-spacing: -0.005em;
  color: var(--paper);
  margin-bottom: 14px;
}
.entry__lede {
  font-size: 21px;
  line-height: 1.4;
  margin: 0 0 18px;
  max-width: 34ch;
}
.entry__text {
  color: var(--muted);
  margin: 0 0 14px;
  max-width: 60ch;
}
.entry__facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 28px;
  margin: 28px 0;
}
.entry__facts dt {
  font-size: 14px;
  color: var(--muted);
}
.entry__facts dd {
  margin: 0;
  font-size: 16px;
}
.entry__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 26px;
}
.linkish {
  font: inherit;
  color: var(--saucer);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.linkish:hover {
  text-decoration-thickness: 2px;
}

.entry__shots {
  grid-column: 1 / -1;
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}
.entry__shots li {
  width: 156px;
}
.shot {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
}
.shot :deep(.print) {
  padding: 6px;
  transition: transform 0.15s ease;
}
.shot:hover :deep(.print),
.shot:focus-visible :deep(.print) {
  transform: rotate(0deg) translateY(-3px);
}

@media (max-width: 900px) {
  .entry {
    grid-template-columns: 1fr;
  }
  .entry__cover {
    max-width: 560px;
  }
}
@media (max-width: 520px) {
  .entry__facts {
    grid-template-columns: 1fr 1fr;
  }
  .entry__shots {
    gap: 14px;
  }
  .entry__shots li {
    width: calc(50% - 7px);
  }
}
</style>
