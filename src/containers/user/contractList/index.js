import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import styles from './index.module.scss';
import { Button,Upload,message,Icon } from 'antd';
import Filter from '@/component/Filter';
import Table from '@/component/table';
import domain from  '@/config';
import Cookie from "@/component/cookie.js"
const commonUrl = domain.domain;
class ContractList extends Component {
    constructor(props) {
        super(props);
        this.state={
            search:'', //搜索
            clientList:[{id:1}], //列表数据
            total:0,  //列表条目总数
            current:1,  //页码
            page_size:10,   //每页条目数
        }
    }
    onFilterChange(value,type){
        switch (type){
            case 'search':
                this.setState({ search:value},);
                break;
            case 'current':
                this.setState({ current:value},);
                break;
            case 'pageSize':
                this.setState({ page_size:value,current:1},);
                break;
        }
    };
    //查看客户详情
    information(text, record){
        // this.props.history.push('/ResourceList/'+record.id);

    }
    xz=()=>{
        window.open(commonUrl + '/Resource/downTemplate'+'?login_key='+Cookie.getCookie('login_key'));
        // fetch(commonUrl + '/Resource/downTemplate'+'?login_key='+Cookie.getCookie('login_key')).then(res => res.blob().then(blob => {
        //     let a = document.createElement('a');
        //     let url = window.URL.createObjectURL(blob);
        //     let filename = res.headers.get('Content-Disposition');
        //     if (filename) {
        //         filename = filename.match(/\"(.*)\"/)[1]; //提取文件名
        //         a.href = url;
        //         a.download = filename; //给下载下来的文件起个名字
        //         a.click();
        //         window.URL.revokeObjectURL(url);
        //         a = null;
        //     }
        // }));
    }
    render() {
        const{clientList,current,total,page_size}=this.state;
        let filterProps={   //设置条件搜索
            onChange:(value,type)=>this.onFilterChange(value,type),
            search:true,
            modulesData:[

            ]
        };
        const columns=[    //表头
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '合同编号',
                dataIndex: 'chinese_name',
            },
            {
                title: '客户名',
                dataIndex: 'main_phone',
            },
            {
                title: '移民国家',
                dataIndex: 'create_time',
            },
            {
                title: '项目',
                dataIndex: 'create_time1',
            },
            {
                title: '金额',
                dataIndex: 'create_time2',
            },
            {
                title: '签约时间',
                dataIndex: 'create_time3',
            },
            {
                title: '状态',
                dataIndex: 'create_time4',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <Button style={{marginRight:10}} onClick={()=>this.information(text, record)}>查看详情</Button>
                        <Button type="danger">删除</Button>
                    </span>
                ),
            }
        ];
        let newClientList = [];
        clientList.forEach((e,i)=>{
            newClientList.push({...e,key:(current-1)*10+i+1})
        });
        const props = {
            name: 'excel',
            action: commonUrl + '/SysConfig/tempImport',
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            data:{login_key:Cookie.getCookie('login_key')}
        };
        return (
            <div>
                <Filter {...filterProps}/>
                <div className={styles.body}>
                    <Table columns={columns}  onChange={(value,type)=>this.onFilterChange(value,type)}
                           current={current} total={total} pageSize={page_size}
                           tableData={newClientList}
                    />
                </div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                <Button onClick={this.xz}>下载</Button>
            </div>
        );
    }
}


export default ContractList;