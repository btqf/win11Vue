import {
    addEvent,
    removeEvent
} from '../desktop'
import useDesktopConfigStore from '@/store/desktopConfigStore'
import useIconOverlayTipStore from '@/store/iconOverlayTipStore'
import DragFeatrue from './DragFeatrue'

// 设置宽高
export  const setWidthHeight = (width, height, Modal) => {
    Modal.style.width = (width < 0 ? -width : width) + 'px';
    Modal.style.height = (height < 0 ? -height : height) + 'px';
}

// 判断元素是否在规定区域
export const judgeContains = (parent, Modal) => {
    const children = Array.from(parent.children);
    const { left, right, top, bottom } = Modal.getBoundingClientRect();
    const containsArray = [];
    children.forEach((value) => {
        const rect = value.getBoundingClientRect();
        if (rect.left > left && rect.right < right && rect.top > top && rect.bottom < bottom) {
            value.classList.add('selected');
            containsArray.push(value.__vnode.ref.i.props.data);
        }
    })
    return containsArray;
}

export default function (e, list, item, config) {
    const tipStore = useIconOverlayTipStore();
    const configStore = useDesktopConfigStore();
    const isInTaskbar = false;
    const stayPos = {};
    const _self = this;
  
    const dragF = new DragFeatrue(e, this, list, item);
    const recordInElemX = dragF.recordInElemX;
    const recordInElemY = dragF.recordInElemY;
  
    let moveDragF = null;
  
    addEvent(document, 'mousemove', mouseMove);
    addEvent(document, 'mouseup', mouseUp);
  
    function mouseMove(e) {
      const currentDragF = new DragFeatrue(e, _self, list, item);
  
      currentDragF
        .move(recordInElemX, recordInElemY, {
          edgeWeight: config.edgeWeight,
          edgeHeight: config.edgeHeight,
        })
        .overlay(configStore, list, tipStore, isInTaskbar);
  
      stayPos.x = currentDragF.stayPos.x;
      stayPos.y = currentDragF.stayPos.y;
  
      moveDragF = currentDragF;
    }
  
    function mouseUp() {
      moveDragF && moveDragF.stop(configStore, stayPos, isInTaskbar, tipStore);
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  }