<script setup>
import PhotoPrint from './PhotoPrint.vue'
import { profile } from '../data/profile'
import { games, asset } from '../data/games'

const [lead, second] = games
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
</script>

<template>
  <header class="top wrap">
    <a href="#" class="top__name">{{ profile.fullName }}</a>
    <nav class="top__nav" aria-label="Main">
      <a href="#games">Games</a>
      <a href="#about">About</a>
      <a href="https://abtin0.itch.io/" target="_blank" rel="noopener">itch.io</a>
    </nav>
  </header>

  <section class="hero wrap">
    <div class="hero__text">
      <h1 class="hero__name">
        <span>Abtin</span>
        <span>Saadat</span>
      </h1>
      <p class="hero__intro">{{ profile.intro }}</p>
      <div class="hero__actions">
        <a v-if="lead.links.steam" :href="lead.links.steam" target="_blank" rel="noopener" class="button">
          Get it on Steam, {{ lead.price }}
        </a>
        <a href="#games">See all my games</a>
      </div>
    </div>

    <div class="hero__prints">
      <div v-if="second" class="drop drop--back">
        <PhotoPrint :src="asset(second.cover)" :alt="`${second.title} cover`" ratio="5 / 4" :tilt="7" />
      </div>
      <div class="drop drop--front">
        <PhotoPrint :caption="`${lead.title}, ${lead.caption}`" :stamp="lead.stamp" :tilt="-2.5">
          <video
            v-if="lead.trailer"
            :src="lead.trailer"
            :poster="asset(lead.cover)"
            :autoplay="!reduced"
            :controls="reduced"
            muted
            loop
            playsinline
            preload="metadata"
            :aria-label="`${lead.title} gameplay trailer`"
          ></video>
          <img v-else :src="asset(lead.cover)" :alt="lead.title" />
        </PhotoPrint>
      </div>
    </div>
  </section>
</template>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding-top: 26px;
  padding-bottom: 26px;
}
.top a {
  color: var(--text);
  text-decoration: none;
}
.top a:hover {
  color: var(--saucer);
}
.top__name {
  font-weight: 600;
}
.top__nav {
  display: flex;
  gap: 26px;
}

.hero {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 56px;
  align-items: center;
  padding-top: 48px;
  padding-bottom: 120px;
}
.hero__name {
  display: flex;
  flex-direction: column;
  font-size: clamp(88px, 13vw, 196px);
  font-weight: 130;
  font-variation-settings: 'wdth' 62;
  line-height: 0.84;
  letter-spacing: -0.01em;
  color: var(--paper);
  margin-bottom: 36px;
}
.hero__intro {
  max-width: 36ch;
  font-size: 20px;
  margin: 0 0 32px;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 28px;
}

.hero__prints {
  position: relative;
  padding: 40px 0 0 0;
}
.drop--back {
  position: absolute;
  top: -10px;
  right: -12px;
  width: 38%;
}
.drop--front {
  position: relative;
  width: 92%;
}

/* the one load moment: prints drop onto the table */
.drop {
  animation: drop 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.15) both;
}
.drop--back {
  animation-delay: 0.05s;
}
.drop--front {
  animation-delay: 0.22s;
}
@keyframes drop {
  from {
    opacity: 0;
    transform: translateY(-36px) rotate(6deg) scale(1.04);
  }
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 48px;
    padding-top: 24px;
    padding-bottom: 80px;
  }
  .drop--front {
    width: 100%;
  }
  .drop--back {
    display: none;
  }
  .hero__prints {
    padding-top: 0;
  }
}
@media (max-width: 480px) {
  .top__nav {
    gap: 16px;
  }
  .top__name {
    display: none;
  }
}
</style>
