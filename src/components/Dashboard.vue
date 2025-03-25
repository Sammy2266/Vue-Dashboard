<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h2>Dashboard Overview</h2>
      <div class="header-actions">
        <span class="last-updated">Last updated: {{ lastUpdated }}</span>
        <Button icon="pi pi-sync" rounded severity="secondary" @click="refreshAll" :loading="refreshing" />
      </div>
    </div>

    <div class="stats-grid">
      <StatsCard
        title="Total Users"
        :value="userStats.userCount"
        subtitle="Active accounts"
        icon="pi pi-users"
        color="#4F46E5"
        :trend="2.4"
      />

      <StatsCard
        title="Active Users"
        :value="userStats.activeUsers"
        subtitle="Current online"
        icon="pi pi-user"
        color="#10B981"
        :trend="5.1"
      />

      <StatsCard
        title="Conversion Rate"
        :value="userStats.conversionRate"
        subtitle="Percentage"
        icon="pi pi-percentage"
        color="#F59E0B"
        :trend="-1.8"
        :formatter="(val) => `${val}%`"
      />

      <StatsCard
        title="Total Revenue"
        :value="totalRevenue"
        subtitle="Last 7 days"
        icon="pi pi-dollar"
        color="#EF4444"
        :trend="3.2"
        :formatter="(val) => `$${val.toLocaleString()}`"
      />
    </div>

    <div class="charts-grid">
      <div class="chart-item">
        <LineChart
          title="Sales Trend"
          :data="salesData"
          color="#4F46E5"
          @refresh="refreshSalesData"
        />
      </div>

      <div class="chart-item">
        <BarChart
          title="Traffic Overview"
          :data="trafficData"
          color="rgba(16, 185, 129, 0.7)"
          @refresh="refreshTrafficData"
        />
      </div>

      <div class="chart-item wide">
        <LineChart
          title="Revenue Projection"
          :data="revenueData"
          color="#F59E0B"
          @refresh="refreshRevenueData"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Button from 'primevue/button'
import StatsCard from './widgets/StatsCard.vue'
import LineChart from './charts/LineChart.vue'
import BarChart from './charts/BarChart.vue'
import socketService from '../services/socketService'

const lastUpdated = ref(formatDateTime(new Date()))
const refreshing = ref(false)

const salesData = ref<number[]>([])
const trafficData = ref<number[]>([])
const revenueData = ref<number[]>([])
const userStats = ref({
  userCount: 0,
  activeUsers: 0,
  conversionRate: 0
})

const totalRevenue = computed(() => {
  return revenueData.value.reduce((sum, val) => sum + val, 0)
})

// Cleanup functions for event listeners
const cleanup: (() => void)[] = []

// Format date and time for display
function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

// Refresh all data
function refreshAll() {
  refreshing.value = true

  refreshSalesData()
  refreshTrafficData()
  refreshRevenueData()

  // Simulate a slight delay for refresh
  setTimeout(() => {
    lastUpdated.value = formatDateTime(new Date())
    refreshing.value = false
  }, 1000)
}

// Individual refresh functions for each chart
function refreshSalesData() {
  // In a real app, you would fetch fresh data from the API here
  // For now, we'll just use our mock service
}

function refreshTrafficData() {
  // In a real app, you would fetch fresh data from the API here
}

function refreshRevenueData() {
  // In a real app, you would fetch fresh data from the API here
}

onMounted(() => {
  // Initialize data
  salesData.value = [...socketService.salesData.value]
  trafficData.value = [...socketService.trafficData.value]
  revenueData.value = [...socketService.revenueData.value]
  userStats.value = {
    userCount: socketService.userCount.value,
    activeUsers: socketService.activeUsers.value,
    conversionRate: socketService.conversionRate.value
  }

  // Setup real-time updates
  cleanup.push(socketService.on('sales-update', (data) => {
    salesData.value = [...data]
    lastUpdated.value = formatDateTime(new Date())
  }))

  cleanup.push(socketService.on('traffic-update', (data) => {
    trafficData.value = [...data]
    lastUpdated.value = formatDateTime(new Date())
  }))

  cleanup.push(socketService.on('users-update', (data) => {
    userStats.value = { ...data }
    lastUpdated.value = formatDateTime(new Date())
  }))

  cleanup.push(socketService.on('revenue-update', (data) => {
    revenueData.value = [...data]
    lastUpdated.value = formatDateTime(new Date())
  }))
})

onUnmounted(() => {
  // Clean up event listeners
  cleanup.forEach(fn => fn())
})
</script>

<style scoped>
.dashboard {
  height: 100%;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.dashboard-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.last-updated {
  font-size: 0.85rem;
  color: #64748b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 1.5rem;
}

.chart-item {
  min-height: 350px;
}

.chart-item.wide {
  grid-column: span 2;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-item.wide {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
