<template>
  <div class="dashboard-layout">
    <Header />
    <div class="dashboard-content">
      <Sidebar />
      <main class="dashboard-main">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.dashboard-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.dashboard-main {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: #f5f7fa;
}
</style>
