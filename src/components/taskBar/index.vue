<template>
    <div class="taskbar fcs">
        <!-- 任务栏左侧 -->
        <div class="tsleft">
            <div class="taskbarBtn" id="widget" @click.stop="">
                <img src="@/assets/img/icon/widget.png" alt="" id="startMenuImg" />
            </div>
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
        <div class="up fcc">^</div>
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

        <Popover dir="bottom">
          <!-- <Win11Calendar></Win11Calendar> -->
          <!-- <template #reference> -->
            <div class="data fcc">
              <div class="systemTime">
                <div>{{ time }}</div>
                <div>{{ date }}</div>
              </div>
            </div>
          <!-- </template> -->
        </Popover>
      </div>
    </div>
</template>

<script setup>
import {taskBarData, taskBarBottomPop} from '@/data'
import { reactive } from 'vue'
import { getSrcIcon } from '@/utils/getSrc.js'
import SideWifi from '../sideWifi'

const tsData = reactive(taskBarData)
const tsPop = reactive(taskBarBottomPop)

const time = ref('00:00');
const date = ref('0000/00/00');
</script>

<style lang="scss" scoped>
   .taskbar {
      --bg1: rgba(243, 243, 243, 0.85);
      position: absolute;
      width: 100vw;
      height: 48px;
      background: var(--bg1);
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