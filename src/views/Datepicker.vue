<template>
  <div class="datepicker">
    <h1>This is an datepicker page</h1>
    <Datepicker @dateSelected='selectedDate' />
  </div>
</template>

<script>
import Datepicker from '@/components/Datepicker.vue'

export default {
  name: 'DatepickerPage',
  components: {
    Datepicker
  },
  methods: {
    selectedDate(date) {
      console.log('date=>>', date)
    }
  }
}
</script>
