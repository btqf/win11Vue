<template>
    <lazy-component class="EdgeFullBox FullBox">
        <ToolBar>Edge</ToolBar>
        <!-- <EdgeToolBar></EdgeToolBar> -->
        <main>
            <div class="edgeToolBar">
                <!-- 工具栏 -->
                <div class="addressBar">
                    <!-- 按钮栏 -->
                    <div class="edgenavicon" @click="goBackURL">
                        <img src="@/assets/img/icon/ui/left.png" alt="" />
                    </div>
                    <div class="edgenavicon" @click="goForwardURL">
                        <img src="@/assets/img/icon/ui/right.png" alt="" />
                    </div>
                    <div class="edgenavicon">
                        <img src="@/assets/img/icon/ui/refresh.png" alt="" />
                    </div>
                    <div class="edgenavicon" @click="goHomeURL">
                        <img src="@/assets/img/icon/ui/home.png" alt="" />
                    </div>
                    <!-- 地址栏 -->
                    <div class="addCont">
                        <input
                        type="text"
                        :value="frameURL"
                        @keyup.enter="submitInput"
                        id="urlin"
                        />
                        <div class="enter" @click="clickEnterBtn">
                            <img src="@/assets/img/icon/ui/enter.png" alt="" />
                        </div>
                    </div>
                    <!-- 用户栏 -->
                    <div class="addUser">
                        <img src="@/assets/img/icon/ui/google.png" alt="">
                    </div>
                </div>
                <!-- 收藏栏 -->
                <div class="bookBar">
                    <div 
                    class="bookhandle"
                    v-for="(item, index) in WebSitesData"
                    :key="index"
                    @click="clickWebsite(item.url)"
                    :id="'book' + index"
                    >
                        <!-- {{item.desc}} -->
                        <div class="bookIcon">
                            <img :src="getSrcIcon(`${item.icon}.png`)" alt="" />
                        </div>
                        <div class="bookText">
                            {{item.title}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- 页面内容 -->
            <div class="siteFrame">
                <iframe
                    :src="frameURL"
                    class="frame"
                    frameborder="0"
                    id="isite"
                ></iframe>
            </div>
        </main>
       
    </lazy-component>
</template>

<script setup>
import ToolBar from '../ToolBar'
import { WebSitesData } from '@/data/EdgeData.json'
import { MenuData } from '@/data/MenuData.json'
import { getSrcIcon } from '@/utils/getSrc'

let frameURL = 'https://cn.bing.com/'; // 页面URL
const historyURL = []; // URL历史

// 跳转函数
const goTo = (url, mark) => {
    frameURL = url;
    if (!mark) historyURL.push(url);
}
// 后退URL
const goBackURL = () => {
    if (historyURL.length) {
        goTo(historyURL.pop(), true);
    }
}
// 前进URL
const goForwardURL = () => {
    const index = historyURL.indexOf(frameURL);
    if (index < frameURL.length - 1) {
        frameURL = historyURL[index+1];
    } else {
        alert('当前无更早的URL');
    }
}
// 回到主页
const goHomeURL = () => {
    frameURL = 'https://cn.bing.com/';
    historyURL.push('https://cn.bing.com/');
}
// 地址栏URL键盘跳转
const submitInput = () => {
    let url = document.getElementById('urlin').value;
    goTo(url, false);
}
// 地址栏点击跳转
const clickEnterBtn = () => {
    let url = document.getElementById('urlin').value;
    goTo(url, false);
}
// 点击收藏夹，跳转
const clickWebsite = (url) => {
    goTo(url, false)
}
</script>

<style lang="scss" scoped>
  .EdgeFullBox {
    main {
      width: 100%;
      height: calc(100% - 30px);
    }
  }
   .edgeToolBar {
      height: 50px;
      width: 100%;
      padding: 3px 0 8px;
      background: $myBlue;
      .addressBar {
          display: flex;
          .edgenavicon {
              margin: 3px 8px 1px;
              img {
                height: 16px;
                width: 16px;
              }
          }
          
          .addCont {
              display: flex;
              width: 65%;
              padding:3px 0 0 5px;
              input {
                  width:100%;
                  height: 70%;
                  border-radius: 15px;
                  border: 0;
                  background-color: $myGray;
              }
              .enter {
                  margin-left: 5px;
                  position: relative;
                  
              }
              img {
                position: absolute;
                top: 1px;
                right: 12px;
                height: 18px;
                width: 18px;
              }
          }
          .addUser {
              padding: 2px 5px 0 ;
              img {
                  width: 20px;
                  height: 20px;
              }
          }
      }
      .bookBar {
          display: flex;
          width: 100%;
          .bookhandle {
              display: flex;
              padding: 2px 6px;
              .bookIcon {
                  img {
                      padding: 3px 3px 0;
                      border-radius: 15px;
                      width: 16px;
                      height: 16px;
                  }
              }
              .bookText {
                  font-size: 14px;
              }
          }
      }
  }
  .siteFrame {
    overflow: hidden;
    flex-grow: 1;
    height: 100%;
    .frame {
        width: 100%;
        height: 100%;
    }
   }
</style>