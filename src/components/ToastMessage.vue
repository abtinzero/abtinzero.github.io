<script setup>
defineProps({ message: String })
</script>

<template>
  <Transition name="toast">
    <div v-if="message" class="toast pixel" role="status">{{ message }}</div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  font-size: 11px;
  padding: 14px 18px;
  background: var(--yellow);
  color: #000;
  border: 3px solid #000;
  border-radius: 8px;
  box-shadow: 4px 4px 0 #000;
  white-space: nowrap;
  max-width: calc(100vw - 32px);
  overflow: hidden;
  text-overflow: ellipsis;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s cubic-bezier(0.2, 1.4, 0.4, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
