<template>
    <div class="desktop">
       <div class="main">
           <DesktopIcon></DesktopIcon>
       </div>
        <div class="footer">
            <TaskBar></TaskBar>
        </div>
    </div>
</template>

<script>
import DesktopIcon from '@/components/DesktopIcon'
import TaskBar from '@/components/TaskBar/index.vue'

export default {
    name:'Home',
    components: {
        DesktopIcon,
        TaskBar
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
        background-image: url("@/assets/img/setting/assetsImg/default/default.jpg");
        background-size: 100% 100%;
    }
    .footer {
        height: 48px;
        width: 100%;
    }
}
</style>