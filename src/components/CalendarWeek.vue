<template>
  <div :class="['wrap-fullcalendar-week']" :style="styles">
    <div class="head-title-calendar d-flex">
      <span class="month-year-title mr-auto ml-auto">
        {{ $dayjs(this.datetime).format('YYYY年MM月DD日 (ddd)') }}
      </span>
      <div class="div-img-calendar btn-prev" @click="preWeek">
      </div>
      <button class="btn__today" @click="today">今日</button>
      <div class="div-img-calendar btn-next" @click="nextWeek">
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

$color-yellow: #f4eec0;
$color-brown: #7e6752;
$color-black: #cccccc;
$color-gray: #eaeaea;
$color-sunday : #ffe1e1;
$color-saturday : #e6f7ff;
$color-active : #51e0db;
$color-day : #0072d2;
$background-head-day : #f5f7f8;
$height-day : 100px;
$background-now : #eef5f9;
$background-type-1 : #000000;
$background-type-2 : #ff0000;
$background-type-3 : #ffa500;
$background-type-4 : #0000ff;
$background-type-5 : #008000;
.wrap-fullcalendar-week {
  width: 100%;
  font-size: 0.8rem;
  .head-title-calendar , .head-calendar , .body-calendar{
    display: flex;
  }
  .head-title-calendar{
    padding: 5px;
    .month-year-title{
      font-size: 1rem;
      margin-left: 10px;
      margin-right: 25px;
      font-weight: bold;
      font-size: 1.5rem;
    }
    .btn__today{
      background: $color-yellow;
      border : 2px solid $color-brown;
      border-radius: 5px;
      padding-left: 15px;
      padding-right: 15px;
      margin-left: 10px;
      margin-right: 10px;

    }
    .btn-prev , .btn-next{
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 16px 32px 16px 0;
      border-color: transparent $color-brown transparent transparent;
      position: relative;
      margin-top: 2px;
      &::before {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 12px 24px 12px 0;
        border-color: transparent $color-yellow transparent transparent;
        content : '';
        position: absolute;
        top: -12px;
        right: -29px;
      }
    }
    .btn-next{
       transform: rotate(180deg);
    }
  }
  .head-calendar{
    .column-cal{
      width: calc(100% / 7);
      background: $color-yellow;
      border-right: 1px solid $color-black;
      font-weight: bold;
      font-size: 1rem;
      padding-top: 2px;
      padding-bottom: 2px;
      &:last-child{
        border-right: none;
      }
    }
  }
  .body-calendar{
    flex-wrap: wrap;
    .day-calendar{
      width: calc(100% / 7);
      &:hover{
        opacity: 0.7;
        cursor: pointer;
      }
    }
  }
  .wrap-head-and-body{
    border: 1px solid $color-black;
  }
  .day-calendar{
    .box {
      &__day {
        border: 1px solid $color-black;
        border-bottom: none;
        border-right: none;
        padding-top: 5px;
        padding-bottom: 5px;
        color : $color-day;
        background: $background-head-day;
      }
      &__info {
        border: 1px solid $color-black;
        height: $height-day;
        border-bottom: none;
        border-right: none;
        padding: 10px;
        &__item{
          display: flex;
          padding: 2px 5px;
          color : #fff;
          border-radius: 10px;
          font-size: 0.7rem;
          margin-bottom: 2px;

          &__time{
            margin-right: 5px;
          }
          &.back1{
            background: $background-type-1;
          }
          &.back2{
            background: $background-type-2;
          }
          &.back3{
            background: $background-type-3;
          }
          &.back4{
            background: $background-type-4;
          }
          &.back5{
            background: $background-type-5;
          }

        }
      }
    }
    &.is-saturday {
      background: $color-saturday;
      .box{
        &__day{
          background: $color-saturday;
        }
      }
    }
    &.is-sunday , &.is-holiday  {
      background: $color-sunday;
      .box{
        &__day{
           background: $color-sunday;
        }
      }
    }
    &.is-now {
      background: $background-now;
      .box{
        &__day{
          background: $background-now;
        }
      }
    }
    .day-active {
      background: $color-active;
    }
  }
}
</style>
