<template>
  <header class="header">
    <div class="header-left">
      <h1 class="logo">Analytics Dashboard</h1>
    </div>
    <div class="header-right">
      <div class="time">{{ currentTime }}</div>
      <Button icon="pi pi-bell" severity="secondary" rounded text aria-label="Notifications" />
      <Avatar icon="pi pi-user" size="large" shape="circle" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'

const currentTime = ref(formatTime(new Date()))
let timer: number | undefined

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(date)
}

onMounted(() => {
  timer = window.setInterval(() => {
    currentTime.value = formatTime(new Date())
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time {
  font-size: 0.9rem;
  color: #555;
  margin-right: 0.5rem;
}
</style>
