<template>
    <div class="topButton">
        <div class="title">
            <slot></slot>
        </div>
        <div class="functionArea">
            <button @click="mini">
                <img src="@/assets/img/setting/minimize.png" />
            </button>
            <button @click="max" @mouseenter="showSplit">
                <img :src="getSrcSetting(`${MaxOrMin}.png`)" />
            </button>
            <button @click="close">
                <img src="@/assets/img/setting/close.png" />
            </button>
        </div>
        <div class="right"></div>
        <div class="bottom"></div>
        <div class="splitTool" v-if="splitFlag" @mouseleave="closeSplit">
            <div class="splitLeft">
                <span class="splitLeft-left" @click="splitFunction('left')"></span>
                <span class="splitLeft-right" @click="splitFunction('right')"></span>
            </div>
            <div class="splitRight">
                <span class="splitRight-top" @click="splitFunction('top')"></span>
                <span class="splitRight-bottom" @click="splitFunction('bottom')"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getSrcSetting } from '@/utils/getSrc'

// 拆分功能区
const splitFlag = ref(false);
const MaxOrMin = ref('maxmin');
const mini = function() {}
const max = function() {}
const close = () => {}
const showSplit = () => {}
const closeSplit = () => {}
const splitFunction = (str) => {}
</script>

<style lang="scss" scoped>
  .topButton {
    display: flex;
    height: 30px;
    justify-content: space-between;
    user-select: none;
    .title {
      width: calc(100% - 150px);
      padding-left: 10px;
      line-height: 30px;
      font-size: 12px;
    }
    .functionArea {
      flex: 1;
      button {
        width: 33.33%;
        height: 100%;
        border: 0;
        background-color: transparent;
        &:hover {
          background-color: #d6d6d7;
        }
        &:nth-last-child(1):hover {
          background-color: red;
        }
      }
    }
  }

  img {
    width: 40%;
  }

  .right {
    position: absolute;
    right: 0;
    width: 3px;
    height: 100%;
    cursor: e-resize;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3px;
    cursor: s-resize;
  }
  .splitTool {
    position: absolute;
    right: 2em;
    top: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 99;

    width: 10em;
    height: 5em;
    background-color: #2e2e2e;
    border-radius: 0.7em;

    .splitLeft,
    .splitRight {
      width: 40%;
      height: 80%;
    }
    .splitLeft {
      display: flex;
      justify-content: space-between;
      &-left,
      &-right {
        width: 45%;
        background-color: #505050;
      }
      &-left {
        border-radius: 4px 0 0 4px;
        &:hover {
          background-color: #b0c6cb;
        }
      }
      &-right {
        border-radius: 0 4px 4px 0;
        &:hover {
          background-color: #b0c6cb;
        }
      }
    }

    .splitRight {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-top,
      &-bottom {
        width: 100%;
        height: 45%;
        background-color: #505050;
      }

      &-top {
        border-radius: 4px 4px 0 0;
        &:hover {
          background-color: #b0c6cb;
        }
      }
      &-bottom {
        border-radius: 0 0 4px 4px;
        &:hover {
          background-color: #b0c6cb;
        }
      }
    }
  }
</style>