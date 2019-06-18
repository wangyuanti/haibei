import React , { Component } from 'react';
import { Table,message,Spin,Button,Popconfirm,Divider,Modal,Input,Switch,Radio } from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';
import moment from 'moment';

const { TextArea } = Input;
class FeeTypeList extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,        //列表页码
            limit:10,      //列表每页显示数
            listInfo:[],   //用户列表
            oneInfo:{},  //单条费用数据
            loading: false, //等待开关
            total:0,      //列表项总数
            dataLoading:false, //数据请求Loading
            modalTitle:'',    //弹窗标题
            visible: false, //弹窗开关
        }
    }
    componentDidMount(){
        this.getList();
    }
    //获取用户组列表
    getList=()=>{
        let{page,limit}=this.state;
        this.setState({dataLoading:true},()=>{
            request({
                url:'/SysConfig/readListCost',
                method:'get',
                data:{p:page,limit:limit}
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
    //页面跳转
    onJumpChange(pageNumber) {
        this.setState({page:pageNumber},this.getList)
    }
    //弹窗开启
    showModal(title,fn){
        this.setState({
            visible: true,modalTitle:title,
        },fn);
    };
    //添加修改费用信息
    setInfo=()=>{
        let{oneInfo}=this.state;
        if(!("id" in oneInfo)){
            oneInfo.id='';
        }
        request({
            url:'/SysConfig/addCost',
            method:'post',
            data:{...oneInfo}
        }).then((res)=>{
            if(res.response===1){
                message.success(res.content);
                this.getList();
            }else if(res.response==="0"){
                message.error(res.content);
            }
        })
    }
    //弹窗确认
    handleOk(e){
        this.setState({ loading: true },this.setInfo);
    };
    //弹窗关闭
    handleCancel = e =>{
        this.setState({
            visible: false,
            oneInfo:{},
            loading: false
        });
    };
    //内容输入
    inputChange(e,type){
        let{oneInfo}=this.state;
        this.setState({oneInfo:{...oneInfo,[type]:e.target.value}});
    };
    //启用
    SwitchChange(type){
        let{oneInfo}=this.state;
       this.setState({oneInfo:{...oneInfo,status:type}});
    }
    //费用类型
    RadioChange = e => {
        let{oneInfo}=this.state;
        this.setState({oneInfo:{...oneInfo,type:e.target.value}});
    };
    render() {
        const columns = [ {title: '序号',dataIndex: 'key'},{title: '名称',dataIndex: 'name'},
            {title: '类别',dataIndex: 'type',render:(text)=>(<span>{text===1?'收款':'付款'}</span>)},
            {title: '状态',dataIndex: 'status',render:(text)=>(<span>{text?'可用':'禁用'}</span>)},
            {title: '操作',key: 'action',
                render: (text, record) => (<div>
                    <Button type="primary">编辑</Button>
                    <Divider type="vertical" />
                    <Button type="danger" >删除</Button>
                </div>)},
        ];
        let{listInfo,total,page,dataLoading,modalTitle,visible,oneInfo,loading} = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <Button type="primary" icon="plus" size='large' onClick={()=>this.showModal('添加')}>添加费用类型</Button>
                    <Modal
                        title={modalTitle}
                        visible={visible}
                        onOk={(e)=>this.handleOk(e)}
                        onCancel={this.handleCancel}
                        maskClosable={false}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={(e)=>this.handleOk(e)}>
                                确定
                            </Button>,
                        ]}
                    >
                        <div className={styles.modalRow}>
                            <span className={styles.modalRowTitle}>名称：</span>
                            <Input placeholder="费用名称"  onChange={(e)=>this.inputChange(e,'name')} value={oneInfo.name}/>
                        </div>
                        <div className={styles.modalRow}>
                            <span className={styles.modalRowTitle}>启用：</span>
                            <Switch checked={oneInfo.status} onChange={(e)=>this.SwitchChange(e)} />
                        </div>
                        <div className={styles.modalRow}>
                            <span className={styles.modalRowTitle}>类别：</span>
                            <Radio.Group onChange={this.RadioChange} value={oneInfo.type}>
                                <Radio value={1}>收款</Radio>
                                <Radio value={2}>付款</Radio>
                            </Radio.Group>
                        </div>

                        <div className={styles.modalRow}>
                            <span className={styles.modalRowTitle} style={{alignSelf:'flex-start',paddingTop:5}}>备注：</span>
                            <TextArea placeholder="费用备注" autosize={{ minRows: 2, maxRows: 8 }} onChange={(e)=>this.inputChange(e,'remarks')} value={oneInfo.remarks}/>
                        </div>
                    </Modal>
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


export default FeeTypeList;