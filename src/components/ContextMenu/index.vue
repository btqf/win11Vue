<template>
  <div class="main-menu-wrapper" v-if="menuVisible" @click.stop ref="menuRef">
    <ul class="icon-options-list">
      <li class="icon-option-item">
        <img src="@/assets/img/setting/copy.png" alt="" draggable="false" />
      </li>
      <li class="icon-option-item">
        <img src="@/assets/img/setting/paste.png" alt="" draggable="false" />
      </li>
      <li class="icon-option-item">
        <img src="@/assets/img/setting/rename.png" alt="" draggable="false" />
      </li>

      <li class="icon-option-item">
        <img src="@/assets/img/setting/cut.png" alt="" draggable="false" />
      </li>
    </ul>
    <div class="text-options-wrapper">
      <ul class="text-options-list">
        <li class="text-option-item">打开</li>
        <li class="text-option-item">以管理员身份打开</li>
        <li class="text-option-item">固定到开始屏幕</li>
        <li class="text-option-item">压缩为ZIP文件</li>
        <li class="text-option-item">复制文件地址</li>
        <li class="text-option-item">属性</li>
      </ul>
      <hr />
      <ul class="text-options-list">
        <li class="text-option-item">OneDirve</li>
      </ul>
      <ul class="text-options-list">
        <li class="text-option-item">显示更多选项</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import useMenuStore from '@/store/menuStore'
  import { pagePos, getViewportSize } from '@/utils/ViewSize/desktop.js'
  import DragFeatrue from '@/utils/ViewSize/drag/DragFeatrue.js'

  const store = useMenuStore();
  const menuRef = ref(null);

  const menuVisible = computed(() => store.menuVisible);
  const setMenu = (e, type) => {
    if (!type) {
      return false;
    }
    store.setMenuVisible(true);
    nextTick(() => {
      DragFeatrue.prototype.move.call(
        {
          mouseX: pagePos(e).X,
          mouseY: pagePos(e).Y,
          elem: menuRef.value,
        },
        0,
        0,
        {
          edgeWeight: getViewportSize().width,
          edgeHeight: getViewportSize().height,
        }
      );
    });
  };
  defineExpose({
    setMenu,
  });
</script>

<style scoped lang="scss">
  .main-menu-wrapper {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 230px;
    height: 336px;
    user-select: none;
    background-color: rgb(247, 247, 247);
    padding: 3px 5px;
    border-radius: 5px;
    border: 3px solid #eee;
    .icon-options-list {
      display: flex;
      height: 40px;
      .icon-option-item {
        padding: 10px;
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
          background-color: $myBlue;
        }
      }
    }
    .text-options-wrapper {
      flex: 1;
      .text-options-list {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        .text-option-item {
          flex: 1;
          padding: 5px;
          &:hover {
            background-color: $myBlue;
          }
        }
      }
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
