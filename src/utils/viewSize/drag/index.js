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
    return containsArray
}

export default function (e, list, item, config) {
    
}