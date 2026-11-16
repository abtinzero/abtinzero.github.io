<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { profile } from '../data/profile'

const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 20)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="container nav__inner">
      <a href="#top" class="logo pixel">
        <span class="logo__invader" aria-hidden="true"></span>
        {{ profile.name }}
      </a>
      <nav class="nav__links">
        <a href="#spotlight">UFO</a>
        <a href="#games">Games</a>
        <a href="#web" class="locked">Web <span aria-hidden="true">🔒</span></a>
        <a href="#about">About</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: background 0.2s, border-color 0.2s;
  border-bottom: 1px solid transparent;
}
.nav--scrolled {
  background: rgba(13, 11, 26, 0.85);
  backdrop-filter: blur(10px);
  border-color: var(--border);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  text-decoration: none;
}
/* tiny pixel invader built with box-shadows */
.logo__invader {
  width: 3px;
  height: 3px;
  margin: 0 30px 18px 0;
  color: var(--pink);
  box-shadow:
    6px 0, 24px 0,
    9px 3px, 21px 3px,
    6px 6px, 9px 6px, 12px 6px, 15px 6px, 18px 6px, 21px 6px, 24px 6px,
    3px 9px, 6px 9px, 12px 9px, 15px 9px, 18px 9px, 24px 9px, 27px 9px,
    0 12px, 3px 12px, 6px 12px, 9px 12px, 12px 12px, 15px 12px, 18px 12px, 21px 12px, 24px 12px, 27px 12px, 30px 12px,
    0 15px, 6px 15px, 9px 15px, 12px 15px, 15px 15px, 18px 15px, 21px 15px, 24px 15px, 30px 15px,
    0 18px, 6px 18px, 24px 18px, 30px 18px,
    9px 21px, 12px 21px, 18px 21px, 21px 21px;
  animation: wiggle 1s steps(2) infinite;
}
@keyframes wiggle {
  50% { transform: translateY(-2px); }
}
.nav__links {
  display: flex;
  gap: 6px;
}
.nav__links a {
  text-decoration: none;
  color: var(--muted);
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  transition: color 0.15s, background 0.15s;
}
.nav__links a:hover {
  color: var(--text);
  background: var(--surface);
}
.locked span {
  font-size: 12px;
}
.nav__links a {
  white-space: nowrap;
}
@media (max-width: 520px) {
  .nav__links {
    gap: 0;
  }
  .nav__links a {
    padding: 8px 7px;
    font-size: 14px;
  }
  .locked span {
    display: none;
  }
  .logo {
    font-size: 11px;
  }
}
</style>
