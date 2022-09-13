<template>
    <div class="taskbar fcs">
        <!-- 任务栏左侧 -->
        <div class="tsleft">
          <Popup dir="bottom">
            <LeftPane></LeftPane>
            <template #reference>
              <div class="taskbarBtn" id="widget">
                  <img src="@/assets/img/icon/widget.png" alt="" id="startMenuImg" />
              </div>
            </template>
          </Popup>
            
      </div>
      <!-- 任务栏中间 -->
      <div class="center fcc">
          <!-- 中间部分的前两个按钮弹出样式与其后的按钮不一致 -->
          <Popup dir="bottom" v-for="item in tsPop" :key="item">
              <component :is="item.component" />
              <template #reference>
                <div id="taskMenu" class="taskbarBtn">
                    <img :src="getSrcIcon(item.icon)" :id="`${item.icon}Img`" />
                </div>
              </template>
          </Popup>
           <div
            v-for="item in tsData"
            :key="item"
            :id="item.name"
            class="taskbarBtn"
            >
          <img :src="getSrcIcon(item.icon)" :id="`${item.name}Img`" />
        </div>
      </div>
      <!-- 任务栏右侧 -->
       <div class="tsright fcc">
        <Popup dir="bottom">
          <RunningApps></RunningApps>
          <template #reference>
            <div class="up fcc">^</div>
          </template>
        </Popup>
        <Popup dir="bottom">
          <SideWifi></SideWifi>
          <template #reference>
            <div class="wf">
              <ul class="fcc">
                <li><img src="@/assets/img/icon/ui/wifi.png" alt="" /></li>
                <li><img src="@/assets/img/icon/ui/audio3.png" alt="" /></li>
              </ul>
            </div>
          </template>
        </Popup>

        <Popup dir="bottom">
          <Calendar></Calendar>
          <template #reference>
            <div class="data fcc">
              <div class="systemTime">
                <div>{{ time }}</div>
                <div>{{ date }}</div>
              </div>
            </div>
          </template>
        </Popup>
      </div>
    </div>
</template>

<script setup>
import {taskBarData, taskBarBottomPop} from '@/data'
import { reactive } from 'vue'
import { getSrcIcon } from '@/utils/getSrc.js'
import LeftPane from '../leftPane'
import SideWifi from '../sideWifi'
import RunningApps from '../runninngApps'
import Calendar from '../Calendar'

const tsData = reactive(taskBarData)
const tsPop = reactive(taskBarBottomPop)

const time = ref('00:00');
const date = ref('0000/00/00');

const fn = () => {
  const currentTime = new Date();
  time.value = currentTime.toLocaleTimeString().slice(0, 5); // 获取当前时间 上午11:29
  date.value = currentTime.toLocaleDateString(); // 获取当前日期，2021/12/1
};
fn();
setInterval(fn, 1000);

</script>

<style lang="scss" scoped>
   .taskbar {
      position: absolute;
      width: 100vw;
      height: 48px;
      background-color: $myBlue;
      backdrop-filter: saturate(3) blur(20px);
      bottom: 0;
      user-select: none;
      z-index: 100;
    }
  .tsleft {
    width: 212px;
  }
  .tsright > div {
    height: 40px;
    padding: 0 8px;
    &:hover {
      background: rgba(255, 255, 255, 0.8);
      transition: all 200ms ease-in-out;
    }
    .up {
      padding: 10px 0;
    }
  }
  .fcs {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fcc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hvlight:hover {
    background: rgba(255, 255, 255, 0.8);
    transition: all 200ms ease-in-out;
  }
  .taskbarBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    line-height: 40px;
    transition: all 0.5s;
    text-align: center;
    &:hover {
      background: #fff;
      border-radius: 0.3em;
    }
    img {
      height: 24px;
      vertical-align: middle;
    }
  }
  .tsright {
    ul {
      padding: 0;
      margin: 5px;
    }
    li {
      padding: 0 6px;
      list-style: none;
    }
    img {
      height: 16px;
      vertical-align: middle;
    }
    .systemTime {
      padding: 0 5px 0 0;
      font-size: 12px;
      text-align: center;
      div {
          height: 20px
      }
    }
  }
  .transition img {
    animation: small-and-big 1s;
  }
  @keyframes small-and-big {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
</style>