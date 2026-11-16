<script setup>
import { profile } from '../data/profile'
import { asset } from '../data/games'
const year = new Date().getFullYear()
</script>

<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="panel">
        <div class="text">
          <span class="eyebrow pixel">Character select</span>
          <div class="who">
            <img v-if="profile.photo" :src="asset(profile.photo)" :alt="profile.fullName" class="avatar" />
            <h2>About me</h2>
          </div>
          <p v-for="(p, i) in profile.about" :key="i">{{ p }}</p>
          <div class="links">
            <a v-for="l in profile.links" :key="l.label" :href="l.href" target="_blank" rel="noopener" class="btn btn--ghost">{{ l.label }}</a>
          </div>
        </div>
        <ul class="stats">
          <li v-for="s in profile.stats" :key="s.label">
            <span class="value">{{ s.value }}</span>
            <span class="label pixel">{{ s.label }}</span>
          </li>
        </ul>
      </div>
    </div>
    <footer class="container footer">
      <span>© {{ year }} {{ profile.fullName }}</span>
      <span class="hint pixel">↑↑↓↓←→←→BA</span>
    </footer>
  </section>
</template>

<style scoped>
.about {
  padding-bottom: 40px;
}
.panel {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 40px;
  padding: 44px;
  background: var(--surface);
  border: 3px solid #000;
  border-radius: var(--radius);
  box-shadow: 8px 8px 0 0 var(--violet);
}
.eyebrow {
  font-size: 11px;
  color: var(--pink);
  text-transform: uppercase;
}
.who {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 12px 0 16px;
}
.avatar {
  width: 76px;
  height: 76px;
  border-radius: 12px;
  border: 3px solid #000;
  box-shadow: 4px 4px 0 var(--mint);
  object-fit: cover;
  image-rendering: auto;
}
.who h2 {
  margin: 0;
}
h2 {
  font-size: clamp(32px, 5vw, 48px);
  margin: 12px 0 16px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
p {
  color: var(--muted);
  margin: 0 0 14px;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}
.stats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 14px;
  align-content: center;
}
.stats li {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 20px;
  background: var(--bg-2);
  border-radius: 10px;
  border-left: 4px solid var(--mint);
}
.stats li:nth-child(2) { border-color: var(--yellow); }
.stats li:nth-child(3) { border-color: var(--pink); }
.value {
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
}
.label {
  font-size: 9px;
  color: var(--muted);
  text-transform: uppercase;
}
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  color: var(--muted);
  font-size: 14px;
}
.hint {
  font-size: 9px;
  opacity: 0.35;
}
@media (max-width: 800px) {
  .panel {
    grid-template-columns: 1fr;
    padding: 28px 22px;
  }
}
</style>
