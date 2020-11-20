<template>
  <div class="calendar">
    <h1>This is an calendar page</h1>
    <Calendar @dateSelected='selectedDate' />
  </div>
</template>

<script>
import Calendar from '@/components/CalendarMonth.vue'

export default {
  name: 'CalendarPage',
  components: {
    Calendar
  },
  methods: {
    selectedDate(date) {
      console.log('date=>>', date)
    }
  }
}
</script>
