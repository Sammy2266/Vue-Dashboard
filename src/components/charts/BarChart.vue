<template>
  <Card class="chart-card">
    <template #title>
      <div class="chart-header">
        <h3>{{ title }}</h3>
        <div class="chart-actions">
          <Button v-if="loading" icon="pi pi-spin pi-spinner" text disabled />
          <Button v-else icon="pi pi-refresh" text @click="refreshData" />
        </div>
      </div>
    </template>
    <template #content>
      <Bar
        :data="chartData"
        :options="chartOptions"
        class="chart-canvas"
      />
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import Card from 'primevue/card'
import Button from 'primevue/button'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{
  title: string
  data: number[]
  labels?: string[]
  color?: string
}>()

const emit = defineEmits<{
  refresh: []
}>()

const loading = ref(false)
const localData = ref<number[]>([])

watch(() => props.data, (newData) => {
  localData.value = [...newData]
}, { deep: true })

onMounted(() => {
  localData.value = [...props.data]
})

const chartData = computed(() => {
  return {
    labels: props.labels || Array.from({ length: localData.value.length }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: props.title,
        data: localData.value,
        backgroundColor: props.color || 'rgba(54, 162, 235, 0.6)',
        borderWidth: 0,
        borderRadius: 4,
        barThickness: 20
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: false
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

const refreshData = () => {
  loading.value = true
  emit('refresh')
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.chart-card {
  height: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.chart-actions {
  display: flex;
  gap: 0.5rem;
}

.chart-canvas {
  height: 300px;
}
</style>
