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
      <ul  
       v-for="(item, index) in MenuData" 
       :key="index"
       class="text-options-list"
       >
        <li v-if="item.type === 'icon'" class="text-option-item">
            <img :src="getSrcContextMenu(`${item.url}.png`)" alt="" />
            <span>{{ item.desc }}</span>
        </li>
        <li v-if="item.type === 'hr'" class="text-option-hr">
            <hr/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import useMenuStore from '@/store/menuStore'
  import { pagePos, getViewportSize } from '@/utils/ViewSize/desktop.js'
  import DragFeatrue from '@/utils/ViewSize/drag/DragFeatrue.js'
  import { MenuData } from '@/data/MenuData.json'
  import { getSrcContextMenu } from '@/utils/getSrc'

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
    height: 360px;
    user-select: none;
    background-color: rgb(247, 247, 247);
    padding: 3px 5px;
    border-radius: 10px;
    border: 3px solid #eee;
    .icon-options-list {
      display: flex;
      height: 32px;
      padding: 2px 2px 0 0;
      .icon-option-item {
        padding: 5px;
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
        flex-direction: column;
        .text-option-item {
          display: flex;
          justify-content: flex-start;
          padding: 2px;
          img {
            padding: 5px 8px 5px 5px;
            width: 15px;
            height: 15px;
          }
          
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
    padding: 2px;
  }
  hr {
    margin: 0;
    border: 0;
    height: 1px;
    padding-left: 4px;
    background-color: $folderGray;
  }
</style>
