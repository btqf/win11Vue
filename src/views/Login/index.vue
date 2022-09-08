<template>
    <div>
        <boot-screen v-if="clock"></boot-screen>
        <!-- <lock-screen></lock-screen> -->
        <Login></Login>
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
            clock: true
        }
    },
    mounted: function () {
    // 图片预加载完成后 2 s执行本地加载
    // preLoad().then(res=>{
    //   setTimeout(()=>{
    //     this.clock = true;
    //   },2000)
        setTimeout(() => {
            this.clock = false
        }, 1000)
    }

}
</script>

<style lang="scss" scoped>

</style>