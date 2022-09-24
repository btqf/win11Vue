<template>
    <div class="FolderFullBox FullBox">
        <ToolBar>File Explorer</ToolBar>
        <FolderTopTool></FolderTopTool>
        <PathTool></PathTool>
        <main>
            <nav class="scroll">
              <DropDown></DropDown>
            </nav>
            <div class="mainBody">
              <MainBody></MainBody>
            </div>
        </main>
    </div>
</template>

<script setup>
import ToolBar from '../ToolBar'
import FolderTopTool from './components/FolderTopTool.vue'
import PathTool from './components/PathTool.vue'
import DropDown from './components/DropDown'
import MainBody from './components/MainBody'
import Desc from '@/utils/OS/desc';
import { PCData } from '@/data/FolderData'
import useFolderStore from '@/store/folderStore'

const store = useFolderStore();
const data = (function() {
    const descs = [];
    PCData.forEach((desc) => {
        descs.push(new Desc(desc));
    })
    return descs;
})();
store.cacheCompletedFolder(data);
</script>

<style lang="scss" scoped>
  .FolderFullBox {
    background-color: #f0f4f9;

    min-width: 700px;
    min-height: 400px;

    main {
      display: flex;
      width: 100%;
      height: calc(100% - 127px);
      border-radius: 0 0 6px 6px;
      background-color: $myWhite;

      nav {
        width: 15em;
        height: 100%;
        overflow-y: hidden;
      }

      .mainBody {
        width: 100%;
        height: 100%;
        border-left: 0.05em solid $folderGray;
        overflow: hidden;
      }
    }
  }
</style>