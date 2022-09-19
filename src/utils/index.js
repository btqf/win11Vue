import { taskBarData, toggleTaskPublicData } from '../data'

/**
 * @param {*} target 目标组件元素
 *
 * 传入目标元素，约定底部栏的name和各组件的类名同名
 * 展示该组件
 */
export const showBox = (target, name) => {
    if (!target) return;
    target.style.zIndex = topZindex(target);
    target.classList.add('showBox');
    target.classList.remove('hideBox');

    if (name) {
        let flag;
        // 判断是否 taskbar 中是否已存在当前app
        taskBarData.map((item) => {
            if (item.name === name) {
                flag = true;
            }
        })
        // 如果存在直接返回
        if (flag) return;
        // 如果不存在将其加入到任务栏中
        taskBarData.push({
            icon: `${name}.png`,
            name,
        })

    }
}

/**
 * @param {*} flag 是否最小化或者关闭
 * @param {*} target 目标组件
 * @param {*} e 底部栏名字，是一个类
 *
 * 根据是否为最小化或者关闭，决定是否给borderBottom
 * 由于底部栏的id和组件的类名同名，所以可以同时操作是否显示borderBottom
 */
export const hideBox = (flag, target, e) => {
    if (!target) return;

    target.style.zIndex = -1;
    target.classList.remove('showBox');
    target.classList.add('hideBox');
    relizeZindex(target);

    const item = document.querySelector(`#${e}`);
    if (!flag) {
      item.style.borderBottom = '0';
    } else {
      item.style.borderBottom = '3px solid black';
    }
}

/**
 * @param {*} target 目标组件
 * 在data目录中共同维护一个最高层级的索引值，
 * 每次调用此函数，返回当前最大的索引级数返回给调用者，同时维护该数据++
 */
export const topZindex = (target) => {
    forAppArray();
    toggleTaskPublicData.currentAppCount.push(target);
    return ++toggleTaskPublicData.zIndex;
}

/**
 * 降低当前已打开 app 中的显示层级
 */
export const forAppArray = () => {
    toggleTaskPublicData.currentAppCount.map((item) => {
        item.style.zIndex = --item.style.zIndex < 1 ? 1 : item.style.zIndex;
    });
}

/**
 * @param {*} target 目标组件
 * 切换task显示将其透明度设置为-1，并维护公共数据，表明
 * 当前页面上显示的application数字减一
 */
export const relizeZindex = (target) => {
    const targetClass = target.getAttribute('class');
    toggleTaskPublicData.currentAppCount.map((item, i, array) => {
        const originClass = item.getAttribute('class');
        if (targetClass === originClass) {
            array.splice(i, 1)
        }
    });
    --toggleTaskPublicData.zIndex
}