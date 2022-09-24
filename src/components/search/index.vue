<template>
  <div class="search-box">
    <div class="search-bar">
      <div class="search-icon"><img width="18" src="@/assets/img/icon/search.png" alt="" /></div>

      <input type="text" placeholder="Type here to search" value="" class="search-input" />
    </div>

    <div class="main-box">
      <div class="lasted">
        <h4>recently</h4>
        <div class="lasted-box">
          <div
            v-for="(item, index) in lastedData"
            :key="index"
            @click.stop="openApp(item.name)"
            class="lasted-item"
          >
            <img :src="getSrcStartIcon(`${item.url}.png`)" alt="" srcset="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="quick-search">
            <div class="right-title">
                <h4>quick-search</h4>
                <h4>···</h4>
            </div>
            <div class="quick-box">
                <div class="quickSearch-item" v-for="(item, index) in quickSearchData" :key="index">
                    <p>{{item.desc}}</p>
                </div>
            </div>
        </div>
        <div class="hot-apps">
            <div class="right-title">
                <h4>Hot Apps</h4>
            </div>
            <div class="hot-box">
                <div class="hotApps-item" v-for="(item, index) in recommendData" :key="index"> 
                    <img :src="getSrcStartIcon(`${item.url}.png`)" alt="" srcset="" />
                    <p>{{item.title}}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { lastedData, quickSearchData } from '@/data/SearchData.json';
  import { recommendData } from '@/data/StartData.json';
  import { getSrcStartIcon } from '@/utils/getSrc';
  import { showBox } from '@/utils';

  const openApp = (name) => {
    const target = document.querySelector(`.${name}`);
    showBox(target, name);
  }; 
</script>

<style lang="scss" scoped>
  .search-box {
    width: 600px;
    height: 600px;
    padding: 20px;
    border-radius: 10px;
    background-color: aliceblue;
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    .search-bar {
      height: 30px;
      border: solid 2px #1885e3;
      border-radius: 6px;
      background: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 10px;
      width: 90%;
      .search-input {
        width: 100%;
        background: $myWhite;
        border: none;
        outline: none;
        margin-left: 10px;
      }
    }
    .main-box {
      display: flex;
      width: 100%;
      height: calc(100% - 20px);
      .lasted {
        width: 200px;
        h4 {
            display: flex;
            // align-items: center;
            padding: 6px;
            margin: 20px 10px 5px 10px;
        }
        .lasted-box {
          padding: 2px 2px;
          .lasted-item {
            padding: 3px 8px;
            display: flex;
            align-items: center;
            margin: 5px 0;
            border-radius: 4px;
            img {
              width: 20px;
            }
            p {
              padding: 2px 8px;
              margin: 0;
            }
            &:hover {
              background-color: $myWhite;
            }
          }
        }
      }
    }
    .right-box {
      flex: 1;
      padding: 0 10px;
      .quick-search {
          padding: 2px;
          .quick-box {
              background: #e7f1fa;
              display: flex;
              flex-wrap: wrap;
              padding: 5px;
              border-radius: 10px;
              .quickSearch-item {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: #f6f9fc;
                  height: 52px;
                  width: 100px;
                  margin: 3px 5px;
                  padding: 0 5px;
                  border-radius: 20px;
              }
          }
      }
      .hot-box {
          display: flex;
          flex-wrap: wrap;
          .hotApps-item {
              background: #e7f1fa;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              height: 60px;
              width:60px;
              padding: 10px 20px;
              margin: 12px;
              border-radius: 20px;
              img {
                  width: 40px;
                  height: 40px;
              }
              p {
                  font-size: 14px;
                  margin: 0;
              }
          }
      }
    }
    .right-title {
        display: flex;
        justify-content: space-between;
    }
  }
</style>
