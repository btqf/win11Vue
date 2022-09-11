<template>
    <div class="desktop">
       <div class="main">
           home
       </div>
        <div class="footer">
            <taskBar></taskBar>
        </div>
    </div>
</template>

<script>
import taskBar from '@/components/taskBar/index.vue'
export default {
    components: {
        taskBar
    },
    setup () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.desktop {
    width: 100vw;
    height: 100vh;

    .main {
        height: calc(100% - 48px);
        width: 100%;
    }
    .footer {
        height: 48px;
        width: 100%;
    }
}
</style>