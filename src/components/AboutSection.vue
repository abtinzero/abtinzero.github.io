<script setup>
import PhotoPrint from './PhotoPrint.vue'
import { profile } from '../data/profile'
import { asset } from '../data/games'

const year = new Date().getFullYear()
</script>

<template>
  <section id="about" class="about wrap">
    <div class="about__photo">
      <PhotoPrint :src="asset(profile.photo)" :alt="profile.fullName" caption="me" ratio="1 / 1" :tilt="-3" />
    </div>
    <div class="about__text">
      <h2 class="heading">About</h2>
      <p v-for="(p, i) in profile.about" :key="i">{{ p }}</p>
      <ul class="about__links">
        <li v-for="l in profile.links" :key="l.label">
          <a :href="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
        </li>
      </ul>
    </div>
  </section>

  <footer class="foot wrap">
    <span>© {{ year }} {{ profile.fullName }}</span>
    <span>Built with Vue</span>
  </footer>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 220px minmax(0, 60ch);
  gap: 64px;
  align-items: start;
  padding-top: 40px;
  padding-bottom: 120px;
}
.about__photo {
  padding-top: 12px;
}
.heading {
  font-size: clamp(56px, 8vw, 96px);
  font-weight: 150;
  font-variation-settings: 'wdth' 62;
  color: var(--paper);
  margin-bottom: 24px;
}
.about__text p {
  margin: 0 0 16px;
}
.about__links {
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 28px;
}
.foot {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 28px;
  padding-bottom: 40px;
  font-size: 15px;
  color: var(--muted);
}
@media (max-width: 720px) {
  .about {
    grid-template-columns: 1fr;
    gap: 36px;
    padding-bottom: 80px;
  }
  .about__photo {
    width: 180px;
  }
}
</style>
