import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import moment from 'moment';
import { Button } from 'antd';
import Filter from '@/component/Filter';
import Table from '@/component/table';
import styles from './index.module.scss';
import {message} from "antd/lib/index";
class ResourceList extends Component {
    constructor(props) {
        super(props);
        this.state={
            date1:undefined,
            date2:undefined,
            search:'', //搜索
            clientList:[], //列表数据
            total:0,  //列表条目总数
            current:1,  //页码
            page_size:10,   //每页条目数
            pool:{},//资源池数据
            sort:3, //资源池
        }
    }
    componentDidMount(){
        this.getClientList();
    }
    //获取客户资源列表
    getClientList=()=>{
        const{search,current,page_size,sort}=this.state;
        let data={
            grade:3,
            search,
            info_sources_large_id:'',
            info_sources_small_id:'',
            country_id:'',
            start_num:'',
            sort,
            page_num:current,
            page_size
        };
        request({
            url:'/Resource/allList',
            method:'post',
            data:{...data}
        }).then((res)=>{
            if(res.response===1){
                this.setState({clientList:res.content,total:res.all_count[0].num,pool:res.num_data});
            }else if(res.response===0){
                message.error(res.content);
            }
        })
    };
    onFilterChange(value,type){
        switch (type){
            case 'date1':
                this.setState({ date1:value},this.getClientList);
                break;
            case 'date2':
                this.setState({ date2:value},this.getClientList);
                break;
            case 'search':
                this.setState({ search:value},this.getClientList);
                break;
            case 'current':
                this.setState({ current:value},this.getClientList);
                break;
            case 'pageSize':
                this.setState({ page_size:value,current:1},this.getClientList);
                break;
        }
    };
    //改变资源池
    setPool(num){
        this.setState({sort:num},this.getClientList);
    }
    //查看客户详情
    information(text, record){
        this.props.history.push('/ResourceList/'+record.id);

    }
    render() {
        const{clientList,current,total,page_size,pool,sort}=this.state;
        let filterProps={   //设置条件搜索
            newButton:<div>
                <Button type="primary" className={styles.newButton} onClick={()=>{this.props.history.push('/ResourceList/new');}}>录入资源</Button>
                <Button type="primary" className={styles.newButton}>批量导入资源</Button>
                <Button type="primary" className={styles.newButton}>下载资源模板</Button>
            </div>,
            onChange:(value,type)=>this.onFilterChange(value,type),
            search:true,
            modulesData:[
                {
                    type:'dateFilter',
                    field:'date1',
                    title:'客户创建时间'
                },
                {
                    type:'dateFilter',
                    field:'date2',
                    title:'计划入学时间'
                }
            ]
        };
        const columns=[    //表头
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '姓名',
                dataIndex: 'chinese_name',
            },
            {
                title: '电话',
                dataIndex: 'main_phone',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <Button style={{marginRight:10}} onClick={()=>this.information(text, record)}>查看详情</Button>
                        <Button type="primary"  style={{marginRight:10}}>签约</Button>
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
                    <div className={styles.pool}>
                        <div className={sort===3?styles.poolOne+' '+ styles.poolOneOk:styles.poolOne} onClick={()=>this.setPool(3)}>
                            <div>三级资源池</div>
                            <div className={styles.poolOneDown}><span>数量：</span><span className={styles.num}>{pool.three_num}/{pool.three_num_total}</span></div>
                        </div>
                        <div className={sort===2?styles.poolOne+' '+ styles.poolOneOk:styles.poolOne}  onClick={()=>this.setPool(2)}>
                            <div>二级资源池</div>
                            <div className={styles.poolOneDown}><span>数量：</span><span className={styles.num}>{pool.two_num}/{pool.two_num_total}</span></div>
                        </div>
                        <div className={sort===1?styles.poolOne+' '+ styles.poolOneOk:styles.poolOne}  onClick={()=>this.setPool(1)}>
                            <div>一级资源池</div>
                            <div className={styles.poolOneDown}><span>数量：</span><span className={styles.num}>{pool.one_num}/{pool.one_num_total}</span></div>
                        </div>
                        <div className={sort===4?styles.poolOne+' '+ styles.poolOneOk:styles.poolOne} onClick={()=>this.setPool(4)}>
                            <div>签约客户</div>
                            <div className={styles.poolOneDown}><span>数量：</span><span className={styles.num}>{pool.old_num}</span></div>
                        </div>
                        <div className={sort===5?styles.poolOne+' '+ styles.poolOneOk:styles.poolOne} onClick={()=>this.setPool(5)}>
                            <div>签约客户介绍</div>
                            <div className={styles.poolOneDown}><span>数量：</span><span className={styles.num}>{pool.recommend_num}</span></div>
                        </div>
                    </div>
                    <Table columns={columns}  onChange={(value,type)=>this.onFilterChange(value,type)}
                           current={current} total={total} pageSize={page_size}
                           tableData={newClientList}
                    />
                </div>
            </div>
        );
    }
}


export default ResourceList;