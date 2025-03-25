import { ref } from 'vue'

// This is a mock socket service that simulates real-time data
// In a real application, you would use socket.io-client to connect to a real socket server

const salesData = ref([1200, 1900, 3000, 5000, 2000, 3000])
const trafficData = ref([500, 800, 1200, 1800, 1000, 1500])
const userCount = ref(1245)
const activeUsers = ref(789)
const conversionRate = ref(2.5)
const revenueData = ref([12000, 19000, 15000, 21000, 18000, 22000])

// Event callbacks
const callbacks: Record<string, Array<(data: any) => void>> = {
  'sales-update': [],
  'traffic-update': [],
  'users-update': [],
  'revenue-update': []
}

// Emit an event to all registered callbacks
const emit = (event: string, data: any) => {
  if (callbacks[event]) {
    callbacks[event].forEach(callback => callback(data))
  }
}

// Register a callback for an event
const on = (event: string, callback: (data: any) => void) => {
  if (!callbacks[event]) {
    callbacks[event] = []
  }
  callbacks[event].push(callback)

  return () => {
    const index = callbacks[event].indexOf(callback)
    if (index !== -1) {
      callbacks[event].splice(index, 1)
    }
  }
}

// Simulate real-time updates
setInterval(() => {
  // Update sales data
  salesData.value = salesData.value.map(value =>
    value + Math.floor(Math.random() * 200) - 100
  )
  emit('sales-update', salesData.value)

  // Update traffic data
  trafficData.value = trafficData.value.map(value =>
    value + Math.floor(Math.random() * 100) - 50
  )
  emit('traffic-update', trafficData.value)

  // Update user counts
  userCount.value += Math.floor(Math.random() * 10) - 5
  activeUsers.value += Math.floor(Math.random() * 8) - 4
  conversionRate.value = Number((conversionRate.value + (Math.random() * 0.2 - 0.1)).toFixed(2))
  emit('users-update', { userCount: userCount.value, activeUsers: activeUsers.value, conversionRate: conversionRate.value })

  // Update revenue data
  revenueData.value = revenueData.value.map(value =>
    value + Math.floor(Math.random() * 1000) - 500
  )
  emit('revenue-update', revenueData.value)
}, 3000)

export default {
  on,
  emit,
  salesData,
  trafficData,
  userCount,
  activeUsers,
  conversionRate,
  revenueData
}
