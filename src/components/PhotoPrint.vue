<script setup>
// A photo print: paper border, handwritten caption, optional film date-stamp.
// Put an <img>/<video> in the default slot, or pass `src`.
defineProps({
  src: String,
  alt: { type: String, default: '' },
  caption: String,
  stamp: String,
  tilt: { type: Number, default: 0 },
  ratio: { type: String, default: '16 / 9' },
})
</script>

<template>
  <figure class="print" :style="{ '--tilt': `${tilt}deg` }">
    <div class="print__photo" :style="{ aspectRatio: ratio }">
      <slot>
        <img :src="src" :alt="alt" loading="lazy" />
      </slot>
      <span v-if="stamp" class="print__stamp" aria-hidden="true">{{ stamp }}</span>
    </div>
    <figcaption v-if="caption" class="print__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.print {
  margin: 0;
  padding: 10px 10px 0;
  background: var(--paper);
  border-radius: 2px;
  transform: rotate(var(--tilt));
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.45),
    0 3px 6px -2px rgba(0, 0, 0, 0.35),
    0 24px 40px -18px rgba(3, 6, 28, 0.95);
}
.print:not(:has(figcaption)) {
  padding-bottom: 10px;
}
.print__photo {
  position: relative;
  overflow: hidden;
  background: #0a0d20;
}
.print__photo :slotted(img),
.print__photo :slotted(video),
.print__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* the orange LED date that 90s film cameras burned into the corner */
.print__stamp {
  position: absolute;
  right: 4%;
  bottom: 5%;
  font-family: 'DSEG7', monospace;
  font-size: clamp(11px, 1.3vw, 16px);
  letter-spacing: 0.08em;
  color: var(--stamp);
  text-shadow: 0 0 4px rgba(255, 120, 20, 0.85), 0 0 1px #ffcf9a;
  opacity: 0.92;
  pointer-events: none;
  mix-blend-mode: screen;
}
.print__caption {
  font-family: var(--hand);
  color: var(--paper-ink);
  font-size: 19px;
  line-height: 1.2;
  padding: 10px 4px 12px;
  transform: rotate(-0.6deg);
}
</style>
