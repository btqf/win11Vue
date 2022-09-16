import _ from 'lodash';

class DesktopIcon {
    // 将 app 图标与 文件夹 图标整合成一个数据集
    constructor(baseData, folderData) {
        this.emptyPosInx = 1;
        this.appData = [];
        this.init(baseData, folderData);
    }

    init(baseData, folderData) {
        this.setAppData(baseData, folderData);
        this.setEmptyPosIdx();
    }

    // 处理原始数据
    setAppData(baseData, folderData) {
        // 处理基础app信息
        this.appData = this.appData.concat(baseData);
        // 处理文件夹信息
        this.setEmptyPosIdx()
        for (let i = 0; i < folderData.length; i++) {
            item.posIdx = this.emptyPosIdx;
            item.componentName = 'FolderFullBox';
            item.icon = 'explorer.png';

            this.appData.push(item);
            this.setEmptyPosIdx();
        }
    }

    setEmptyPosIdx() {
        // 排序
        sortByPosInx(this.appData);
        // 取出排序后图标顺序最前的
        let curInx = this.appData[0].posIdx;
        // 如果 curInx 不为 1，则直接将空余图标顺序位置设置为 1
        // 否则，则将按顺序遍历 appData，找到最先的空余图标位置，将其设置
        if (curInx !== 1) {
            this.emptyPosInx = 1;
            return;
        }

        let idx;
        for (let i = 0; i < this.appData.length; i++, curInx++) {
            idx = this.appData[i].posIdx
            if (curInx !== idx) {
                this.emptyPosInx = this.appData[i-1].posIdx + 1;
                break;
            }
        }
        // 如果一直没有空余图标位置，则将其放置在图标的最后
        if (currIdx > idx) {
            this.emptyPosIdx = curIdx;
        }
    }

    // 根据 PosIdx 排序
    sortByPosIdx(appData) {
        const arr = appData;
        for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j].posIdx > arr[j + 1].posIdx) {
            const temp = _.cloneDeep(arr[j + 1]);
            arr[j + 1] = arr[j];
            arr[j] = temp;
            }
        }
        }
    }
}

export default DesktopIcon