<template>
    <div class="desktop" @contextmenu.prevent="showMainMenu($event)" @click="changeMenuVisible">
       <div class="main">
           <ContextMenu ref="menuRef"></ContextMenu>
           <IconOverlayTip></IconOverlayTip>
           <Folder></Folder>
           <DesktopIcon></DesktopIcon> 
           <Edge></Edge>
           <Setting></Setting>
           <Terminal></Terminal>
       </div>
        <div class="footer">
            <TaskBar></TaskBar>
        </div>
    </div>
</template>

<script setup>
import ContextMenu from '@/components/ContextMenu'
import IconOverlayTip from './components/IconOverlayTip.vue'
import DesktopIcon from '@/components/DesktopIcon'
import Folder from '@/components/Folder'
import Edge from '@/components/Edge'
import Setting from '@/components/Setting'
import Terminal from '@/components/Terminal'
import TaskBar from '@/components/TaskBar/index.vue'
import useMenuStore from '@/store/menuStore'
import useUserStore from '@/store/userStore'
import { getSrcSettingTheme } from '@/utils/getSrc';

const menuRef = ref(null);
const showMainMenu = (e) => {
    menuRef.value.setMenu(e, 'blank')
}

const menuStore = useMenuStore();
const changeMenuVisible = () => {
    menuStore.setMenuVisible(false);
}
const userStore = useUserStore();
onMounted(() => {
    document.querySelector('.desktop').style.backgroundImage = `url(${getSrcSettingTheme(`${userStore.getTheme}.jpg`)})`;
});
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.desktop {
    width: 100vw;
    height: 100vh;
    background-size: 100% 100%;
    .main {
        height: calc(100% - 48px);
        width: 100%;
        // background-image: url("@/assets/img/setting/assetsImg/default/default.jpg");
        background-size: 100% 100%;
    }
    .footer {
        height: 48px;
        width: 100%;
    }
}
</style>