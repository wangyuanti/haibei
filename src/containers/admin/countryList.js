import React , { Component } from 'react';
import { Table,  message,Spin} from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';
import moment from 'moment';
class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,        //列表页码
            limit:10,      //列表每页显示数
            countryList:[],   //国家列表
            total:0,      //列表项总数
            dataLoading:false, //数据请求Loading
        }
    }
    componentDidMount(){
        this.getList();
    }
    //获取国家列表
    getList=()=>{
        let{page,limit}=this.state;
        this.setState({dataLoading:true},()=>{
            request({
                url:'/country',
                method:'get',
                data:{page_num:page,page_size:limit}
            }).then((res)=>{
                if(res.response==="1"){
                    let list = res.content.map((e,i)=>{
                        return {
                            key:(page-1)*10+i+1,
                            create_time:moment(e.create_time*1000).format('YYYY-MM-DD HH:mm:ss'),
                            name:e.name,
                            items_num:e.items_num,
                        }
                    });
                    this.setState({countryList:list,total:res.all_count,dataLoading:false})
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
        const columns = [ {title: '序号',dataIndex: 'key'},{title: '国家',dataIndex: 'name'},{title: '项目数',dataIndex: 'items_num'},
            {title: '创建时间',dataIndex: 'create_time'}];
        let{countryList,total,page,dataLoading} = this.state;
        return (
            <div>
                <div  className={styles.body}>
                    <Spin spinning={dataLoading}>
                        <Table columns={columns} dataSource={countryList} bordered
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


export default CountryList;