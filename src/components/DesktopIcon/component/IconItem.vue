<template>
    <div
    ref="deskTopIconRef"
    class="deskTopIcon"
    @contextmenu.stop="showMainMenu($event)"
    @dblclick="dblClickApp($event, data)"
    @click="clickApp"
    :style="`
        top: ${getPos(data.posIdx).top};
        left: ${getPos(data.posIdx).left};
      `"
    @mousedown="dragIconOrOpenMenu($event, deskTopIconRef, DeskTopIconData, data)"
    :class="getClasses()"
  >
    <img :src="getSrcIcon(icon)" draggable="false" />
    <span>{{ name }}</span>
  </div>
</template>

<script setup>
  import { getSrcIcon } from '@/utils/getSrc';
  import drag from '@/utils/ViewSize/drag'
  import { getViewportSize } from '@/utils/ViewSize/desktop';
  import { showBox } from '@/utils'
  import useDeskTopConfigStore from '@/store/desktopConfigStore';
  import useFolderStore from '@/store/folderStore';

  const configStore = useDeskTopConfigStore();
  const { iconBaseWeight, iconBaseHeight, maxIconCountY } = configStore;
  const deskTopIconRef = ref(null);

  const props = defineProps({
    icon: {
      type: String,
      default: 'explorer.png',
    },
    name: {
      type: String,
      default: '新建文件夹',
    },
    data: {
      type: Object,
      default: () => {},
    },
    deskTopIconDoms: {
      type: Array,
      default: () => [],
    },
    DeskTopIconData: {
      type: Array,
      default: () => [],
    },
  });

  const dblClickApp = (e, item) => {
    const target = document.querySelector(`.${item.componentName}`);
    if (item.componentName === 'FolderFullBox') {
      const store = useFolderStore();
      store.changeCurrentFolder(item);
    }
    showBox(target, item.componentName);
  };

  const getPos = (posIdx) => {
    return {
      top:
        (
          (Math.floor(posIdx % maxIconCountY ? posIdx % maxIconCountY : maxIconCountY) - 1) *
          iconBaseWeight
        ).toFixed(1) + 'px',
      left:
        (
          Math.floor(posIdx % maxIconCountY ? posIdx / maxIconCountY : posIdx / maxIconCountY - 1) *
          iconBaseHeight
        ).toFixed(1) + 'px',
    };
  };

  const clickApp = () => {
    configStore.changeCurrentSelected(props.data);
  };

  // 判断鼠标点击哪个键位
  const dragIconOrOpenMenu = (e, dom, list, item) => {
    if (e.button === 0) {
      // 左键
      drag.call(dom, e, list, item, {
        edgeWeight: getViewportSize().width,
        edgeHeight: getViewportSize().height,
      });
    } else if (e.button === 2) {
      // 右键
      console.log('菜单');
    }
  };

const getClasses = () => {
  const classes = [];
  if (configStore.currentSelected.some((item) => item.posIdx === props.data.posIdx)) {
    classes.push('selected');
  }
  return classes;
}

const showMainMenu = (e) => {
  e.preventDefault();
};
</script>

<style lang="scss" scoped>
  .active {
    background-color: rgba($color: #fffefe, $alpha: 0.2);
  }
</style>