// 可视区域尺寸
export function getViewportSize () {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    } else {
        // 判断当前浏览器采用 渲染方式 是否兼容，从而确定客户区宽高度
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight,
              };
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            };
        }
    }
}