<script setup>
// Big showcase for the game marked `spotlight: true` in games.js.
import { ref, computed } from 'vue'
import { games, asset } from '../data/games'

defineEmits(['open'])

const game = games.find((g) => g.spotlight)
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// -1 = trailer, 0..n = screenshot
const active = ref(game?.trailer ? -1 : 0)
const shots = computed(() => game?.screenshots ?? [])
const shotLabel = computed(() =>
  active.value === -1 ? 'TRAILER' : `PHOTO ${active.value + 1}/${shots.value.length}`,
)
</script>

<template>
  <section v-if="game" id="spotlight" class="section spotlight" :style="{ '--accent': game.color }">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Featured · Out now on Steam</span>
      </div>

      <div class="layout">
        <!-- viewfinder -->
        <div class="viewfinder">
          <div class="screen">
            <video
              v-if="active === -1"
              :src="game.trailer"
              :poster="asset(game.cover)"
              :autoplay="!reduced"
              :controls="reduced"
              muted
              loop
              playsinline
              preload="metadata"
              aria-label="UFO Sightings Simulator gameplay trailer"
            ></video>
            <img v-else :src="asset(shots[active])" :alt="`${game.title} screenshot ${active + 1}`" />

            <span class="corner tl"></span><span class="corner tr"></span>
            <span class="corner bl"></span><span class="corner br"></span>
            <span class="hud hud--rec pixel"><span class="dot"></span>REC</span>
            <span class="hud hud--count pixel">{{ shotLabel }}</span>
          </div>

          <div class="thumbs" role="group" aria-label="Media">
            <button
              v-if="game.trailer"
              class="thumb thumb--trailer"
              :class="{ active: active === -1 }"
              :style="{ backgroundImage: `url(${asset(game.cover)})` }"
              aria-label="Show trailer"
              @click="active = -1"
            >
              <span>▶</span>
            </button>
            <button
              v-for="(s, i) in shots"
              :key="s"
              class="thumb"
              :class="{ active: active === i }"
              :style="{ backgroundImage: `url(${asset(s)})` }"
              :aria-label="`Show screenshot ${i + 1}`"
              @click="active = i"
            ></button>
          </div>
        </div>

        <!-- info -->
        <div class="info">
          <h2>
            <span class="ufo" aria-hidden="true">🛸</span>
            {{ game.title }}
          </h2>
          <p class="tagline">{{ game.tagline }}</p>
          <p class="desc">{{ [].concat(game.description)[0] }}</p>

          <dl class="meta">
            <div><dt>Released</dt><dd>{{ game.released || game.year }}</dd></div>
            <div><dt>Engine</dt><dd>{{ game.engine }}</dd></div>
            <div><dt>Studio</dt><dd>{{ game.team }}</dd></div>
            <div><dt>Platforms</dt><dd>{{ game.platforms?.join(' · ') }}</dd></div>
          </dl>

          <div class="actions">
            <a v-if="game.links.steam" :href="game.links.steam" target="_blank" rel="noopener" class="btn btn--steam">
              Buy on Steam<span v-if="game.price" class="price">{{ game.price }}</span>
            </a>
            <button class="btn btn--ghost" @click="$emit('open', game)">More details</button>
            <a v-if="game.links.itch" :href="game.links.itch" target="_blank" rel="noopener" class="btn btn--ghost">itch.io</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.spotlight {
  position: relative;
  padding-top: 40px;
}
/* soft glow behind the section */
.spotlight::before {
  content: '';
  position: absolute;
  inset: 10% 0 auto;
  height: 70%;
  background: radial-gradient(ellipse at 30% 40%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%);
  pointer-events: none;
}
.section-head {
  margin-bottom: 20px;
}
.layout {
  position: relative;
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 48px;
  align-items: center;
}
.layout > * {
  min-width: 0;
}

/* ── viewfinder ───────────────────────── */
.screen {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
  border: 3px solid #000;
  border-radius: var(--radius);
  box-shadow: 10px 10px 0 0 var(--accent);
  overflow: hidden;
}
.screen video,
.screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border: 3px solid rgba(255, 255, 255, 0.85);
  pointer-events: none;
}
.tl { top: 16px; left: 16px; border-right: 0; border-bottom: 0; }
.tr { top: 16px; right: 16px; border-left: 0; border-bottom: 0; }
.bl { bottom: 16px; left: 16px; border-right: 0; border-top: 0; }
.br { bottom: 16px; right: 16px; border-left: 0; border-top: 0; }
.hud {
  position: absolute;
  font-size: 10px;
  color: #fff;
  text-shadow: 2px 2px 0 #000;
  pointer-events: none;
}
.hud--rec {
  top: 26px;
  left: 54px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff3b3b;
  animation: rec 1.2s steps(1) infinite;
}
@keyframes rec {
  50% { opacity: 0; }
}
.hud--count {
  bottom: 26px;
  right: 54px;
}

.thumbs {
  display: flex;
  gap: 10px;
  margin-top: 22px;
  overflow-x: auto;
  padding: 4px 4px 8px;
  scrollbar-width: thin;
}
.thumb {
  flex: 0 0 auto;
  width: 92px;
  aspect-ratio: 16 / 9;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: center / cover no-repeat #000;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s, border-color 0.15s, transform 0.15s;
}
.thumb:hover {
  opacity: 1;
  transform: translateY(-2px);
}
.thumb.active {
  opacity: 1;
  border-color: var(--accent);
}
.thumb--trailer {
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 18px;
  text-shadow: 0 0 8px #000;
}

/* ── info ─────────────────────────────── */
h2 {
  font-size: clamp(34px, 4.6vw, 54px);
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0 0 14px;
}
.ufo {
  display: inline-block;
  animation: hover 3s ease-in-out infinite;
}
@keyframes hover {
  50% { transform: translateY(-8px) rotate(-6deg); }
}
.tagline {
  font-size: 19px;
  font-weight: 500;
  margin: 0 0 12px;
}
.desc {
  color: var(--muted);
  margin: 0 0 24px;
}
.meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 20px;
  margin: 0 0 28px;
  padding: 18px;
  background: rgba(21, 18, 42, 0.8);
  border: 1px solid var(--border);
  border-radius: 10px;
}
.meta dt {
  font-family: var(--font-pixel);
  font-size: 9px;
  color: var(--muted);
  text-transform: uppercase;
  margin-bottom: 4px;
}
.meta dd {
  margin: 0;
  font-size: 15px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.btn--steam {
  background: var(--accent);
}
.price {
  padding-left: 10px;
  margin-left: 2px;
  border-left: 2px solid rgba(0, 0, 0, 0.35);
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
@media (max-width: 480px) {
  .meta {
    grid-template-columns: 1fr;
  }
  .hud--rec { left: 24px; top: 24px; }
  .hud--count { right: 24px; bottom: 24px; }
  .corner { display: none; }
}
</style>
