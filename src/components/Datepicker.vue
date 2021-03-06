<template>
  <div :class="['wrap-calendar-left']" :style="styles">
    <div class="head-title-calendar d-flex">
      <div class="div-img-calendar" @click="preMonth">
        <img src="../assets/images/prev-month.png" alt srcset />
      </div>
      <span class="month-year-title mr-auto ml-auto">
        {{ $dayjs(this.datetime).format('YYYY/MM') }}
      </span>
      <div class="div-img-calendar" @click="nextMonth">
        <img src="../assets/images/next-month.png" alt srcset />
      </div>
    </div>
    <div class="wrap-head-and-body">
      <div class="head-calendar">
        <div class="column-cal">日</div>
        <div class="column-cal">月</div>
        <div class="column-cal">火</div>
        <div class="column-cal">水</div>
        <div class="column-cal">木</div>
        <div class="column-cal">金</div>
        <div class="column-cal">土</div>
      </div>

      <div class="body-calendar">
        <div
          v-for="value in prevDateRange"
          :key="`empty${value}`"
          :class="[
            checkIsWeekend(value, true),
            checkIsHoliday(value, true),
            'day-calendar'
          ]"
        >
          <b>{{ value }}</b>
        </div>

        <div
          v-for="value in datetimeInMonth.daysInMonth"
          :key="`day${value}`"
          :class="[
            checkIsWeekend(value),
            checkIsHoliday(value),
            'day-calendar'
          ]"
          @click="selectDate(value)"
        >
          <div
            :class="[
              'wrap-day',
              { now: dateNow === value && isDateTimeNow },
              {
                'day-active':
                  datetimeInMonth.dayActive === value && isDateTimeDayActive,
              },
            ]"
          >
            {{ value }}
          </div>
        </div>

        <div
          v-for="value in nextDateRange"
          :key="`empty${value}`"
          :class="[
            checkIsWeekend(value, false, true),
            checkIsHoliday(value, false, true),
            'day-calendar'
          ]"
        >
          <b>{{ value }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Datepicker',
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
    dateOfPrevMonth() {
      const dayStartOfMonth = this.$dayjs(this.datetime).startOf('month').day()
      const dateOfPrevMonth = this.$dayjs(this.datetime).subtract(1, 'month').endOf('month')

      const result = dateOfPrevMonth.subtract(dayStartOfMonth - 1, 'day').format('YYYY-MM-DD')

      return result
    },
    startDateOfCurrentMonth() {
      return this.$dayjs(this.datetime).startOf('month').format('YYYY-MM-DD')
    },
    prevDateRange() {
      if (this.dateOfPrevMonth === this.startDateOfCurrentMonth) return []
      const from = this.$dayjs(this.dateOfPrevMonth).get('date')
      const to = this.$dayjs(this.dateOfPrevMonth).endOf('month').get('date')

      return Array.from({ length: to - from + 1 }, (v, k) => k + from)
    },
    nextDateRange() {
      const numberDaysOfMonth = this.$dayjs(this.datetime).daysInMonth()
      const numberPrevDate = this.prevDateRange.length
      const numberNextDate = (this.numberRow * 7) - numberPrevDate - numberDaysOfMonth

      return numberNextDate
    }
  },
  methods: {
    nextMonth() {
      this.datetime = this.$dayjs(this.datetime).add(1, 'month').toDate()
    },

    preMonth() {
      this.datetime = this.$dayjs(this.datetime).subtract(1, 'month').toDate()
    },

    selectDate(date) {
      const datetimeFormat = this.$dayjs(this.datetime).format('YYYY/MM')
      this.dateSelected = this.$dayjs(
        `${datetimeFormat}/${date}`,
        'YYYY/MM/D'
      ).toDate()

      this.$emit('dateSelected', this.dateSelected)
    },
    checkIsWeekend(date, isPrev = false, isNext = false) {
      let datetimeFormat = ''
      if (isPrev) datetimeFormat = this.$dayjs(this.datetime).subtract(1, 'month').format('YYYY-MM')
      if (isNext) datetimeFormat = this.$dayjs(this.datetime).add(1, 'month').format('YYYY-MM')
      if (!isNext && !isPrev) datetimeFormat = this.$dayjs(this.datetime).format('YYYY-MM')
      const dayNumber = this.$dayjs(
        `${datetimeFormat}-${date}`,
        'YYYY-MM-D'
      ).day()

      let className = ''
      if (dayNumber === 0) className = 'is-sunday'
      if (dayNumber === 6) className = 'is-saturday'

      return className
    },
    checkIsHoliday(date, isPrev = false, isNext = false) {
      let datetimeFormat = ''
      if (isPrev) datetimeFormat = this.$dayjs(this.datetime).subtract(1, 'month').format('YYYY-MM')
      if (isNext) datetimeFormat = this.$dayjs(this.datetime).add(1, 'month').format('YYYY-MM')
      if (!isNext && !isPrev) datetimeFormat = this.$dayjs(this.datetime).format('YYYY-MM')
      const dateStr = this.$dayjs(
        `${datetimeFormat}/${date}`,
        'YYYY-MM-D'
      ).format('YYYY-MM-DD')

      return this.holiday.includes(dateStr) ? 'is-holiday' : ''
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

.wrap-calendar-left{
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
}

// .is-saturday {
//   background: #edf9ff;
// }
// .is-holiday,
// .is-sunday {
//   background: #ffeded;
// }
// .wrap-calendar-left {
//   // padding-bottom: 20px;
//   margin-bottom: 26px;
//   .head-title-calendar {
//     padding: 0 10px;
//     margin-bottom: 5px;
//   }

//   &.form-input {
//     .head-title-calendar {
//       .month-year-title {
//         color: rgba(7, 163, 62, 1) !important;
//       }
//     }

//     .body-calendar {
//       .day-calendar {
//         .wrap-day {
//           &.now {
//             color: rgba(7, 163, 62, 1) !important;
//             font-weight: bold;
//           }
//           &:hover {
//             background-color: rgba(7, 163, 62, 1) !important;
//             color: #fff !important;
//             font-weight: normal !important;
//           }
//           &.day-active {
//             background-color: rgba(7, 163, 62, 1) !important;
//             color: #fff !important;
//             font-weight: normal !important;
//           }
//         }
//       }
//     }
//   }

//   .head-title-calendar {
//     .month-year-title {
//       font-size: 18px;
//       font-weight: 700;
//       color: rgba(0, 0, 0, 0.7);
//     }

//     .div-img-calendar {
//       width: 10px;
//     }
//   }

//   .head-calendar {
//     display: flex;
//     justify-content: space-between;

//     .column-cal {
//       width: calc(100% / 7);
//       text-align: center;
//       font-family: 'Noto Sans JP';
//       font-size: 13px;
//     }
//   }

//   .body-calendar {
//     display: flex;
//     flex-wrap: wrap;
//     cursor: pointer;
//     font-family: 'Noto Sans JP';

//     .day-calendar {
//       width: calc(100% / 7);
//       text-align: center;
//       display: flex;
//       justify-content: center;
//       padding-top: 15px;
//       padding-bottom: 3px;

//       .wrap-day {
//         width: 25px;
//         height: 25px;
//         border-radius: 50%;
//         transition: 0.3s;
//         &.now {
//           color: rgba(0, 0, 0, 0.7);
//           font-weight: bold;
//         }
//         &:hover {
//           background-color: rgba(0, 0, 0, 0.7);
//           font-weight: normal;
//           color: #fff;
//           cursor: pointer;
//         }
//         &.day-active {
//           background-color: rgba(0, 0, 0, 0.7);
//           font-weight: normal;
//           color: #fff;
//         }
//       }
//     }
//   }
// }
</style>
