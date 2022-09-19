import File from './file'
import { addStorageUnit, showProperUnit } from './convertUnit'
import parseFileType from './pasreFIleType'

class Folder {
    constructor(options, parent) {
        this.children = [];
        this.parent = parent;
        this.init(options);
        if (options.posIdx) {
            this.posIdx = options.posIdx;
        }
    }

    init(options) {
        this.setInfo(options);
        this.setFolders(options.children);
        this.computedSizeByChildren()
    }

    getInfo() {
        return {
            name: this.name,
            size: showProperUnit(this.size),
        }
    }

    setInfo(info) {
        this.name = info.name;
        this.setPath();
    }

    computedSizeByChildren() {
        this.size = this.children.reduce((initVal, item) => {
            if (item.size) {
                return addStorageUnit(initVal, item.size);
            }
            return initVal;
        }, '0KB');
    }

    getPath() {
        return this.parsePath(this.path);
    }

    setPath() {
        this.path = `${this.parent.path}${this.name}\\`;
    }

    parsePath(path) {
        return path.split('\\').filter((item) => item);
    }

    changeName(newName) {
        const parentChildren = this.parent.children;
        const isRep = this.isRepeat(newName, parentChildren);
        if (isRep) {
          return false;
        }
        this.name = newName;
        return true;
    }

    isRepeat(newName, array) {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
          const originName = /[A-Za-z0-9_\-\u4e00-\u9fa5]+/.exec(array[i].name)[0];
          if (originName === newName) {
            count++;
          }
        }
        if (count) {
          return count;
        }
        return false;
    }

    setFolders(list) {
        list.forEach((item) => {
            const type = parseFileType(item);
            this.children.push(type === 'folder' ? new Folder(item, this): new File(item));
        })
    }

    addNewEmptyFolder(options) {
        if (options.children.length) {
          return new Error('该新建文件夹不为空');
        }
        options.name = options.name || '新建文件夹';

        const name = options.name;
        const children = this.children;
    
        const isRep = this.isRepeat(name, children);

        if (isRep) {
          options.name = `${options.name}[${isRep}]`;
        }

        return this.children.push(new Folder(options, this));
    }

    addNewEmptyFile(options) {
        const name = options.name;
        const children = this.children;
        const isRep = this.isRepeat(name, children);

        if (isRep) {
          options.name = `${options.name}[${isRep}]`;
        }

        return this.children.push(new Folder(options, this));
    }
}

export default Folder