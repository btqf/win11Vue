<template>
    <div class="desktop" @contextmenu.prevent="showMainMenu($event)" @click="changeMenuVisible">
       <div class="main">
           <ContextMenu ref="menuRef"></ContextMenu>
           <IconOverlayTip></IconOverlayTip>
           <Folder></Folder>
           <DesktopIcon></DesktopIcon> 
           <Edge></Edge>
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
import Terminal from '@/components/Terminal'
import TaskBar from '@/components/TaskBar/index.vue'
import useMenuStore from '@/store/menuStore'

const menuRef = ref(null);
const showMainMenu = (e) => {
    menuRef.value.setMenu(e, 'blank')
}

const store = useMenuStore();
const changeMenuVisible = () => {
    store.setMenuVisible(false);
}
// export default {
//     name:'Home',
//     components: {
//         ContextMenu,
//         Folder,
//         DesktopIcon,
//         TaskBar,
//         IconOverlayTip
//     },
//     methods: {
//         showMainMenu: (e) => {
//           menuRef.value.setMenu(e, 'blank');
//         }
//     }
// }
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