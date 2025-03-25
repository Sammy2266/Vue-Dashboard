<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <i class="pi pi-chart-line"></i>
      <span v-if="!collapsed">Dashboard</span>
    </div>
    <div class="sidebar-menu">
      <div
        v-for="item in menuItems"
        :key="item.label"
        class="sidebar-menu-item"
        :class="{ active: activeItem === item.label }"
        @click="activeItem = item.label"
      >
        <i :class="item.icon"></i>
        <span v-if="!collapsed">{{ item.label }}</span>
      </div>
    </div>
    <div class="sidebar-footer">
      <Button
        @click="collapsed = !collapsed"
        :icon="collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"
        text
        rounded
        aria-label="Toggle sidebar"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'

const collapsed = ref(false)
const activeItem = ref('Dashboard')

const menuItems = [
  { label: 'Dashboard', icon: 'pi pi-home' },
  { label: 'Analytics', icon: 'pi pi-chart-bar' },
  { label: 'Sales', icon: 'pi pi-dollar' },
  { label: 'Customers', icon: 'pi pi-users' },
  { label: 'Reports', icon: 'pi pi-file' },
  { label: 'Settings', icon: 'pi pi-cog' }
]
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s ease;
  width: v-bind(collapsed ? '60px' : '240px');
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  gap: 0.75rem;
}

.sidebar-header i {
  font-size: 1.5rem;
}

.sidebar-menu {
  flex: 1;
}

.sidebar-menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  margin: 0.25rem 0;
  cursor: pointer;
  gap: 0.75rem;
  transition: background-color 0.2s ease;
}

.sidebar-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-menu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.sidebar-menu-item i {
  font-size: 1.2rem;
  width: 1.5rem;
  text-align: center;
}

.sidebar-footer {
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
