import React , { Component } from 'react';
import { Table,  message,Spin} from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';
import moment from 'moment';
class LogList extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,        //列表页码
            limit:10,      //列表每页显示数
            logList:[],   //日志列表
            total:0,      //列表项总数
            dataLoading:false, //数据请求Loading
        }
    }
    componentDidMount(){
        this.getList();
    }
    //获取日志列表
    getList=()=>{
        let{page,limit}=this.state;
        this.setState({dataLoading:true},()=>{
            request({
                url:'/record',
                method:'post',
                data:{p:page,limit}
            }).then((res)=>{
                if(res.response==="1"){
                    let list = res.content.map((e,i)=>{
                        return {
                            key:(page-1)*10+i+1,
                            create_time:moment(e.create_time*1000).format('YYYY-MM-DD HH:mm:ss'),
                            name:e.user.nick_name,
                            company_name:e.company_name,
                            group:e.group,
                            content:e.content,
                        }
                    });
                    this.setState({logList:list,total:res.allCount,dataLoading:false})
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
        const columns = [ {title: '序号',dataIndex: 'key'},{title: '时间',dataIndex: 'create_time'},{title: '用户',dataIndex: 'name'},
            {title: '公司',dataIndex: 'company_name'},{title: '身份',dataIndex: 'group'},{title: '操作记录',dataIndex: 'content'}];
        let{logList,total,page,dataLoading} = this.state;
        return (
            <div>
                <div  className={styles.body}>
                    <Spin spinning={dataLoading}>
                        <Table columns={columns} dataSource={logList} bordered
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


export default LogList;