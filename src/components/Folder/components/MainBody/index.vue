<template>
     <div class="folderContent" ref="folderWrapRef">
         <ul>
            <FolderItem
            v-for="item in data"
            :key="item"
            :icon="item.children ? 'folder.png' : 'edge.png'"
            :size="item.size"
            :data="item"
            :usageRate="item.usageRate || undefined"
            :name="item.name"
            :extension="item.extension || undefined"
            :ref="folderItemRefs"
            :folderItemDoms="folderItemDoms"
            :fullyData="data"
            >
            </FolderItem>
            <div class="emptyData" v-if="data.length === 0">此文件夹为空！</div>
         </ul>
    </div>
</template>

<script setup>
import FolderItem from './FolderItem.vue'
import useFolderStore from '@/store/folderStore'
import { searchTargetFolderByPath } from '@/utils/handleFolder'
import { reactive } from 'vue';

const store = useFolderStore();
const foldersItemDoms = [];
const folderItemRefs = (e) => {
    foldersItemDoms.push(e)
};

let data = reactive([]);
// 默认显示desktop文件夹
store.changeCurrentFolder(searchTargetFolderByPath(['C:', 'DeskTop']));
data = store.currentShowFolder;

watch(
    () => store.currentShowFolder,
    () => {
        data.splice(0, data.length, ...store.currentShowFolder);
},
    { deep: true }
);
</script>

<style lang="scss" scoped>
.folderContent {
    width: 100%;
    height: 100%;
    ul {
      display: flex;
      justify-content: flex-start;
      align-content: flex-start;
      flex-flow: wrap;
      overflow-y: scroll;

      list-style: none;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 1em;
      .emptyData {
        //   position: absolute;
          display: flex;
          justify-content: center;
          width: 100%;
          font-size: 14px;
          color: #aaaaaa;
      }
    }
  }
</style>