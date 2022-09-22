import { defineStore } from "pinia";

const useMenuStore = defineStore('menuStore', {
    state: () => ({
        menuVisible: false,
    }),
    actions: {
        setMenuVisible(isVisible) {
            this.menuVisible = isVisible;
        },
    }
})

export default useMenuStore