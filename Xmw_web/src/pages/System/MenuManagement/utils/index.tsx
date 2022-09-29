/*
 * @Description: 公共方法
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-29 15:12:55
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-29 15:22:45
 */
/**
 * @description: 默认不显示的 column 项
 * @return {*}
 * @author: Cyan
 */
export const renderColumnsStateMap = () => {
    const result = {}
    const MENU_CFG = [
        'redirect',
        'navTheme',
        'headerTheme',
        'layout',
        'hideChildrenInMenu',
        'hideInMenu',
        'hideInBreadcrumb',
        'headerRender',
        'headerRender',
        'footerRender',
        'menuRender',
        'menuHeaderRender',
        'flatMenu',
        'fixedHeader',
        'fixSiderbar',
    ];
    MENU_CFG.forEach(ele => {
        result[ele] = {
            show: false
        }
    })
    return result
}