<script setup>
// Floating pixel "stars" that drift and scatter away from the cursor.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvas = ref(null)
const COLORS = ['#ff4d8d', '#ffc94d', '#4dffb8', '#4dc3ff', '#7c6cff', '#f1eeff']
let ctx, w, h, dpr, raf, pixels = []
const mouse = { x: -9999, y: -9999 }
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function resize() {
  const el = canvas.value
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = el.clientWidth
  h = el.clientHeight
  el.width = w * dpr
  el.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const count = Math.round((w * h) / 9000)
  pixels = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: 0,
    vy: 0,
    drift: 0.15 + Math.random() * 0.45,
    size: [3, 3, 4, 6][Math.floor(Math.random() * 4)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: 0.25 + Math.random() * 0.6,
  }))
}

function frame() {
  ctx.clearRect(0, 0, w, h)
  for (const p of pixels) {
    const dx = p.x - mouse.x
    const dy = p.y - mouse.y
    const dist2 = dx * dx + dy * dy
    if (dist2 < 120 * 120 && dist2 > 0) {
      const f = (1 - Math.sqrt(dist2) / 120) * 1.2
      p.vx += (dx / Math.sqrt(dist2)) * f
      p.vy += (dy / Math.sqrt(dist2)) * f
    }
    p.vx *= 0.92
    p.vy *= 0.92
    p.x += p.vx
    p.y += p.vy - p.drift
    if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
    if (p.x < -10) p.x = w + 10
    if (p.x > w + 10) p.x = -10
    if (p.y > h + 10) p.y = -10
    ctx.globalAlpha = p.alpha
    ctx.fillStyle = p.color
    ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size)
  }
  ctx.globalAlpha = 1
  raf = requestAnimationFrame(frame)
}

function onMove(e) {
  const r = canvas.value.getBoundingClientRect()
  mouse.x = e.clientX - r.left
  mouse.y = e.clientY - r.top
}
function onLeave() {
  mouse.x = mouse.y = -9999
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)
  if (reduced) {
    // draw a single static frame
    frame()
    cancelAnimationFrame(raf)
  } else {
    frame()
  }
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onMove)
  document.removeEventListener('pointerleave', onLeave)
})
</script>

<template>
  <canvas ref="canvas" aria-hidden="true"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  display: block;
  -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent);
  mask-image: linear-gradient(to bottom, #000 70%, transparent);
}
</style>
