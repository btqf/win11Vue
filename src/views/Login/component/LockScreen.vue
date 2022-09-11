<template>
    <div class='bg'>
        <div class="date-info">
            <div class="date-info__left">
                {{time}}
            </div>
            <div class="date-info__right">
                <div>{{date}}</div>
                <div>{{day}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'

const calendarTableHeader = ['一', '二', '三', '四', '五', '六', '日']
export default {
    data() {
        return {
            time: '',
            date: '',
            day: '',
            timeInterval: null
        }
    },
    created() {
        setInterval(() => {
            this.updateTime()
        }, 1000)
    },
    methods: {
        updateTime() {
            const now = dayjs()
            const nowYear = now.year()
            const nowMonth = now.month() + 1
            const nowDay = now.day() + 1
            const nowDate = now.date()
            const nowHour = now.hour()
            const min = now.minute() 
            const nowMin = min<10 ? `0${min}`: min
            this.date = `${nowYear}/${nowMonth}/${nowDate}`
            this.day = `星期${calendarTableHeader[nowDay]}`
            this.time  = `${nowHour}:${nowMin}`
        }
    },
    setup () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-color: black;
  background-image: url(@/assets/img/login/lock.jpg);
}
.date-info {
  position: fixed;
  left: 50%;
  top: 400px;
  color: rgb(255, 255, 255);
  margin-left: -113px;
  & > * {
    display: inline-block;
    vertical-align: middle;
  }
  .date-info__left {
    font-size: 64px;
    margin-right: 5px;
  }
  .date-info__right {
    font-size: 20px;
    line-height: 1.5em;
  }
}
</style>