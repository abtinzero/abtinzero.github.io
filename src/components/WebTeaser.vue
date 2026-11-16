<script setup>
// Placeholder for the upcoming web projects section — shown as a "locked level".
defineEmits(['poke'])
</script>

<template>
  <section id="web" class="section">
    <div class="container">
      <button class="locked" @click="$emit('poke')">
        <span class="lock" aria-hidden="true">🔒</span>
        <span class="eyebrow pixel">World 2</span>
        <span class="title">Web Projects</span>
        <span class="sub">Full-stack apps built with Vue.js &amp; friends. Unlocking soon.</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-top: 20px;
}
.locked {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 56px 24px;
  font: inherit;
  color: var(--text);
  cursor: pointer;
  border: 3px dashed var(--border);
  border-radius: var(--radius);
  background: repeating-linear-gradient(-45deg, var(--bg-2) 0 14px, var(--bg) 14px 28px);
  transition: border-color 0.2s;
}
.locked:hover {
  border-color: var(--muted);
}
.locked:hover .lock {
  animation: shake 0.4s;
}
@keyframes shake {
  25% { transform: rotate(-12deg); }
  75% { transform: rotate(12deg); }
}
.lock {
  font-size: 40px;
}
.eyebrow {
  font-size: 10px;
  color: var(--blue);
  text-transform: uppercase;
}
.title {
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.sub {
  color: var(--muted);
  text-align: center;
}
</style>
