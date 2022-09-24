import { defineStore } from 'pinia';

const useTerminalStore = defineStore('terminalStore', {
    state: () => ({
        currentFolder: Proxy,
    }),
    getters: {
        folder: (state) => state.currentFolder,
    },
    actions: {
        setCurrentFolder(folder) {
          this.currentFolder = folder;
        },
    },
})

export default useTerminalStore