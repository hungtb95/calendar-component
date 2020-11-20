<template>
  <div class="datepicker">
    <h1>This is an datepicker page</h1>
      <Datepicker @dateSelected='selectedDate' :styles='style' />
  </div>
</template>

<script>
import Datepicker from '@/components/Datepicker.vue'

export default {
  name: 'DatepickerPage',
  components: {
    Datepicker
  },
  data() {
    return {
      style: {
        width: '300px'
      }
    }
  },
  methods: {
    selectedDate(date) {
      console.log('date=>>', date)
    }
  }
}
</script>
