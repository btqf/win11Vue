<template>
  <div class="deskTopFullBox" @mousedown="dragModalFrame">
    <div class="modalFrame" ref="ModalFrameRef"></div>
    <div class="deskTopIcons" ref="IconsRef">
      <IconItem
        v-for="(item, index) in deskTopData"
        :key="index"
        :icon="item.icon"
        :name="item.name"
        :data="item"
        :ref="deskTopIconRefs"
        :desktopIconDOMs="desktopIconDOMs"
        :DeskTopIconData="DeskTopIconData"
      >
      </IconItem>
    </div>
  </div>
</template>


<script setup>
import { deskTopData } from '@/data';
import IconItem from './component/IconItem.vue'
import useDesktopConfigStore from '@/store/desktopConfigStore'
import { setWidthHeight, judgeContains } from '@/utils/viewSize/drag'
import { searchTargetFolderByPath } from '@/utils/handleFolder';
import DesktopIcon from '@/utils/OS/desktopIcon'
import { computed, onMounted } from 'vue';
// 获取store
const desktopConfigStore = useDesktopConfigStore();
// icon节点
let IconsRef;
// 模态拖动框
let ModalFrameRef;
onMounted(() => {
  // 获取节点
  IconsRef = document.querySelector('.deskTopIcons');
  ModalFrameRef = document.querySelector('.modalFrame');
})
// 存储DOM节点
const desktopIconDOMs = []
const desktopIconRefs = (e) => {
  desktopIconDOMs.push(e);
}
// 模态框拖动
const dragModalFrame = (e) => {
  const target = e.target;
  // 如果点击的为图标，直接退出
  if (target.getAttribute('class') !== 'deskTopIcons') return;
  // 记录 X, Y坐标
  const X = e.pageX;
  const Y = e.pageY;
  // 清除所有已选中的样式
  Array.from(IconsRef.children).map((value) => value.classList.remove('selected'));

  const move = (e) => {
    // 改变模态框的大小
    const tempX = e.pageX < X ? e.pageX : X;
    const tempY = e.pageY < Y ? e.pageY : Y;
    ModalFrameRef.style.left = tempX + 'px';
    ModalFrameRef.style.top = tempY + 'px';
    // 设置宽高
    setWidthHeight(e.pageX - X, e.pageY - Y, ModalFrameRef);
    // 当前被选中的元素
    const inContains = judgeContains(IconsRef, ModalFrameRef);
    // 存储状态
    desktopConfigStore.changeCurrentSelected(inContains);
  }
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', () => {
    setWidthHeight(0, 0, ModalFrameRef);
    document.removeEventListener('mousemove', move);
  })
};

  // 将 app 图标与 文件 图标结合在一起
  // 确定将指定桌面文件路径下的文件显示在桌面上
  // const desktopFolderData =  searchTargetFolderByPath(['C:', 'DeskTop'])

  // const DesktopIconData = computed(() => {
  //   return new DesktopIcon(deskTopData, desktopFolderData.children).appData;
  // })


</script>

<style lang="scss">
  .deskTopFullBox {
    width: 100%;
    height: 100%;
  }
  .deskTopIcons {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0.2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    user-select: none;
    .deskTopIcon {
      position: absolute;
      // z-index: 998;
      display: flex;
      width: 6em;
      height: 6em;
      margin: 0.5em;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: white;
      font-size: 0.8em;
      transition: 0.1s;
      border-radius: 0.2em;
      &:hover {
        background-color: rgba($color: #fffefe, $alpha: 0.2);
      }

      &:hover {
        background-color: rgba($color: #fffefe, $alpha: 0.1);
      }

      img {
        width: 2em;
        height: 2em;
      }
      span {
        text-align: center;
        width: 100%;
        font-size: 0.7em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .selected {
    // transition: 1s;
    border: 1px solid rgba(215, 212, 212, 0.6);
    background-color: rgba($color: #fffefe, $alpha: 0.2);
    img {
      transition: 0.2s;
      // transform: scale(0.7);
      animation: scale 0.3s;
    }
  }
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }
  .modalFrame {
    position: absolute;
    width: 0;
    height: 0;
    background-color: rgba($color: #fffefe, $alpha: 0.3);
    border-radius: 5px;
  }
</style>
