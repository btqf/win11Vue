<template>
    <div class="settingFullBox FullBox"> 
        <ToolBar>Settings</ToolBar>
        <main>
            <!-- 侧边栏 -->
           <div class="nav">
                <div class="accountMessage">
                    <img @click="toggle('Accounts')" src="@/assets/img/login/avatar.jpg" alt="" />
                    <div class="detailMessage">
                        <span>{{ store.getUsername }}</span>
                        <span>Local Account</span>
                    </div>
                </div>
                <div class="searchInput">
                    <input type="text" />
                </div> 
                <div class="navList">
                    <ul>
                        <li v-for="item in navNameList" :key="item" @click="toggle(item)">
                            <img :src="getSrcSetting(`${item}.webp`)" alt="" />
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 主体 -->
            <div class="mainBody">
                <h1 class="title">{{ title }}</h1>
                <MainBodyList :data="translateData"></MainBodyList>
            </div>
        </main>
    </div>
</template>

<script setup>
  import ToolBar from '../ToolBar'
  import MainBodyList from './MainBodyList.jsx'
  import data from '@/data/SettingData.json'
  import { getSrcSetting } from '@/utils/getSrc'
  import useUserStore from '@/store/userStore'
  import { onBeforeMount, reactive } from 'vue'

  const navNameList = [];
  Object.keys(data).forEach((item) => {
      navNameList.push(item)
  })

  const store = useUserStore();

  const title = ref('system');

  // 传递给子组件的数据，显示具体item项
  const translateData = reactive([]);

  const changeData = (item) => {
    translateData.splice(0, translateData.length);
    translateData.push(...data[item]);
  }

  onBeforeMount(() => {
    changeData('System');
  })

  // 切换界面
  const toggle = (item) => {
    title.value = item;
    changeData(item);
  }
</script>

<style lang="scss" scoped>
   .settingFullBox {
    background-color: $myBlue;

    main {
      display: flex;
      // 因为toolBar占据30px，main继承父元素的高度不会考虑toolBar
      // 所以才会超出，在此记录
      height: calc(100% - 30px);
      width: 100%;
      flex-direction: row;
      .nav {
        display: flex;
        flex-direction: column;
        width: 17em;
        height: 100%;
        .accountMessage {
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;
          width: 95%;
          height: 5em;
          padding: 10px;
          margin: 10px;
          border-radius: 5px;
          transition: 0.1s;
          img {
            width: 4em;
            border-radius: 2em;
          }
          &:hover {
            background-color: #e9ecf1;
          }

          // 账户详细样式，头像，名字
          .detailMessage {
            margin-left: 10px;
            span:nth-child(1) {
              display: block;
              font-size: 0.8em;
              font-weight: 700;
            }
            span:nth-child(2) {
              font-size: 0.6em;
              font-weight: 500;
            }
          }
        }
        .searchInput {
          width: 16em;
          height: 2em;
          margin: 10px;
          input {
            width: 100%;
            height: 100%;
            border-left: 0;
            border-top: 0;
            border-right: 0;
            border-bottom: 0.2px solid #2a6bc3;
            border-radius: 3px;
            &:focus {
              outline: none;
              border-bottom: 2px solid #2a6bc3;
            }
          }
        }
        .navList {
          height: 100%;
          overflow-y: scroll;
          ul {
            padding: 10px;
            padding-top: 0;
            list-style: none;
            li {
              display: flex;
              flex-direction: row;
              justify-content: start;
              align-items: center;
              height: 2em;
              border-radius: 5px;
              font-size: 0.9em;
              img {
                width: 1em;
                margin-left: 1em;
                margin-right: 1em;
              }

              &:hover {
                background-color: #e4e8ec;
              }
            }
          }
        }
        .navList::-webkit-scrollbar {
          width: 3px;
        }
        .navList::-webkit-scrollbar-thumb {
          height: 2em;
          border-radius: 5px;
          background-color: #777a7c;
        }
      }
      .mainBody {
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 100%;
        height: 100%;
        margin-left: 2em;

        .title {
          font-size: 2em;
          font-weight: 400;
          padding: 0.5em 0 0.5em 0;
          margin: 0;
        }
      }
    }
   }
</style>