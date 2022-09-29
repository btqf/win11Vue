<template>
    <div>
        <boot-screen v-if="!clock"></boot-screen>
        <lock-screen
            v-show="clock && !showcut"
            @click="clickshow"
        >
        </lock-screen>
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
        }
    },
    mounted: function () {
        setTimeout(()=>{
            this.clock = true;
        }, 1000)
    }
}
</script>

<style lang="scss" scoped>

</style>