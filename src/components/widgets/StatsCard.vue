<template>
  <Card class="stats-card">
    <template #content>
      <div class="stats-content">
        <div class="stats-icon" :style="{ backgroundColor: getIconBgColor() }">
          <i :class="icon" :style="{ color: getIconColor() }"></i>
        </div>
        <div class="stats-info">
          <h3 class="stats-title">{{ title }}</h3>
          <div class="stats-value">
            <span>{{ formattedValue }}</span>
            <div v-if="trend !== undefined" class="stats-trend" :class="getTrendClass()">
              <i :class="getTrendIcon()"></i>
              <span>{{ Math.abs(trend) }}%</span>
            </div>
          </div>
          <div class="stats-subtitle">{{ subtitle }}</div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'

const props = defineProps<{
  title: string
  value: number
  subtitle?: string
  icon: string
  color?: string
  trend?: number
  formatter?: (value: number) => string
}>()

const formattedValue = computed(() => {
  if (props.formatter) {
    return props.formatter(props.value)
  }

  // Default formatting for different value types
  if (props.value >= 1000) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(props.value)
  }

  return props.value.toString()
})

const getIconBgColor = () => {
  if (!props.color) return 'rgba(65, 184, 131, 0.1)'

  // Convert hex to rgba with 0.1 opacity
  if (props.color.startsWith('#')) {
    const r = parseInt(props.color.slice(1, 3), 16)
    const g = parseInt(props.color.slice(3, 5), 16)
    const b = parseInt(props.color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, 0.1)`
  }

  return props.color
}

const getIconColor = () => {
  return props.color || '#41B883'
}

const getTrendClass = () => {
  if (props.trend === undefined) return ''
  return props.trend >= 0 ? 'positive' : 'negative'
}

const getTrendIcon = () => {
  if (props.trend === undefined) return ''
  return props.trend >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down'
}
</script>

<style scoped>
.stats-card {
  height: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.stats-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stats-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stats-info {
  flex: 1;
}

.stats-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
}

.stats-value {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.stats-value span:first-child {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.stats-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.stats-trend.positive {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.stats-trend.negative {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.stats-subtitle {
  font-size: 0.85rem;
  color: #64748b;
}
</style>
