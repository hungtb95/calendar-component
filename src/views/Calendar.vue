<template>
  <div class="calendar">
    <h1>This is an calendar page</h1>
    <Calendar />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'CalendarPage',
  components: {
    Calendar
  }
}
</script>
