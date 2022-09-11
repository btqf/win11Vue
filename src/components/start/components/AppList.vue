<template>
    <div class="appList">
        <div class="topNav">
            <p>Pinned</p>
             <button class="elbutton" @click.stop="toAllApps">
                All Apps
                <i class="el-icon--right"></i>
                >
            </button>
        </div>
        <!-- 固定app列表 -->
        <div class="pinnedList">
            <div v-for="(item, index) in pinnedData" :key="index" @click="openApp(item.name)">
                 <img :src="getSrcStartIcon(`${item.url}.png`)" alt="" srcset="" />
                 <p>{{item.name}}</p>
            </div>
        </div>
        <!-- 推荐app列表 -->
        <div class="topNav">
            <p>Recommend Projects</p>
        </div>
        <div class="recommendList">
            <div class="recommendItem" v-for="(item, index) in recommendData" :key="index">
                <img :src="getSrcStartIcon(`${item.url}.png`)" alt="">
                <div>
                     <h4>{{item.title}}</h4>
                     <p>{{item.desc}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { pinnedData, recommendData } from '@/data/StartData.json';
import { getSrcStartIcon } from '@/utils/getSrc.js'

  const emit = defineEmits(['changeTag']);
  function toAllApps() {
    // console.log("  emit('changeTag');");
    emit('changeTag');
  }
  const openApp = (appName) => {
    console.log(`open: ${appName}`);
}
</script>

<style lang="scss" scoped>
  .appList {
    font-size: 14px;
    .topNav {
      font-size: 600;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 40px;
      font-weight: 700;
    }
    .elbutton {
      font-size: 12px;
      color: #333;
      padding: 5px 8px;
      border-radius: 3px;
      border: #b9ccef solid 1px;
      background: rgba(255, 255, 255, 0.9);
      font-weight: 600;
      .el-icon--right {
        margin-left: 3px;
      }
      &:hover {
        background: rgb(199 217 240 / 90%);
      }
    }
  }
  .pinnedList {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 20px;
      margin-bottom: 10px;
      & > div {
          width: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
          border-radius: 4px;
          &:hover {
              background: rgb(255 255 255);
          }
          p {
              font-weight: 500;
              font-size: 0.5em;
              text-align: center;
              white-space: nowrap;
              color: #2f2f2f;;
          }
          img {
              width: 24px
          }
      }
   }
    .recommendList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 10px 20px 20px 40px;
        .recommendItem {
            width: 40%;
            height: 45px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 10px;
            border-radius: 4px;
            div {
                text-align: left;
                h4 {
                    font-size: 12px;
                    font-weight: 600;
                    color: #555;
                    margin-top:10px;
                    margin-bottom: 0;
                    
                }
                p {
                    padding-top: 0;
                    font-size: 10px;
                    color: #666;
                    margin: 0;
                }
            }
            img {
                height: 50%;
                margin-right: 16px;
            }
            &:hover {
                background: rgb(255, 255, 255);
            }
        }
    }
</style>