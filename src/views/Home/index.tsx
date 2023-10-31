import React, { useState, useRef, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri';
import { useHostObj } from '@/hooks/useHosts';
import { UploadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Space, Input, Switch, Modal, notification, Upload, Button } from 'antd';
import { IHostObj } from '@/types/type'
import { validateValue } from '@/utils/index'
import { useSize } from 'ahooks';


type NotificationType = 'success' | 'info' | 'warning' | 'error';
type SizeType = 'large' | 'middle' | 'small'
export default function Home() {
    const [api, contextHolder] = notification.useNotification();
    const { confirm } = Modal;
    const containerRef = useRef(null);
    const size = useSize(containerRef);
    const [inputSize, setInputSize] = useState<SizeType>('small')
    const [originalContent, setOriginalContent] = useState<Array<string>>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { content, setContent } = useHostObj(originalContent)
    const [newContent, setNewContent] = useState<IHostObj>({
        line: 0,
        ip: '',
        domain: '',
        note: '',
        active: true,
        repetitive: false,
        ipStatus: '',
        domainStatus: '',
        noteStatus: ''
    })
    const readFile = async () => {
        setOriginalContent([])
        invoke("read_file").then((res: any) => {
            const resArr = res.split("\r\n")
            setOriginalContent(resArr.slice(0));
        })
    }
    const writeFile = async (data: Array<string>) => {
        const resData = data.join("\r\n");
        invoke("write_file", { str: resData }).then(
            () => {
                openNotificationWithIcon('success', "写入成功")
                readFile()
            }
        )
    }
    const changeValue = (key: string, e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        // key是IHostObj的键值
        content[index][key as keyof IHostObj] = e.target.value
        if (!validateValue(e.target.value, key, index)) {
            content[index][key + 'Status' as keyof IHostObj] = 'error'
        }
        else {
            content[index][key + 'Status' as keyof IHostObj] = ''
        }
        setContent(content.slice(0))
    }
    const changeActive = (checked: boolean, index: number) => {
        content[index].active = checked
        setContent(content.slice(0))
    }
    const changeNewValue = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        newContent[key as keyof IHostObj] = e.target.value
        if (!validateValue(e.target.value, key)) {
            newContent[key + 'Status' as keyof IHostObj] = 'error'
        }
        else {
            newContent[key + 'Status' as keyof IHostObj] = ''
        }
        setNewContent(Object.assign({}, newContent))
    }
    const changeNewValueActive = (checked: boolean) => {
        newContent.active = checked
        setNewContent(Object.assign({}, newContent))
    }

    const submit = () => {
        const res = []
        if (content.length <= 0) {
            openNotificationWithIcon('error', "请先导入")
            return;
        }

        const writeData = () => {
            for (let i = 0; i < content.length; i++) {
                if (content[i].ipStatus == 'error' || content[i].domainStatus == 'error' || content[i].noteStatus == 'error') {
                    openNotificationWithIcon('error', "输入不合法，请检查")
                    return;
                }
                originalContent[content[i].line] = convertToString(content[i])
            }
            writeFile(originalContent)
        }
        showConfirm('确定写入 ? ', writeData)
    }

    const addItem = () => {
        if (content.length <= 0) {
            openNotificationWithIcon('error', "请先导入")
            return;
        }
        const itemObj: IHostObj = {
            line: originalContent.length,
            ip: '',
            domain: '',
            note: '',
            active: true,
            repetitive: false,
            ipStatus: '',
            domainStatus: '',
            noteStatus: ''
        }
        setIsModalOpen(true);
        setNewContent(itemObj);
    }

    const deleteItem = (item: IHostObj, index: number) => {
        const delData = () => {
            content.splice(index, 1)
            setContent(content.slice(0))
        }

        showConfirm('确定要删除 ? ', delData)
    }

    const openNotificationWithIcon = (type: NotificationType, message: string) => {
        api[type]({
            message: '提醒',
            description:
                message,
        });
    };
    const showConfirm = (text: string, confirmFn: any) => {
        confirm({
            title: text,
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                confirmFn();
            },
            onCancel() {
            },
        });
    };

    const handleOk = () => {
        if (newContent.ipStatus == "error" || newContent.domainStatus == "error" || newContent.noteStatus == "error") {
            openNotificationWithIcon('error', "输入不合法，请检查")
            return
        }

        setIsModalOpen(false);
        setContent([...content, newContent])
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    // 转化为字符串
    const convertToString = (item: IHostObj) => {
        let res = ''
        if (!item.active) {
            res += '# '
        }
        else {
            res += '  '
        }
        let ipStr = `${item.ip}`
        let domainStr = `${item.domain}`
        if (ipStr.length < 25) {
            // 添加空格25长度
            ipStr = ipStr.padEnd(25, ' ')
        }
        else {
            ipStr = ipStr + ' '
        }
        if (domainStr.length < 25) {
            domainStr = domainStr.padEnd(25, ' ')
        } else {
            domainStr = domainStr + ' '
        }
        res = res + ipStr + domainStr + '# ' + item.note
        return res
    }

    useEffect(() => {
        if (size && size?.width < 1200) {
            setInputSize('middle')
        }
        if (size && size?.width > 1600) {
            setInputSize('large')
        }

    }, [size])
    return (
        <div className='w-full' ref={containerRef}>
            <h1>Host</h1>
            {contextHolder}

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input addonBefore="IP" value={newContent.ip} onChange={(e) => { changeNewValue('ip', e) }} status={newContent.ipStatus}></Input>
                <Input addonBefore="Domain" value={newContent.domain} onChange={(e) => { changeNewValue('domain', e) }} status={newContent.domainStatus}></Input>
                <Input addonBefore="Note" value={newContent.note} onChange={(e) => { changeNewValue('note', e) }} status={newContent.noteStatus}></Input>
                <Switch defaultChecked={newContent.active} onChange={(checked) => { changeNewValueActive(checked) }} />
            </Modal>
            <div className='flex justify-center gap-12'>
                <button onClick={readFile}>读取</button>
                <button onClick={submit}>写入</button>
                <button onClick={addItem}>添加</button>
            </div>
            <br></br>
            <div className='flex flex-col items-center gap-3'>
                {
                    content.map((item, index) => {
                        return <Space key={item.line} id={item.line as unknown as string + item.ip
                        }>
                            <Input size={inputSize} addonBefore="IP" value={item.ip} onChange={(e) => { changeValue('ip', e, index) }} status={item.ipStatus}></Input>
                            <Input size={inputSize} addonBefore="Domain" value={item.domain} onChange={(e) => { changeValue('domain', e, index) }} status={item.domainStatus}></Input>
                            <Input size={inputSize} addonBefore="Note" value={item.note} onChange={(e) => { changeValue('note', e, index) }} status={item.noteStatus}></Input>
                            <Switch defaultChecked={item.active} onChange={(checked) => { changeActive(checked, index) }} />
                            <Button type="default" danger onClick={() => { deleteItem(item, index) }}>删除</Button>
                        </Space>
                    })
                }
            </div>
        </div>
    )
}
