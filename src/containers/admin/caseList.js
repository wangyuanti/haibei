import React , { Component } from 'react';
import { Table,  message,Spin,Button,Popconfirm,Divider} from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';
import moment from 'moment';
class caseList extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,        //列表页码
            limit:10,      //列表每页显示数
            listInfo:[],   //显示列表
            total:0,      //列表项总数
            dataLoading:false, //数据请求Loading
        }
    }
    componentDidMount(){
        // this.getList();
    }
    //获取列表
    getList=()=>{
        let{page,limit}=this.state;
        this.setState({dataLoading:true},()=>{
            request({
                url:'/items/signingItems',
                method:'get',
                data:{page_num:page,page_size:limit}
            }).then((res)=>{
                if(res.response===1){
                    let list = res.content.map((e,i)=>{
                        return {...e,key:(page-1)*10+i+1}
                    });
                    this.setState({listInfo:list,total:res.all_count,dataLoading:false})
                }else if(res.response==="0"){
                    this.setState({dataLoading:false});
                    message.error(res.content);
                }
            })
        })
    };
    //修改每页显示数
    onShowSizeChange(current, pageSize){
        this.setState({limit:pageSize},this.getList)
    }
    onJumpChange(pageNumber) {
        this.setState({page:pageNumber},this.getList)
    }
    render() {
        const columns = [ {title: '序号',dataIndex: 'key'},{title: '名称',dataIndex: 'name'},
            {title: '状态',dataIndex: 'status',render:(text)=>(<span>{text?'可用':'禁用'}</span>)},
            {title: '操作',key: 'action',
                render: (text, record) => (<div>
                    <Button type="primary">编辑</Button>
                    <Divider type="vertical" />
                    <Button type="danger" >删除</Button>
                </div>)},
        ];
        let{listInfo,total,page,dataLoading} = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <Button type="primary" icon="plus" size='large' style={{width:'100px'}}>添加</Button>
                </div>
                <div  className={styles.body}>
                    <Spin spinning={dataLoading}>
                        <Table columns={columns} dataSource={listInfo} bordered
                               rowClassName={(record,index) => index % 2===0?styles.oddRow:styles.evenRow }
                               pagination={{total,showSizeChanger:true,onShowSizeChange:(current, pageSize)=>this.onShowSizeChange(current, pageSize),
                                   showQuickJumper:true,onChange:(pageNumber)=>this.onJumpChange(pageNumber),current:page}}
                        />
                    </Spin>
                </div>

            </div>
        );
    }
}


export default caseList;