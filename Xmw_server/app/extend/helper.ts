
module.exports = {
    /**
     * @description: naniod 生成唯一id
     * @param {*} len:指定长度，默认21，这里我们全部默认20
     * @return {*}
     * @author: Cyan
     */
    generateNanoid(len = 20) {
        const nanoid = require('nanoid');
        return nanoid(len)
    }
}