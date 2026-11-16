<script setup>
import PixelField from './PixelField.vue'
import { profile } from '../data/profile'
import { games } from '../data/games'

const engines = [...new Set(games.flatMap((g) => [g.engine, ...(g.tools || [])]))]
const spotlight = games.find((g) => g.spotlight)
</script>

<template>
  <section id="top" class="hero">
    <PixelField class="hero__bg" />
    <div class="container hero__inner">
      <a v-if="spotlight" href="#spotlight" class="hero__news">
        <span class="hero__news-tag pixel">NEW</span>
        🛸 {{ spotlight.title }} is out now on Steam <span aria-hidden="true">→</span>
      </a>
      <p class="hero__hello pixel">
        <span class="blink">▶</span> PLAYER ONE: {{ profile.name.toUpperCase() }}
      </p>
      <h1 class="hero__title">
        I build <span class="hl hl--pink">games</span><br />
        that feel <span class="hl hl--yellow">good</span> to play.
      </h1>
      <p class="hero__tagline">{{ profile.tagline }}</p>

      <div class="hero__actions">
        <a href="#spotlight" class="btn">Press start</a>
        <a href="#about" class="btn btn--ghost">About me</a>
      </div>

      <ul class="hero__engines" aria-label="Engines I use">
        <li v-for="e in engines" :key="e">{{ e }}</li>
      </ul>
    </div>
    <a href="#spotlight" class="hero__scroll pixel" aria-label="Scroll to games">▼</a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 100px 0 80px;
}
.hero__bg {
  position: absolute;
  inset: 0;
}
.hero__inner {
  position: relative;
}
.hero__news {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  padding: 6px 14px 6px 6px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(28, 24, 54, 0.75);
  color: var(--text);
  text-decoration: none;
  font-size: 15px;
  transition: border-color 0.15s, transform 0.15s;
}
.hero__news:hover {
  border-color: var(--pink);
  transform: translateY(-1px);
}
.hero__news-tag {
  font-size: 9px;
  padding: 6px 8px;
  border-radius: 999px;
  background: var(--pink);
  color: #000;
}
.hero__hello {
  font-size: 12px;
  color: var(--mint);
  margin: 0 0 24px;
}
.blink {
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
.hero__title {
  font-size: clamp(44px, 8.5vw, 104px);
  line-height: 1;
  letter-spacing: -0.04em;
  font-weight: 700;
  margin: 0 0 28px;
}
.hl {
  position: relative;
  display: inline-block;
  padding: 0 0.12em;
  color: #000;
  transform: rotate(-2deg);
  border: 4px solid #000;
  box-shadow: var(--shadow-pop);
  border-radius: 10px;
}
.hl--pink {
  background: var(--pink);
}
.hl--yellow {
  background: var(--yellow);
  transform: rotate(1.5deg);
}
.hero__tagline {
  font-size: clamp(17px, 2vw, 20px);
  color: var(--muted);
  max-width: 54ch;
  margin: 0 0 36px;
}
.hero__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.hero__engines {
  list-style: none;
  padding: 0;
  margin: 44px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.hero__engines li {
  font-family: var(--font-pixel);
  font-size: 10px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--muted);
  background: rgba(28, 24, 54, 0.6);
}
.hero__scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;
  color: var(--muted);
  font-size: 14px;
  animation: bob 1.4s ease-in-out infinite;
}
@media (max-width: 640px) {
  .hero__scroll {
    display: none;
  }
}
@keyframes bob {
  50% { transform: translate(-50%, 8px); }
}
</style>
