<template>
  <div class="left-pane">
    <div class="pane-top">
      <!-- //搜索框 -->
      <div class="search-bar">
        <div class="search-icon">
          <img width="18" src="@/assets/img/icon/search.png" alt="" />
        </div>
        <input type="text" placeholder="搜索新闻" value="" class="search-input" />
      </div>
    </div>
    <div class="left-pane-content">
      <PaneItem
        v-for="(item, index) in leftPaneData"
        :key="index"
        :img-info="item"
        class="erery-item"
      ></PaneItem>
    </div>
  </div>
</template>

<script setup>
import PaneItem from './component/PaneItem.vue';
import { leftPaneData } from '@/data/leftPaneData.json';

</script>

<style lang="scss" scoped>
  .left-pane {
      position: absolute;
      bottom: 60px;
      width: 760px;
      height: 670px;
      background: $myBlue;
      margin-left: 5px;
      border-radius: 13px;
      backdrop-filter: blur(55px);
      transition: all 0.5s cubic-bezier(0.77, 0, 0.18, 1);
      overflow: hidden;
      .pane-top {
          width: 688px;
          margin: 20px 6px 10px 20px;
          .search-bar {
              height: 40px;
              border-radius: 6px;
              background: #ffffff;
              display: flex;
              align-content: center;
              padding: 0 10px;
              width: 100%;
              .search-icon {
                  margin-top: 10px;
              }
              .search-input {
                  width: 100%;
                  background: #fffcfc;
                  border: none;
                  outline: none;
                  margin-left: 10px;
               }
          }
      }
        .left-pane-content {
            display: flex;
            flex-flow: row;
            flex-wrap: wrap;
            padding: 10px 15px;
            justify-content: space-between;
            overflow-x: hidden;
            overflow-y: scroll;
            width: 725px;
            height: 648px;
            margin-left: 5px;
        }
  }
</style>
