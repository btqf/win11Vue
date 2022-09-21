import useFolderStore from '@/store/folderStore'
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
    return targetTopDesc;
};

export const searchTargetFolderByStr = (searchStr) => {
    const desc = store.storeCompletedFolder;
    const res = [];
    for (let i = 0; i < desc.length; i++) {
      const target = desc[i];
      res.push(...recursiveByStr(target, searchStr));
    }
    return res;
  };

/** 由于不能复用之前的路径递归查找，所以采用字符串搜索
 *
 * @param {object} targetDescArray 当前树的分支
 * @param {any} searchStr 搜索框的承接变量
 * @returns 符合的array
 */
 const recursiveByStr = (targetDescArray, searchStr) => {
    const targetArray = targetDescArray.children || [];
    const res = [];
    if (targetArray.length) {
      for (let i = 0; i < targetArray.length; i++) {
        const target = targetArray[i];
        const reg = new RegExp(searchStr);
        if (reg.test(target.name)) {
          res.push(targetArray[i]);
        } else {
          const result = recursiveByStr(target, searchStr);
          if (result.length) {
            res.push(...result);
          }
        }
      }
      return res;
    } else {
      return [];
    }
  };

  /**
   *  更改当前文件夹前，先将当前的记录压栈，为了goChildren出栈提供参考
   */
export const backParent = () => {
    const data = store.storeCurrentFolder;
    if (data.parent) {
      // 将当前页面压栈
      store.addLastFolder(data);
      // 向后倒退记录
      store.changeCurrentFolder(data.parent);
    }
  };

/**
 *  根据记录栈，查找之前到达的文件夹
 */
 export const goChildren = () => {
    const data = store.deleteLastFolder();
    if (data) {
      store.changeCurrentFolder(data);
    } else {
      alert('记录栈清空了！');
    }
  };
  
