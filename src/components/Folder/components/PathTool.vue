<template>
  <div class="pathTool">
    <span class="historyBtn" @click="backToParent">🔙</span>
    <span class="historyBtn" @click="goToChildren">🔜</span>
    <span class="historyBtn" @click="goToDesc">🔝</span>
    <div class="path">
      <img src="@/assets/img/setting/user-sm.png" alt="" />
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
 * 1. path框动态变化，匹配相应文件内容并操作文件夹
 * 2. 前进后退按钮可用
 * 3. 搜索内容，传递信息至父组件
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

// 后退回上一级文件
const backToParent = () => {
  backParent();
};

// 前进下一级文件
const goToChildren = () => {
  goChildren();
};

// 回到顶级磁盘
const goToDesc = () => {
  const res = goDesc(path);
  store.changeCurrentFolder(...res);
};

// 路径栏点击切换
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

// 监视路径变化
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

// 前往目标文件
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