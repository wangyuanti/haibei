import React , { Component } from 'react';
import { Table,  message,Spin} from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';
import moment from 'moment';
class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,        //列表页码
            limit:10,      //列表每页显示数
            projectList:[],   //国家列表
            total:0,      //列表项总数
            dataLoading:false, //数据请求Loading
            iden:0,           //项目状态
        }
    }
    componentDidMount(){
        this.getList();
    }
    //获取项目列表
    getList=()=>{
        let{page,limit,iden}=this.state;
        this.setState({dataLoading:true},()=>{
            request({
                url:'/items/all',
                method:'get',
                data:{page_num:page,page_size:limit,iden}
            }).then((res)=>{
                if(res.response==="1"){
                    let list = res.content.map((e,i)=>{
                        return {
                            key:(page-1)*10+i+1,
                            create_time:moment(e.create_time*1000).format('YYYY-MM-DD HH:mm:ss'),
                            name:e.name,
                            country_name:e.country_name,
                            nick_name:e.nick_name,
                            status:e.status,
                            project_status:e.project_status,
                        }
                    });
                    this.setState({projectList:list,total:res.all_count,dataLoading:false})
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
        const columns = [ {title: '序号',dataIndex: 'key'},{title: '项目名称',dataIndex: 'name'},{title: '所属国家',dataIndex: 'country_name'},
            {title: '创建时间',dataIndex: 'create_time'},{title: '创建人',dataIndex: 'nick_name'},
            {title: '审核状态',dataIndex: 'status'},{title: '状态',dataIndex: 'project_status',render:(text)=>(<span>{text?'下架':'上架'}</span>)}];
        let{projectList,total,page,dataLoading} = this.state;
        return (
            <div>
                <div  className={styles.body}>
                    <Spin spinning={dataLoading}>
                        <Table columns={columns} dataSource={projectList} bordered
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


export default ProjectList;