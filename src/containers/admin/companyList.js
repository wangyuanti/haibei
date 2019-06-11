import React , { Component } from 'react';
import { Button,Table, Divider, message,Modal,Input } from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';

const { TextArea } = Input;
class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state={
            companyList:[], //公司列表
            visible: false, //弹窗开关
            modalTitle:'',  //弹窗标题
            loading: false, //等待开关
            oneInfo:{},  //单条公司数据
        }
    }
    componentDidMount(){
        this.getList();
    }
    //获取公司列表
    getList=()=>{
        request({
            url:'/company',
            method:'get',
        }).then((res)=>{
            console.log(res);
            if(res.response==="1"){
                this.setState({companyList:res.content})
            }
        })
    };
    //弹窗开启
    showModal(title){
        this.setState({
            visible: true,modalTitle:title
        });
    };
    //弹窗确认
    handleOk = e => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };
    //弹窗关闭
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //内容输入
    inputChange(e,type){
        let{oneInfo}=this.state;
        this.setState({oneInfo:{...oneInfo,[type]:e.target.value}});
    }
    render() {
        const columns = [{title: 'ID',dataIndex: 'id',},{title: '名称', dataIndex: 'name',},
            {title: '操作',key: 'action', render: (text, record) => (<span><Button type="primary">编辑</Button><Divider type="vertical" /><Button type="danger">删除</Button></span>)},
        ];
        let{companyList,modalTitle,visible,loading,oneInfo} = this.state;
        let newCompanyList = companyList.map((e,i)=>{
            return {...e,key:i}
        });
        return (
           <div>
               <div className={styles.header}>
                   <Button type="primary" icon="plus" size='large' style={{width:'100px'}} onClick={()=>this.showModal('添加新公司')}>添加</Button>
                   <Modal
                       title={modalTitle}
                       visible={visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                       footer={[
                           <Button key="back" onClick={this.handleCancel}>
                               取消
                           </Button>,
                           <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                               确定
                           </Button>,
                       ]}
                   >
                       <div className={styles.modalRow}>
                           <span className={styles.modalRowTitle}>名称：</span>
                           <Input placeholder="公司名称"  onChange={(e)=>this.inputChange(e,'name')} value={oneInfo.name}/>
                       </div>
                       <div className={styles.modalRow}>
                           <span className={styles.modalRowTitle} style={{alignSelf:'flex-start',paddingTop:5}}>简介：</span>
                           <TextArea placeholder="公司简介" autosize={{ minRows: 2, maxRows: 8 }} onChange={(e)=>this.inputChange(e,'content')} value={oneInfo.content}/>
                       </div>
                   </Modal>
               </div>
               <div  className={styles.body}>
                   <Table columns={columns} dataSource={newCompanyList} bordered />
               </div>

           </div>
        );
    }
}


export default CompanyList;