<template>
  <div class="pathTool">
    <span class="historyBtn" @click="backToParent">ð</span>
    <span class="historyBtn" @click="goToChildren">ð</span>
    <span class="historyBtn" @click="goToDesc">ð</span>
    <div class="path">
      <img src="@/assets/img/setting/thispc-sm.png" alt="" />
      <input type="text" id="input" v-model.lazy.trim="inputPath" />
      <div class="path-content">
        <span v-for="item in path" :key="item">
          <i @click="goTarget(path, item)">{{ item }}</i>
          <div class="showOtherBrother">&gt;</div>
        </span>
      </div>
      <label for="input" class="clickLocation"></label>
    </div>
    <div class="search">
      <img src="@/assets/img/setting/search.png" alt="" />
      <input type="text" placeholder="search" @keydown.enter="searchStr($event)" />
    </div>
  </div>
</template>
<script setup>
/**
 * 1. pathæ¡å¨æååï¼å¹éç¸åºæä»¶åå®¹å¹¶æä½æä»¶å¤¹
 * 2. åè¿åéæé®å¯ç¨
 * 3. æç´¢åå®¹ï¼ä¼ éä¿¡æ¯è³ç¶ç»ä»¶
 */
import {
  searchTargetFolderByPath,
  searchTargetFolderByStr,
  goChildren,
  backParent,
  goDesc,
} from '@/utils/handleFolder.js';
import useFolderStore from '@/store/folderStore';
import { computed } from 'vue';

const store = useFolderStore();

let path = reactive([]);

// åéåä¸ä¸çº§æä»¶
const backToParent = () => {
  backParent();
};

// åè¿ä¸ä¸çº§æä»¶
const goToChildren = () => {
  goChildren();
};

// åå°é¡¶çº§ç£ç
const goToDesc = () => {
  const res = goDesc(path);
  store.changeCurrentFolder(...res);
};

// è·¯å¾æ ç¹å»åæ¢
const goTarget = (path, item) => {
  const tempArray = JSON.parse(JSON.stringify(path));
  tempArray.map((value, i) => {
    if (value === item) {
      const length = tempArray.length - 1;
      tempArray.splice(i+1, length);
    }
  });
  const res = searchTargetFolderByPath(tempArray);
  if (res) {
    store.changeCurrentFolder(res);
  }
};

const searchStr = (e) => {
  const input = e.target.value;
  const res = searchTargetFolderByStr(input);
  if (res.length) {
     store.setCurrentSearchStr(input.split(''));
  };
  store.changeCurrentShowFolder(res);
}

// çè§è·¯å¾åå
watch(
  () => store.storeCurrentFolder,
  () => {
    path.splice(0, path.length, ...store.storeCurrentFolder.getPath());
  },
  { deep: true }
);

const inputPath = computed({
  get() {
    return path.join('/');
  },
  set(newValue) {
    path.splice(0, path.length, ...newValue.split('/'))
    goTargetPath();
  }
})

// åå¾ç®æ æä»¶
const goTargetPath = () => {
  const result = searchTargetFolderByPath(path);
  if (result) {
    store.changeCurrentFolder(result);
  }
};

</script>

<style lang="scss" scoped>
.pathTool {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 0.5em 0em;
    background-color: $myWhite;
    .historyBtn {
      font-size: 1.2em;
      margin: 0 0.2em 0 0.4em;
    }

    .path {
      display: flex;
      align-items: center;
      padding: 0 0 0 0.5em;
      width: 70%;
      height: 100%;
      border: 1px solid $folderGray;

      img {
        width: 1.2em;
        height: 1.2em;
      }
      #input {
        width: 0;
        outline: none;
        border: 0;
        font-size: 0.6em;
      }
      #input:focus {
        width: 100%;
        // height: 100%;
      }
      #input:focus + .path-content {
        display: none;
      }
      &-content {
        display: flex;
        align-items: center;
        margin: 0 0.5em 0 0;
        height: 100%;
        font-size: 0.6em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          margin-left: 0.5em;
          height: 100%;
          flex-wrap: nowrap;
          overflow: hidden;
          display: flex;
          align-items: center;
          i {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 4px;
            &:hover {
              background-color: rgba($color: #000000, $alpha: 0.1);
            }
          }

          .showOtherBrother {
            position: relative;
            margin-left: 2px;
            font-style: normal;

            &:hover {
              transform: rotate(90deg);
            }
          }
        }
      }
    }
    .search {
      display: flex;
      align-items: center;
      margin-left: 10px;
      padding: 0 0.6em;
      flex: 1;
      height: 100%;
      border: 1px solid #dddddd;

      img {
        width: 0.8em;
        height: 0.8em;
      }
      input {
        outline: none;
        width: 90%;
        border: 0;
        font-size: 0.8em;
        padding-left: 0.8em;
      }
    }
  }

  .clickLocation {
    flex-grow: 1;
    min-width: 1em;
    height: 100%;
  }
</style>