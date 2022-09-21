<template>
  <div class="topButton" ref="ParentRef">
    <div class="title" :style="{ color: color }" @mousedown="moveBox">
      <slot></slot>
    </div>
    <div class="functionArea">
      <button @click="min"><img src="@/assets/img/setting/minimize.png" /></button>
      <button @click="max" @mouseenter="showSplit">
        <img :src="getSrcSetting(`${MaxOrMin}.png`)" />
      </button>
      <button @click="close"><img src="@/assets/img/setting/close.png" /></button>
    </div>
    <div class="right" @mousedown="dragChangeSize('WIDTH')"></div>
    <div class="bottom" @mousedown="dragChangeSize('HEIGHT')"></div>
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
  import { toolSize } from '@/data';
  import { hideBox, searchMaxZindex } from '@/utils';
  import { getSrcSetting } from '../../utils/getSrc';
  defineProps({
    color: {
      type: String,
      default: 'black',
    },
  });

  // 最大化或者最小化图标
  const MaxOrMin = ref('maxmin');

  const that = getCurrentInstance();

  let { viewSizeWidth, viewSizeHeight, top, left } = toolSize;

  // 获取该工具栏的父元素
  let parent;

  // 拆分功能区
  const splitFlag = ref(false);

  // 由于setup执行时机是早于beforeCreate的，所以此时还不能拿到模板
  // 所以在挂载之后获取
  onMounted(() => {
    parent = that.refs.ParentRef.parentElement;
    parent.style.width = `${toolSize.viewSizeWidth}px`;
    parent.style.height = `${toolSize.viewSizeHeight}px`;
    parent.style.left = `${toolSize.left}px`;
    parent.style.top = `${toolSize.top}px`;
  });

  // 最小化
  const mini = () => {
    hideBox(true, parent, parent.classList[0]);
  };

  // 关闭
  const close = () => {
    hideBox(false, parent, parent.classList[0]);
  };

  // 更改图标
  const changeIcon = () => {
    const allTcon = ['maximize', 'maxmin'];
    if (parent.style.width === '100%' && parent.style.height === '100%') {
      MaxOrMin.value = allTcon[0];
    } else {
      MaxOrMin.value = allTcon[1];
    }
  };

  // 切换最大化最小化
  const max = () => {
    if (parent.style.width === '' || parent.style.width === '100%') {
      // 默认最小化为用户自定义的宽度大小，位置
      parent.style.width = `${viewSizeWidth}px`;
      parent.style.height = `${viewSizeHeight}px`;
      parent.style.left = `${left}px`;
      parent.style.top = `${top}px`;
    } else {
      parent.style.height = '100%';
      parent.style.width = '100%';
      parent.style.left = '0';
      parent.style.top = '0';
    }
    changeIcon();
  };

  // 拖动元素
  const moveBox = (e) => {
    // 无论是否拖动，点击即会改变层级
    // 获取层级最大的元素，并并加一
    parent.style.zIndex = searchMaxZindex();

    // 初始鼠标按下时候的，在toolbar的位置
    const X = e.pageX - parent.offsetLeft;
    const Y = e.pageY - parent.offsetTop;

    parent.classList.add('notransition');

    // 移动监听事件
    const move = (e) => {
      parent.style.top = e.pageY - Y + 'px';
      parent.style.left = e.pageX - X + 'px';

      // 更新位置的数据
      left = e.pageX - X;
      top = e.pageY - Y;
    };
    // 添加监听和移除监听
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
      parent.classList.remove('notransition');
      document.removeEventListener('mousemove', move);
    });
  };

  // 框的左右上下缩放
  const dragChangeSize = (flag) => {
    parent.classList.add('notransition');
    const move = (e) => {
      if (flag === 'HEIGHT') {
        parent.style.height = e.pageY - parent.offsetTop + 'px';
        // 更新改变视窗的大小，并更新viewData的数据
        viewSizeHeight = e.pageY - parent.offsetTop;
      } else {
        parent.style.width = e.pageX - parent.offsetLeft + 'px';
        // 更新改变视窗的大小，并更新viewData的数据
        viewSizeWidth = e.pageX - parent.offsetLeft;
      }
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
      parent.classList.remove('notransition');
      document.removeEventListener('mousemove', move);
    });
  };

  // 显示split窗口
  const showSplit = async (e) => {
    const target = e.target;

    const flag = await new Promise((reslove) => {
      const timer = setTimeout(() => {
        reslove(true);
      }, 800);
      target.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        reslove(false);
      });
    });
    if (flag) {
      splitFlag.value = true;
    }
  };

  // 监听分割窗的移除事件，立即关闭该窗口
  const closeSplit = () => {
    splitFlag.value = false;
  };

  // 拆分视窗
  const splitFunction = (flag) => {
    switch (flag) {
      case 'left': {
        parent.style.width = '50vw';
        parent.style.height = '100vh';
        parent.style.left = 0;
        parent.style.top = 0;
        break;
      }
      case 'right': {
        parent.style.width = '50vw';
        parent.style.height = '100vh';
        parent.style.left = `${document.body.clientWidth / 2}px`;
        parent.style.top = 0;
        break;
      }
      case 'top': {
        parent.style.width = '100vw';
        parent.style.height = '50vh';
        parent.style.left = 0;
        parent.style.top = 0;
        break;
      }
      case 'bottom': {
        parent.style.width = '100vw';
        parent.style.height = '50vh';
        parent.style.left = 0;
        parent.style.top = `${window.screen.height / 2}px`;
        break;
      }
    }
    changeIcon();
  };
</script>

<style lang="scss" scoped>
  .topButton {
    display: flex;
    height: 30px;
    justify-content: space-between;
    user-select: none;
    .title {
      width: calc(100% - 150px);
      display: flex;
      justify-content: flex-start;
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
        padding: 9.60px;
        background-color: transparent;
        img {
          width: 40%;
        }
        &:hover {
          background-color: #d6d6d7;
        }
        &:nth-last-child(1):hover {
          background-color: red;
        }

      }
    }
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