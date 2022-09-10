<template>
    <div>
        <boot-screen v-if="!clock"  ></boot-screen>
        <!-- <transition name='login'> -->
            <lock-screen
             v-show="clock && !showcut"
             @click="clickshow"
            >
            </lock-screen>
        <!-- </transition> -->
        <Login v-show="showcut"></Login>
    </div>
</template>

<script>
import BootScreen from './component/BootScreen.vue'
import LockScreen from './component/LockScreen.vue'
import Login from './component/Login.vue'

export default {
    name: 'login',
    components: {
        BootScreen,
        LockScreen,
        Login
    },
    data() {
        return {
            clock: false,
            showcut: false
        }
    },
    methods: {
        clickshow() {
            this.showcut = true
            console.log(this.showcut)
        }
    },
    mounted: function () {
    // 图片预加载完成后 2 s执行本地加载
    // preLoad().then(res=>{
    //   setTimeout(()=>{
    //     this.clock = true;
    //   },2000)
        setTimeout(() => {
            this.clock = true
            console.log(this.clock)
        }, 1000)
    }

}
</script>

<style lang="scss" scoped>
// .login-enter-active {
//   transition: all 0.6s ease-out;
// }

.login-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.login-enter-from,
.login-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>