import React , { Component } from 'react';
import { Table,  message, Spin, Button ,Divider, Popconfirm} from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';
import moment from 'moment';
class CompetenceList extends Component {
    constructor(props) {
        super(props);
        this.state={
            competenceList:[],   //权限列表
            dataLoading:false, //数据请求Loading
            page:1,        //列表页码
            limit:10,      //列表每页显示数
            total:0,      //列表项总数
        }
    }
    componentDidMount(){
        this.getList();
    }
    //获取项目列表
    getList=()=>{
        let{page,limit}=this.state;
        this.setState({dataLoading:true},()=>{
            request({
                url:'/astrict',
                method:'get',
                data:{p:page,limit}
            }).then((res)=>{
                if(res.response==="1"){
                    let list = res.content.map((e,i)=>{
                        return {...e,key:i+1}
                    });
                    this.setState({competenceList:list,dataLoading:false,total:res.all_count})
                }else if(res.response==="0"){
                    this.setState({dataLoading:false});
                    message.error(res.content);
                }
            })
        })
    };
    render() {
        const columns = [ {title: '序号',dataIndex: 'key'},{title: '权限名称',dataIndex: 'astrict_name'},
            {title: '操作',key: 'action',
                render: (text, record) => (<div>
                    <Button type="primary" >编辑</Button>
                    <Divider type="vertical" />
                    <Button type="danger" >删除</Button>
                    </div>)},];
        let{competenceList,dataLoading} = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <Button type="primary" icon="plus" size='large' style={{width:'100px'}}>添加</Button>
                </div>
                <div  className={styles.body}>
                    <Spin spinning={dataLoading}>
                        <Table columns={columns} dataSource={competenceList} bordered
                               rowClassName={(record,index) => index % 2===0?styles.oddRow:styles.evenRow }
                               pagination={false}
                        />
                    </Spin>
                </div>

            </div>
        );
    }
}


export default CompetenceList;