<template>
  <div :class="['wrap-calendar-left']" :style="styles">
    <div class="head-title-calendar d-flex">
      <span class="month-year-title mr-auto ml-auto">
        {{ $dayjs(this.datetime).format('YYYY年MM月DD日 (ddd)') }}
      </span>
      <div class="div-img-calendar" @click="preWeek">
        <img src="../assets/images/prev-month.png" alt srcset />
      </div>
      <button class="btn__today" @click="today">今日</button>
      <div class="div-img-calendar" @click="nextWeek">
        <img src="../assets/images/next-month.png" alt srcset />
      </div>
    </div>

    <div class="wrap-head-and-body">
      <div class="head-calendar">
        <div class="column-cal">日曜日</div>
        <div class="column-cal">月曜日</div>
        <div class="column-cal">火曜日</div>
        <div class="column-cal">水曜日</div>
        <div class="column-cal">木曜日</div>
        <div class="column-cal">金曜日</div>
        <div class="column-cal">土曜日</div>
      </div>

      <div class="body-calendar">
        <div
          v-for="(value, index) in dateWeekRange"
          :key="index"
          :class="[
            'day-calendar',
            checkIsHoliday(value),
            checkIsWeekend(value),
            { 'is-now': dateNow === value.date() && isDateTimeNow }
          ]"
          @click="selectDate(value)"
        >
          <div
            :class="[
              'box',
              {
                'day-active': datetimeInMonth.dayActive === value.date() && isDateTimeDayActive,
              },
            ]"
          >
            <div class="box__day">
              <b>{{ value.get('date') }}</b>
            </div>
            <div class="box__info"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
const HOLIDAY_DATE_FORMAT = 'YYYY-MM-DD'

export default {
  name: 'CalendarWeek',
  props: {
    initValue: {
      type: Date,
      default: null
    },
    styles: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      datetime: this.$dayjs(),
      dateSelected: this.initValue && this.$dayjs(this.initValue).isValid() ? this.initValue : null,
      numberRow: 6,
      holiday: [
        '2020-12-10',
        '2020-11-10',
        '2020-10-13',
        '2020-09-29'
      ]
    }
  },
  computed: {
    dateNow() {
      return this.$dayjs().date()
    },
    isDateTimeNow() {
      return (
        this.$dayjs().isSame(this.datetime, 'year')
        && this.$dayjs().isSame(this.datetime, 'month')
      )
    },
    isDateTimeDayActive() {
      return (
        this.$dayjs(this.datetime).isSame(this.dateSelected, 'year')
        && this.$dayjs(this.datetime).isSame(this.dateSelected, 'month')
      )
    },
    datetimeInMonth() {
      const datetimeInMonth = {
        daysInMonth: this.$dayjs(this.datetime).daysInMonth(),
        dayActive: this.$dayjs(this.dateSelected).date()
      }

      return datetimeInMonth
    },
    dateWeekRange() {
      const dateWeekArr = []
      for (let index = 0; index <= 6; index++) {
        const date = this.$dayjs(this.datetime).day(index)
        dateWeekArr.push(date)
      }

      return dateWeekArr
    }
  },
  methods: {
    nextWeek() {
      this.datetime = this.$dayjs(this.datetime).add(1, 'week').toDate()
    },

    preWeek() {
      this.datetime = this.$dayjs(this.datetime).subtract(1, 'week').toDate()
    },

    today() {
      this.datetime = this.$dayjs().toDate()
    },

    selectDate(date) {
      this.dateSelected = date.toDate()

      this.$emit('dateSelected', this.dateSelected)
    },

    checkIsWeekend(date) {
      const dayNumber = date.day()

      let className = ''
      if (dayNumber === 0) className = 'is-sunday'
      if (dayNumber === 6) className = 'is-saturday'

      return className
    },

    checkIsHoliday(date) {
      const dateFormat = date.format(HOLIDAY_DATE_FORMAT)

      return this.holiday.includes(dateFormat) ? 'is-holiday' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
$color-yellow: #f4eec0;
$color-brown: #7e6752;
$color-black: #cccccc;
$color-gray: #eaeaea;
$color-sunday : #ffe1e1;
$color-saturday : #e6f7ff;
$color-active : #51e0db;

.wrap-calendar-left {
  width: 100%;
  font-size: 0.8rem;
  .head-title-calendar , .head-calendar , .body-calendar{
    display: flex;
  }
  .head-title-calendar{
    background: $color-yellow;
    padding: 5px;
    justify-content: center;
    border: 1px solid $color-brown;
    .month-year-title{
      font-size: 1rem;
      margin-left: 25px;
      margin-right: 25px;
      margin-top: 5px;
      font-weight: bold;
    }
    .div-img-calendar{
      padding: 3px 8px;
      background: #f2f2f2;
      border : 1px solid #d7d7d7;
      cursor: pointer;
      img{
        width: 5px;
      }
    }
  }
  .head-calendar{
    .column-cal{
      width: calc(100% / 7);
      background: $color-gray;
      &:first-child{
        background: $color-sunday !important;
      }
      &:last-child{
        background: $color-saturday !important;
      }
    }
  }
  .body-calendar{
    flex-wrap: wrap;
    .day-calendar{
      width: calc(100% / 7);
      padding-top: 5px;
      padding-bottom: 5px;
      &:hover{
        opacity: 0.7;
        cursor: pointer;
      }
    }
  }
  .wrap-head-and-body{
    border: 1px solid $color-black;
    padding: 5px;
  }
  .day-calendar{
    background: $color-gray;
  }
  .is-saturday {
    background: $color-saturday;
  }
  .is-holiday,
  .is-sunday {
    background: $color-sunday;
  }
  .day-active {
    background: $color-active;
  }

  .box {
    &__day {
      border: 1px solid;
    }
    &__info {
      border: 1px solid;
      height: 50px;
    }
  }
}
</style>
