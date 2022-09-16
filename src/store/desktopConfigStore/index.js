import { defineStore } from "pinia";
import { getViewportSize } from "@/utils/viewSize/desktop";

const useDesktopConfigStore = defineStore('desktopConfigStore', {
    state: () => ({
            iconBaseWeight: 76.8,
            iconBaseHeight: 76.8,
            taskbarHeight: 48,
            currentSelected: [],
            isIconMenuVisible: false,
    }),
    getters: {
        // 获取icon最大坐标值与视图窗口值
        maxIconCountY: (state) =>
        Math.floor((getViewportSize().height - state.taskbarHeight) / state.iconBaseWeight),
  
        maxIconCountX: (state) => {
            Math.floor(getViewportSize().width / state.iconBaseHeight)
        },
        deskTopViewSize: (state) => {
            getViewportSize().height - state.taskbarHeight
        },
    },
    actions: {
        changeCurrentSelected(data) {
            this.currentSelected = [];
            if (Array.isArray(data)) {
              this.currentSelected = this.currentSelected.concat(data);
            } else {
              this.currentSelected.push(data);
            }
        },
    }
})

export default useDesktopConfigStore