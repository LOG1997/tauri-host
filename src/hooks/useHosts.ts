import { useState, useEffect } from "react";
import { IHostObj } from '@/types/type'
import { trimArray } from '@/utils/index'
export const useHostObj = (hostsArr: Array<string>) => {
    const [content, setContent] = useState<Array<IHostObj>>([]);
    // 筛选有IP的行
    function filterHostItem(hostsArr: Array<string>) {
        let res: Array<any> = []
        hostsArr.forEach((item: string, index: number) => {
            item.replace('#', '# ')
            if (item.match(/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/)) {
                res.push({ item, index })
            }

        })

        return res

    }
    // 组装
    function assembleHostItem(hostsArr: Array<string>) {
        let hostData = filterHostItem(hostsArr)
        let itemObj: IHostObj = {
            line: 0,
            ip: '',
            domain: '',
            note: '',
            active: true,
            repetitive: false,
            ipStatus: '',
            domainStatus: '',
            noteStatus: ''
        }
        const hostObjArr: Array<IHostObj> = []
        hostData.forEach((item) => {
            const itemArr = trimArray(item.item.split(' '))
            itemObj.line = item.index
            if (itemArr[0] == '#') {
                if (itemArr[2].includes('#')) {
                    const newItem = itemArr[2].split('#')
                    newItem.splice(1, 0, '#');
                    itemArr.splice(2, 1, ...newItem);
                }
                itemObj.active = false
                itemObj.ip = itemArr[1]
                itemObj.domain = itemArr[2]
                // 如果有note
                if (itemArr.length > 4 && itemArr[4]) {
                    itemObj.note = itemArr.slice(4).join(' ')
                }
                else {
                    itemObj.note = ''
                }
            }
            else {
                if (itemArr[1].includes('#')) {
                    const newItem = itemArr[1].split('#')
                    newItem.splice(1, 0, '#');
                    itemArr.splice(1, 1, ...newItem)
                }
                itemObj.active = true
                itemObj.ip = itemArr[0]

                itemObj.domain = itemArr[1][0]

                itemObj.domain = itemArr[1]
                if (itemArr.length > 3 && itemArr[3]) {
                    itemObj.note = itemArr.slice(3).join(' ')
                } else {
                    itemObj.note = ''
                }
            }
            hostObjArr.push(structuredClone(itemObj))
        })
        return hostObjArr;
    }
    useEffect(() => {
        const res = assembleHostItem(hostsArr)
        setContent(res)
    }, [hostsArr])


    return { content, setContent }
}