<template>
  <div class="calendar">
    <h1>This is an calendar page</h1>
    <CalendarMonth @dateSelected='selectedDate' />
  </div>
</template>

<script>
import CalendarMonth from '@/components/CalendarMonth.vue'

export default {
  name: 'CalendarPage',
  components: {
    CalendarMonth
  },
  methods: {
    selectedDate(date) {
      console.log('date=>>', date)
    }
  }
}
</script>
