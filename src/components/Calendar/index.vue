<template>
  <div class="calendar-wrapper">
    <div class="calendar-header-wrapper">
      <div class="now">
        <div class="nowdata">
          <div class="calendar-date" @click="step = 0">
            {{ nowMonth }}月{{ nowDate }}日，星期{{ calendarTableHeader[nowDay - 1] }}
          </div>
          <div class="lunar-date">{{ nowLunar }}</div>
        </div>
        <div class="nowclock">{{ nowHour }}:{{ nowMinute }}</div>
      </div>
      <div class="options">
        <div class="op-left">
          <span class="active-date">{{ activeDayjs.year() }}年{{ activeDayjs.month() + 1 }}月</span>
        </div>
        <div class="op-right">
          <button class="prev" @click="selectMonth('prev')">^</button>
          <button class="next" @click="selectMonth('next')">^</button>
        </div>
      </div>
    </div>
    <div class="calendar-table-wrapper">
      <CalendarTable :step="step" @pick="pickDay"></CalendarTable>
    </div>
  </div>
</template>

<script setup>
  import { getLunar } from 'chinese-lunar-calendar';
  import dayjs from 'dayjs';
  import CalendarTable from './components/CalendarTable.vue';
  import { fillZero } from './utils';

  const now = reactive({
    dayjs: dayjs(),
  });

  setInterval(() => {
    now.dayjs = dayjs();
  }, 1000);
  const nowYear = computed(() => now.dayjs.year());
  const nowMonth = computed(() => now.dayjs.month() + 1);
  const nowDate = computed(() => now.dayjs.date());
  const nowDay = computed(() => now.dayjs.day());
  const nowLunar = computed(() => getLunar(nowYear.value, nowMonth.value, nowDate.value).dateStr);

  const nowHour = computed(() => fillZero(now.dayjs.hour()));
  const nowMinute = computed(() => fillZero(now.dayjs.minute()));
  const calendarTableHeader = ['一', '二', '三', '四', '五', '六', '日'];

  const step = ref(0);
  const selectMonth = (type) => {
    if (type === 'prev') {
      step.value--;
    } else if (type === 'next') {
      step.value++;
    }
  };

  const activeDayjs = computed(() => now.dayjs.add(step.value, 'month'));

  const realSelectedDay = ref('');
  const pickDay = (day) => {
    realSelectedDay.value = day;
    emits('update:modelValue', day);
  };

  defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });

  const emits = defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
  .calendar-wrapper {
    padding: 10px 7px 7px 10px;
    overflow: hidden;
    background-color: $myBlue;
    position: absolute;
    bottom: 58px;
    right: 20px
  }
  .next {
    transform: rotateX(180deg);
  }
  .now {
    display: flex;
    justify-content: space-between;
    line-height: 26px;
    border-bottom: 1px solid #c2bebe;
    padding-bottom: 5px;
    .nowdata {
      display: flex;
      flex-wrap: wrap;
      width: 130px;
      .lunar-date {
        padding: 0
      }
    }
  }
  .options {
    display: flex;
    justify-content: space-between;
    margin: 5px 5px;
    .op-right {
      padding: 0;
      display: flex;
      .prev {
        margin-right: 22px;
        padding: 2px 10px 0 10px;
      }
      .next {
        padding: 2px 10px 0 10px;
      }
    }
  }
</style>