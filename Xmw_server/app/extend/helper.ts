/*
 * @Description: 全局工具函数
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 10:42:18
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-14 17:37:27
 */

module.exports = {
    /**
     * @description: 
     * @param {any} source: 源数据
     * @param {string} id
     * @param {string} parentId
     * @param {string} children
     * @return {*}
     * @author: Cyan
     */
    initializeTree(source: any, id: string, parentId: string, children: string) {
        let temp = JSON.parse(JSON.stringify(source))
        // 以id为键，当前对象为值，存入一个新的对象中
        let tempObj = {}
        for (let i in temp) {
            tempObj[temp[i][id]] = temp[i]
        }
        return temp.filter((father) => {
            // 把当前节点的所有子节点找到
            let childArr = temp.filter((child) => father[id] == child[parentId])
            childArr.length > 0 ? (father[children] = childArr) : ''
            // 只返回第一级数据；如果当前节点的fatherId不为空，但是在父节点不存在，也为一级数据
            return father[parentId] === null || !tempObj[father[parentId]]
        })
    },
}