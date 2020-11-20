<template>
  <div class="calendar">
    <h1>This is an calendar page</h1>
    <CalendarWeek @dateSelected='selectedDate' />
  </div>
</template>

<script>
import CalendarWeek from '@/components/CalendarWeek.vue'

export default {
  name: 'CalendarPage',
  components: {
    CalendarWeek
  },
  methods: {
    selectedDate(date) {
      console.log('date=>>', date)
    }
  }
}
</script>
