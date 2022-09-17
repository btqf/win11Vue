import { defineStore } from "pinia";

const useIconOverlayTipStore = defineStore('iconOverlayTip', {
    state: () => ({
        tipIsVisible: false,
        tipContent: '',
    }),
    actions: {
        setTipIsVisible(isVisible) {
            this.tipIsVisible = isVisible;
        },
        setTipContent(content) {
            this.tipContent = content;
        }
    }
})

export default useIconOverlayTipStore