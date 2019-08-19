import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import styles from './index.module.scss';
import { Button,Upload,message,Icon } from 'antd';
import Filter from '@/component/Filter';
import Table from '@/component/table';
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
        this.props.history.push('/ContractList/'+record.id);
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
        return (
            <div>
                <Filter {...filterProps}/>
                <div className={styles.body}>
                    <Table columns={columns}  onChange={(value,type)=>this.onFilterChange(value,type)}
                           current={current} total={total} pageSize={page_size}
                           tableData={newClientList}
                    />
                </div>
            </div>
        );
    }
}


export default ContractList;