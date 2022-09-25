<template>
    <div class="fileToolBar">
        <ul>
            <li @click="addNewFolder">
                <img src="@/assets/img/setting/new.png" alt="">
                <span class="desc">New</span>
            </li>
            <li v-for="item in toolData" :key="item">
                <span v-if="item.type === 'spacer'" class="spacer"></span>
                <template v-if="item.type === 'icon'">
                    <img :src="getSrcSetting(item.icon)" alt="">
                    <span class="desc">{{item.desc}}</span>
                </template>
            </li>
        </ul>
    </div>
</template>


<script setup>
import { toolData } from '@/data/FolderToolData.json'
import { getSrcSetting } from '@/utils/getSrc'
import { sortByPosIdx } from '@/utils/OS/desktopIcon'

import useFolderStore from '@/store/folderStore'

const store = useFolderStore();
const addNewFolder = async() => {
    const currentFolder = store.storeCurrentFolder;
    const obj = {
        name: '新建文件夹',
        memory: '0KB',
        children: []
    };
    sortByPosIdx(currentFolder);

    const index = currentFolder.addNewEmptyFolder(obj);
    const targetObject = currentFolder.children[index - 1];
    store.currentShowFolder.push(targetObject);
}
</script>

<style lang="scss" scoped>
.fileToolBar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #f1f4f9;
    color: #4e4f50;
    border-bottom: 1px solid #dddddd;
    ul {
      list-style: none;
      display: flex;
      height: 80%;
      margin: 0;
      padding: 0.2em 1.2em;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em;
        img {
          width: 1.2em;
          padding-right: 0.1em;
        }
        .desc {
          // margin-left: .5em;
          font-size: 0.9em;
        }

        .spacer {
          width: 1px;
          height: 100%;
          background-color: #aaaaaa;
        }

        &:hover {
          border-radius: 0.3em;
          background-color: $myWhite;
        }
      }
    }
  }
</style>
