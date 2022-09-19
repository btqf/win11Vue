import { defineStore } from "pinia";


const useFolderStore = defineStore('folderStore', {
    state: () => {
        return {
            storeCurrentFolder: {},
            storeCompletedFolder: [],
            lastFolder: [],
            currentShowFolder: [],
            currentSearchStr: [],
        };
    },
    actions: {
        changeCurrentFolder(CurrentFolder) {
            this.storeCurrentFolder = CurrentFolder;
            const length = this.currentShowFolder.length;
            const children = this.storeCurrentFolder.children;
            this.currentShowFolder.splice(0, length, ...children);
            const len = this.currentSearchStr.length;
            this.currentSearchStr.splice(0, len);
        },
        cacheCompletedFolder(Folders) {
            this.storeCompletedFolder = Folders;
        },
        addLastFolder(Folder) {
            this.lastFolder.push(Folder);
        },
        deleteLastFolder() {
            return this.lastFolder.pop()
        },
        changeCurrentShowFolder(newArray) {
            const length = this.currentShowFolder.length;
            this.currentShowFolder.splice(0, length, ...newArray);
        },
        setCurrentSearchStr(currentStr) {
            const length = this.currentSearchStr.length;
            this.currentSearchStr.splice(0, length, ...currentStr);
        },
    }
})

export default useFolderStore