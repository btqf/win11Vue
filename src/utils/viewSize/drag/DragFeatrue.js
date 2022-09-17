import {
    pagePos,
    getStyles,
    cancelBubble,
    preventDefaultEvent
} from '../desktop'

class DragFeatrue {
    /** 拖拽动画特性
     *
     * @param {Object} e 鼠标事件
     * @param {Object} elem 被拖拽的对象
     */
    constructor (e, elem, list, item) {
        this.e = e;
        this.elem = elem;
        this.stayPos = {};   // 当前图标停留位置
        this.originPosIdxList = [];  // 原始图标存储排序序号
        list & this.init(list);  // 初始化 originPosIndex
        if (item) {
            this.item = item;
            this.originPosIdx = item.posIdx;
        }
        this.mouseX = pagePos(e).X;
        this.mouseY = pagePos(e).Y;
        // 记录鼠标在被拖拽对象的位置
        this.recordInElemX = this.mouseX - parseInt(getStyles(elem, 'left'));
        this.recordInElemY = this.mouseY - parseInt(getStyles(elem, 'top'));
    }

    // 初始化
    init(list) {
        list.forEach((item) => {
            this.originPosIdxList.push(item.posIdx)
        });
    }

    // 移动
    move(recordInElemX, recordInElemY, config) {
        this.moveX = this.mouseX - recordInElemX;
        this.moveY = this.mouseY - recordInElemY;
    
        this.elemWidth = parseInt(getStyles(this.elem, 'width'));
        this.elemHeight = parseInt(getStyles(this.elem, 'height'));
    
        const edgeX = config.edgeWeight - this.elemWidth;
        const edgeY = config.edgeHeight - this.elemHeight;
    
        if (this.moveX <= 0) {
          this.moveX = 0;
        } else if (this.moveX >= edgeX) {
          this.moveX = edgeX - 1;
        }
        if (this.moveY <= 0) {
          this.moveY = 0;
        } else if (this.moveY >= edgeY) {
          this.moveY = edgeY - 1;
        }
        this.elem.style.left = this.moveX + 'px';
        this.elem.style.top = this.moveY + 'px';
        this.elem.style.zIndex = '999';
        if (this.end) {
          this.end();
        }
    
        return this;
      }

    // 图标覆盖
    overlay(configStore, list, tipStore, isInTaskbar) {
        this.stayPos.x = this.moveX;
        this.stayPos.y = this.moveY;

        // 进入其他图标的区域，提示信息
        const mouseCurrentPosIdx = mouseEnterIconPosIdx(this.e, {
            iconBaseHeight: configStore.iconBaseHeight,
            iconBaseWeight: configStore.iconBaseWeight,
        });

        const overlayedIconPoxIdx = isIconOverlay (
            this.originPosIdxList,
            mouseCurrentPosIdx,
            this.originPosIdx
        )
        // 如果图标重叠，提示操作信息
        if(overlayedIconPoxIdx) {
            // 获取被覆盖图标位置
            const iconInfo = getIconInfoByPosIdx(list, overlayedIconPoxIdx);
            tipStore.setTipIsVisible(true);
            tipStore.setTipContent(`用${iconInfo.name}打开`);
        } else {
            if (this.mouseY > configStore.deskTopViewSize) {
                // 进入任务栏
                tipStore.setTipIsVisible(true);
                tipStore.setTipContent(`固定到任务栏`);
                isInTaskbar = true;
            } else {
                // 关闭提示信息
                tipStore.setTipIsVisible(false);
            }
        }
    }

    stop(configStore, stayPos, isInTaskbar, tipStore) {
        const stopMaxHeight = (configStore.maxIconCountY - 1) * configStore.iconBaseHeight;
        // 桌面视图值小于任务栏
        if (stayPos.y >= stopMaxHeight) {
            // 如果进入任务栏及空白位置，则回到初始位置
            stayPos.y = computePosByPosIdx(this.originPosIdx - 1).yPos;
            stayPos.x = computePosByPosIdx(this.originPosIdx - 1).xPos;

        }
        const xIdx = Math.round(stayPos.x / configStore.iconBaseWeight);
        const yIdx = Math.round(stayPos.y / configStore.iconBaseHeight);
        // posIdx 比实际渲染位置多一个单位距离
        const currentPosIdx = xIdx * configStore.maxIconCountY + yIdx + 1; 
        this.item.posIdx = currentPosIdx;

        if (isIconOverlay(this.originPosIdxList, currentPosIdx, this.originPosIdx)) {
            // 图标重叠
            if (false) {
                // 操作有效
              } else {
                // 操作无效
                this.setPosSizeByPosIdx(this.originPosIdx);
                this.item.posIdx = this.originPosIdx;
              }
        } else {
            if (isInTaskbar) {
                // 图标落在任务栏
                this.setPosSizeByPosIdx(this.originPosIdx);
            } else {
                this.setPosSizeByPosIdx(currentPosIdx)
            }
        }
        this.elem.style.zIndex = '1';
        // 图标停靠之后，关闭信息提示框
        tipStore.setTipIsVisible(false);
    }

    setPosSizeByPosIdx(posIdx) {
        this.elem.style.left = computePosByPosIdx(posIdx - 1).xPos + 'px';
        this.elem.style.top = computePosByPosIdx(posIdx - 1).yPos + 'px';
    }

    end() {
        cancelBubble(this.e);
        preventDefaultEvent(this.e);
    }

}

export default DragFeatrue

// 进入其他图标领域
function mouseEnterIconPosIdx(e, config) {
    const mouseX = pagePos(e).X;
    const mouseY = pagePos(e).Y;
    return (
        Math.floor(mouseX / config.iconBaseWeight) * 9 + Math.floor(mouseY / config.iconBaseHeight) + 1
    );
}

// 判断是否图标重叠
function isIconOverlay(list, tar, origin) {
    const index = list.indexOf(tar);
    if (index <= -1) {
        return 0
    }
    const res = list[index];
    return origin === res ? 0 : res
}

// 根据 posIdx 找到对应图标的信息
function getIconInfoByPosIdx(list, posIdx) {
    return list.find((item) => item.posIdx === posIdx)
}

// 根据 posIdx 计算元素位置
function computePosByPosIdx(posIdx) {
    return {
        xPos: (Math.floor(posIdx / 9) * 76.9).toFixed(1),
        yPos: (Math.floor(posIdx % 9) * 76.9).toFixed(1),
    }
}

