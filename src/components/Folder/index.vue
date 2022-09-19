<template>
    <div class="FolderFullBox FullBox">
        <ToolBar>File Explorer</ToolBar>
        <FolderTopTool></FolderTopTool>
        <main>
            <nav class="scroll">

            </nav>
            <div class="mainBody">

            </div>
        </main>
    </div>
</template>

<script setup>
import ToolBar from '../ToolBar'
import FolderTopTool from './components/FolderTopTool.vue'
import Desc from '@/utils/OS/desc';
import { PCData } from '@/data/folderData'
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
console.log('computed', store.storeCompletedFolder)
</script>

<style lang="scss" scoped>
  .FolderFullBox {
    background-color: #f0f4f9;

    min-width: 700px;
    min-height: 400px;

    main {
      display: flex;
      width: 100%;
      height: calc(100% - 130px);
      border-radius: 0 0 6px 6px;
      background-color: #ffffff;

      nav {
        width: 15em;
        height: 100%;
        overflow-y: scroll;
      }

      .mainBody {
        width: 100%;
        height: 100%;
        border-left: 0.1em solid #dddddd;
      }
    }
  }
</style>