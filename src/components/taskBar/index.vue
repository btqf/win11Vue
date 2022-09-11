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
          <!-- <Popup dir="bottom" v-for="item in taskBarBottomPop" :key="item"> -->
              <Start></Start>
          <!-- </Popup> -->
      </div>
      <!-- 任务栏右侧 -->
    </div>
</template>

<script setup>
import {taskBarData, taskBarBottomPop} from '@/data'
import Start from '../start'
import { reactive } from 'vue'

const taskBarData = reactive(taskBarData)
const taskBarBottomPop = reactive(taskBarBottomPop)

</script>

<style lang="scss" scoped>
  .taskbar {
    --bg1:#2c3e50;
    position: absolute;
    width: 100vw;
    height: 48px;
    background: var(--bg1);
    backdrop-filter: saturate(3) blur(20px);
    bottom: 0;
    user-select: none;
    z-index: 100;
  }
  .fcs {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tsleft {
    width: 212px;
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
</style>