<script setup>
import { watch, ref, nextTick, onBeforeUnmount } from 'vue'
import GameCover from './GameCover.vue'
import { asset } from '../data/games'

const props = defineProps({ game: Object })
const emit = defineEmits(['close'])
const closeBtn = ref(null)
let lastFocus = null

const onKey = (e) => e.key === 'Escape' && emit('close')

watch(
  () => props.game,
  async (g) => {
    if (g) {
      lastFocus = document.activeElement
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
      await nextTick()
      closeBtn.value?.focus()
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      lastFocus?.focus?.()
    }
  },
)
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

const linkLabels = {
  steam: 'Buy on Steam',
  play: '▶ Play on itch.io',
  itch: 'itch.io page',
  source: '</> Source',
  devlog: '✎ Devlog',
}
const primary = (key) => key === 'steam' || key === 'play'
</script>

<template>
  <Transition name="modal">
    <div v-if="game" class="backdrop" @click.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true" :aria-labelledby="`title-${game.id}`" :style="{ '--accent': game.color }">
        <button ref="closeBtn" class="close" aria-label="Close" @click="emit('close')">✕</button>

        <div class="media">
          <video
            v-if="game.trailer"
            :src="game.trailer"
            :poster="asset(game.cover)"
            controls
            playsinline
            preload="none"
          ></video>
          <iframe
            v-else-if="game.youtube"
            :src="`https://www.youtube-nocookie.com/embed/${game.youtube}`"
            :title="`${game.title} trailer`"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <GameCover v-else :game="game" />
        </div>

        <div class="content">
          <div class="meta pixel">
            <span>{{ game.engine }}</span>·<span>{{ game.year }}</span>·<span>{{ game.status }}</span>
          </div>
          <h2 :id="`title-${game.id}`">{{ game.title }}</h2>
          <p class="tagline">{{ game.tagline }}</p>

          <p v-for="(para, i) in [].concat(game.description || [])" :key="i">{{ para }}</p>

          <dl class="facts">
            <div><dt>My role</dt><dd>{{ game.role }}</dd></div>
            <div v-if="game.team"><dt>Team</dt><dd>{{ game.team }}</dd></div>
            <div><dt>Made with</dt><dd>{{ [game.engine, ...(game.tools || [])].join(', ') }}</dd></div>
            <div v-if="game.platforms"><dt>Platforms</dt><dd>{{ game.platforms.join(', ') }}</dd></div>
            <div v-if="game.jam">
              <dt>Game jam</dt>
              <dd><a :href="game.jam.url" target="_blank" rel="noopener">{{ game.jam.name }}</a></dd>
            </div>
          </dl>

          <div v-if="game.screenshots?.length" class="shots">
            <a v-for="s in game.screenshots" :key="s" :href="asset(s)" target="_blank" rel="noopener">
              <img :src="asset(s)" :alt="`${game.title} screenshot`" loading="lazy" />
            </a>
          </div>

          <div v-if="game.links" class="links">
            <a
              v-for="(href, key) in game.links"
              :key="key"
              :href="href"
              target="_blank"
              rel="noopener"
              class="btn"
              :class="{ 'btn--ghost': !primary(key), 'btn--accent': primary(key) }"
            >{{ linkLabels[key] || key }}</a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(5, 4, 12, 0.8);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  padding: 20px;
  overflow-y: auto;
}
.modal {
  position: relative;
  width: 100%;
  max-width: 820px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  background: var(--surface);
  border: 3px solid #000;
  border-radius: var(--radius);
  box-shadow: 10px 10px 0 0 var(--accent);
}
.close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  width: 40px;
  height: 40px;
  border: 3px solid #000;
  border-radius: 8px;
  background: var(--text);
  color: #000;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 3px 3px 0 #000;
}
.media {
  aspect-ratio: 16 / 9;
  border-bottom: 3px solid #000;
  overflow: hidden;
  background: #000;
}
.media iframe,
.media video {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.content {
  padding: 26px 30px 32px;
}
.meta {
  display: flex;
  gap: 8px;
  font-size: 9px;
  color: var(--accent);
  text-transform: uppercase;
}
h2 {
  font-size: clamp(28px, 4vw, 40px);
  margin: 10px 0 4px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.tagline {
  color: var(--text);
  font-weight: 500;
}
p {
  color: var(--muted);
}
.facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 24px 0;
  padding: 16px;
  background: var(--bg-2);
  border-radius: 10px;
}
.facts dt {
  font-family: var(--font-pixel);
  font-size: 9px;
  color: var(--muted);
  text-transform: uppercase;
  margin-bottom: 6px;
}
.facts dd {
  margin: 0;
  font-size: 15px;
}
.facts a {
  color: var(--accent);
}
.shots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  margin-bottom: 24px;
}
.shots a {
  display: block;
  border-radius: 8px;
  border: 2px solid #000;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}
.shots img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}
.shots a:hover img {
  transform: scale(1.06);
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.btn--accent {
  background: var(--accent);
}
@media (max-width: 560px) {
  .content {
    padding: 20px;
  }
  .facts {
    grid-template-columns: 1fr;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}
.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.25s cubic-bezier(0.2, 1.4, 0.4, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.9) translateY(20px);
}
</style>
