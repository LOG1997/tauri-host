// 去除数组中的空格元素
export const trimArray = (arr: any[]) => {
    return arr.filter((item: any) => item !== '')
}
// 含有#则将字符串拆分
export const splitString = (str: string) => {
    return str.split('#')
}
// 验证
export const validateValue = (str: string, key: string, index?: number) => {
    if (key == 'note') {
        return true
    }
    const regIP = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
    const regDomain = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+.?/
    if (key === 'ip') {
        return regIP.test(str)
    }
    else if (key === 'domain') {
        return regDomain.test(str)
    }
}