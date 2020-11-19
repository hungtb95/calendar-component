<template>
  <div :class="['wrap-calendar-left']">
    <div class="head-title-calendar d-flex">
      <div class="div-img-calendar" @click="preMonth">
        <img src="../assets/images/prev-month.png" alt srcset />
      </div>
      <span class="month-year-title mr-auto ml-auto">{{ this.datetime }}</span>
      <div class="div-img-calendar" @click="nextMonth">
        <img src="../assets/images/next-month.png" alt srcset />
      </div>
    </div>
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
        v-for="i in datetimeInMonth.dayStartInMonth"
        :key="`empty${i}`"
        class="day-calendar"
      ></div>

      <div
        v-for="index in datetimeInMonth.daysInMonth"
        :key="`day${index}`"
        class="day-calendar"
        @click="selectDate(index)"
      >
        <div
          :class="[
            'wrap-day',
            { now: dateNow === index && isDateTimeNow },
            {
              'day-active':
                datetimeInMonth.dayActive === index && isDateTimeDayActive,
            },
          ]"
        >
          {{ index }}
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
    }
  },
  data() {
    return {
      datetime: this.$dayjs(),
      dateSelected: this.initValue && this.$dayjs(this.initValue).isValid() ? this.initValue : null
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
        dayStartInMonth: this.$dayjs(this.datetime).startOf('month').day(),
        daysInMonth: this.$dayjs(this.datetime).daysInMonth(),
        dayActive: this.$dayjs(this.dateSelected).date()
      }

      return datetimeInMonth
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
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-calendar-left {
  // padding-bottom: 20px;
  margin-bottom: 26px;
  .head-title-calendar {
    padding: 0 10px;
    margin-bottom: 5px;
  }

  &.form-input {
    .head-title-calendar {
      .month-year-title {
        color: rgba(7, 163, 62, 1) !important;
      }
    }

    .body-calendar {
      .day-calendar {
        .wrap-day {
          &.now {
            color: rgba(7, 163, 62, 1) !important;
            font-weight: bold;
          }
          &:hover {
            background-color: rgba(7, 163, 62, 1) !important;
            color: #fff !important;
            font-weight: normal !important;
          }
          &.day-active {
            background-color: rgba(7, 163, 62, 1) !important;
            color: #fff !important;
            font-weight: normal !important;
          }
        }
      }
    }
  }

  .head-title-calendar {
    .month-year-title {
      font-size: 18px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.7);
    }

    .div-img-calendar {
      width: 10px;
    }
  }

  .head-calendar {
    display: flex;
    justify-content: space-between;

    .column-cal {
      width: calc(100% / 7);
      text-align: center;
      font-family: 'Noto Sans JP';
      font-size: 13px;
    }
  }

  .body-calendar {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    font-family: 'Noto Sans JP';

    .day-calendar {
      width: calc(100% / 7);
      text-align: center;
      display: flex;
      justify-content: center;
      padding-top: 15px;
      padding-bottom: 3px;

      .wrap-day {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        transition: 0.3s;
        &.now {
          color: rgba(0, 0, 0, 0.7);
          font-weight: bold;
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
          font-weight: normal;
          color: #fff;
          cursor: pointer;
        }
        &.day-active {
          background-color: rgba(0, 0, 0, 0.7);
          font-weight: normal;
          color: #fff;
        }
      }
    }
  }
}
</style>
