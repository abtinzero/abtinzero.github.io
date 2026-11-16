<script setup>
import HeroSection from './components/HeroSection.vue'
import GameEntry from './components/GameEntry.vue'
import AboutSection from './components/AboutSection.vue'
import LightBox from './components/LightBox.vue'
import { games } from './data/games'
</script>

<template>
  <HeroSection />
  <main>
    <section id="games" class="games wrap" aria-labelledby="games-heading">
      <h2 id="games-heading" class="games__heading">Games</h2>
      <GameEntry v-for="(g, i) in games" :key="g.id" :game="g" :index="i" />
    </section>
  </main>
  <AboutSection />
  <LightBox />
</template>

<style scoped>
.games {
  display: grid;
  gap: 140px;
  padding-bottom: 160px;
}
.games__heading {
  font-size: clamp(56px, 8vw, 96px);
  font-weight: 150;
  font-variation-settings: 'wdth' 62;
  color: var(--paper);
  margin-bottom: -80px;
}
@media (max-width: 640px) {
  .games {
    gap: 96px;
    padding-bottom: 100px;
  }
  .games__heading {
    margin-bottom: -56px;
  }
}
</style>
