<template>
  <div class="startMenu">
    <div class="content">
      <!-- app列表 -->
      <transition mode="out-in">
        <component :is="componentTag" @changeTag="changeTag"></component>
      </transition>
    </div>
    <!-- 用户名&&电源 -->
    <div class="bottomMenu" @click="gotoLoginPage">
      <div class="user">
        <img src="@/assets/img/login/avatar.jpg" alt="" />
        <p>btqf</p>
      </div>
      <i class="shutdown"></i>
    </div>
  </div>
</template>

<script setup>
import AppList from './components/AppList.vue'
import AllApps from './components/AllApps.vue'
import { markRaw, shallowRef } from 'vue'

const componentTag = shallowRef(AppList) 
const changeTag = () => {
    componentTag.value = componentTag.value === markRaw(AppList) ? markRaw(AllApps) : markRaw(AppList);
};

const goToLoginPage = () => {
    this.$router.push('/')
}
</script>

<style lang="scss" scoped>
 .startMenu {
    width: 610px;
    height: 636px;
    border-radius: 3px;
    box-shadow: 1px 1px 2px rgba(34, 34, 34, 0.25);
    background-color: $myBlue;
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    // z-index: -1;
    z-index: 200;

    .content {
      background-color: #ddeaf54f;
      box-sizing: border-box;
      padding: 30px 48px;
    }
    .bottomMenu {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 54px;
      background: rgba(175, 175, 175, 0.1);
      padding: 0 48px;
    }
  }
  .bottomMenu {
    .user {
      height: 100%;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      img {
        width: 40px;
        border-radius: 50%;
      }
    }
    .shutdown {
      margin-right: 60px;
      width: 22px;
      height: 22px;
      background-image: url('../../assets/img/icon/ui/power.png');
      background-repeat: no-repeat;
      background-size: 90%;
      cursor: pointer;
      filter: invert(1);
    }
  }

  .v-enter-active,
  .v-leave-active {
    // transform: ;
    transition: 0.3s;
  }

  .v-enter-from {
    opacity: 1;
    transform: translateX(10%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(0);
  }
</style>