import useFolderStore from '@/store/folderStore'
// import { MessageBox } from '@/plugins/MessageBox'
const store = useFolderStore()


/** 递归磁盘下的children，匹配目标文件夹或文件
 *
 * @param {*} targetDescArray 目标磁盘
 * @param {*} targetPath 路径栏的目标路径
 * @returns 返回目标proxy 或 false
 */
 const recursiveByPath = (targetDescArray, targetPath) => {
    const targetArray = targetDescArray.children || [];
    if (targetArray.length) {
        for (let i = 0; i < targetArray.length; i++) {
            const target = targetArray[i];
            if (target.children) {
                const tempPath = target.getPath().toString();
                const path = targetPath.toString();
                if (tempPath === path) {
                    return target;
                } else {
                    if (recursiveByPath(target, targetPath)) {
                        return recursiveByPath(target, targetPath);
                    }
                }
            } else {
                const fileName = `${target.name}.${target.extension}`;
                const file = targetPath[targetPath.length - 1];
                if (fileName === file) {
                    return target;
                }
            }
        }
    } else {
        return false;
    }
 }

/**
 * 调用 recursive 递归函数，返回目标文件夹信息
 * @param {*} path 路径的全信息数组
 * @return proxy目标对象 或 false
 */
export const searchTargetFolderByPath = (path) => {
    // 当path长度为 1 , 代表为磁盘根路径
    if (path.length === 1) {
        return goDesc(path)[0];
    }
    // 全部的磁盘信息
    const desc = store.storeCompletedFolder;
    // 目标磁盘
    const targetDescArray = desc.filter((value) => value.getPath()[0] === path[0]);

    if (targetDescArray.length) {
        const data = recursiveByPath(...targetDescArray, path);
        if (data) {
            return data;
        } else {
            alert('数据不存在')
        } 
    } else {
        alert('磁盘不存在')
    }
}


/** 回到当前磁盘的磁盘根对象
 *
 * @param { array } path 当前的路径
 */
 export const goDesc = (path) => {
    const desc = store.storeCompletedFolder;
    const targetTopDesc = desc.filter((value) => value.getPath()[0] === path[0]);
  
    if (!targetTopDesc.length) {
      return [];
    }
    // store.changeCurrentFolder(...targetTopDesc);
    return targetTopDesc;
};



