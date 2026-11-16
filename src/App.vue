<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import SpotlightSection from './components/SpotlightSection.vue'
import GamesSection from './components/GamesSection.vue'
import WebTeaser from './components/WebTeaser.vue'
import AboutSection from './components/AboutSection.vue'
import GameModal from './components/GameModal.vue'
import ToastMessage from './components/ToastMessage.vue'

const activeGame = ref(null)
const toast = ref('')

// ↑ ↑ ↓ ↓ ← → ← → B A toggles CRT mode
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let progress = 0

function onKey(e) {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
  progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0
  if (progress === KONAMI.length) {
    progress = 0
    const on = document.body.classList.toggle('crt')
    showToast(on ? 'CHEAT ACTIVATED: CRT MODE' : 'CRT MODE OFF')
  }
}

function showToast(msg) {
  toast.value = msg
  clearTimeout(showToast.t)
  showToast.t = setTimeout(() => (toast.value = ''), 2600)
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <SpotlightSection @open="activeGame = $event" />
    <GamesSection @open="activeGame = $event" />
    <WebTeaser @poke="showToast('🔒 This level unlocks soon!')" />
    <AboutSection />
  </main>
  <GameModal :game="activeGame" @close="activeGame = null" />
  <ToastMessage :message="toast" />
</template>
