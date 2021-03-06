import React , { Component } from 'react';
import { Button,Table, Divider, message,Modal,Input,Popconfirm,Spin} from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';
import InjectUnmount from '@/component/unmount';
const { TextArea } = Input;
@InjectUnmount
class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state={
            companyList:[], //公司列表
            visible: false, //弹窗开关
            modalTitle:'',  //弹窗标题
            loading: false, //等待开关
            oneInfo:{},  //单条公司数据
            handleOkType:'',//弹窗回调类型
            dataLoading:false, //数据请求Loading
            page:1,        //列表页码
            limit:10,      //列表每页显示数
            total:0,      //列表项总数
        }
    }
    componentDidMount(){
        this.getList();
    }
    //获取公司列表
    getList=()=>{
        let{page,limit}=this.state;
        this.setState({dataLoading:true},()=>{
            request({
                url:'/company',
                method:'get',
                data:{p:page,limit}
            }).then((res)=>{
                if(res.response==="1"){
                    this.setState({companyList:res.content,dataLoading:false,total:res.all_count})
                }else if(res.response==="0"){
                    this.setState({dataLoading:false})
                    message.error(res.content);
                }
            })
        })

    };
    //添加单条公司信息
    addOneInfo=()=>{
        let{oneInfo,page,limit}=this.state;
        request({
            url:'/company',
            method:'post',
            data:{...oneInfo,p:page,limit},
        }).then((res)=>{
            if(res.response==="1"){
                this.setState({ loading: false, visible: false ,companyList:res.content,oneInfo:{},total:res.all_count});
            }else if(res.response==="0"){
                message.error(res.content);
                this.setState({ loading: false});
            }
        })
    }
    //获取单条公司信息
    getOneInfo(info){
        request({
            url:'/company/'+info.id,
            method:'get',
        }).then((res)=>{
            if(res.response==="1"){
                this.setState({oneInfo:{name:res.content.name,content:res.content.content,id:res.content.id}})
            }else if(res.response==="0"){
                message.error(res.content);
            }
        })
    };
    //修改公司信息
    setOneInfo=()=>{
        let{oneInfo,page,limit}=this.state;
        request({
            url:'/company/update/'+oneInfo.id,
            method:'post',
            data:{...oneInfo,p:page,limit},
        }).then((res)=>{
            console.log(res);
            if(res.response==="1"){
                this.setState({ loading: false, visible: false,companyList:res.content,oneInfo:{},total:res.all_count});
            }else if(res.response==="0"){
                message.error(res.content);
                this.setState({ loading: false});
            }
        })
    };
    //删除公司
    deleteOneInfo=()=>{
        let{oneInfo,page,limit}=this.state;
        request({
            url:'/company/delete/'+oneInfo.id,
            method:'get',
            data:{p:page,limit},
        }).then((res)=>{
            if(res.response==="1"){
                this.setState({companyList:res.content,oneInfo:{},total:res.all_count});
                message.success('删除成功');
            }else if(res.response==="0"){
                message.error(res.content);
            }
        })
    };
    //弹窗开启
    showModal(title,fn,handleOkType){
        this.setState({
            visible: true,modalTitle:title,handleOkType
        },fn);
    };
    //弹窗确认
    handleOk(e){
        let fn = ()=>{};
        let{handleOkType}=this.state;
        switch (handleOkType){
            case 'add':
                fn = this.addOneInfo;
                break;
            case 'upData':
                fn = this.setOneInfo;
                break;
        };
        this.setState({ loading: true },fn);
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
    //气泡框确认
    confirm(e) {
        this.deleteOneInfo()
    };
    //气泡框取消
    cancel(e) {
        message.error('取消删除');
    };
    //修改每页显示数
    onShowSizeChange(current, pageSize){
        this.setState({limit:pageSize},this.getList)
    }
    onJumpChange(pageNumber) {
        this.setState({page:pageNumber},this.getList)
    }
    render() {
        const columns = [{title: '序号',dataIndex: 'key',},{title: '名称', dataIndex: 'name',},
            {title: '操作',key: 'action',
                render: (text, record) => (<div>
                    <Button type="primary" onClick={()=>this.showModal('修改公司信息',()=>this.getOneInfo(text),'upData')}>编辑</Button>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="确定删除公司吗？"
                        onConfirm={(e)=>this.confirm(e)}
                        onCancel={(e)=>this.cancel(e)}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button type="danger" onClick={()=>this.getOneInfo(text)}>删除</Button>
                  </Popconfirm></div>)},
        ];
        let{companyList,modalTitle,visible,loading,oneInfo,dataLoading,page,total} = this.state;
        let newCompanyList = companyList.map((e,i)=>{
            return {...e,key:(page-1)*10+i+1}
        });
        return (
           <div>
               <div className={styles.header}>
                   <Button type="primary" icon="plus" size='large' style={{width:'100px'}} onClick={()=>this.showModal('添加新公司', null,'add')}>添加</Button>
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
                           <Input placeholder="公司名称"  onChange={(e)=>this.inputChange(e,'name')} value={oneInfo.name}/>
                       </div>
                       <div className={styles.modalRow}>
                           <span className={styles.modalRowTitle} style={{alignSelf:'flex-start',paddingTop:5}}>简介：</span>
                           <TextArea placeholder="公司简介" autosize={{ minRows: 2, maxRows: 8 }} onChange={(e)=>this.inputChange(e,'content')} value={oneInfo.content}/>
                       </div>
                   </Modal>
               </div>
               <div  className={styles.body}>
                   <Spin spinning={dataLoading}>
                    <Table columns={columns} dataSource={newCompanyList} bordered rowClassName={(record,index) => index % 2===0?styles.oddRow:styles.evenRow }
                           pagination={{total,showSizeChanger:true,onShowSizeChange:(current, pageSize)=>this.onShowSizeChange(current, pageSize),
                               showQuickJumper:true,onChange:(pageNumber)=>this.onJumpChange(pageNumber),current:page}}/>
                   </Spin>
               </div>

           </div>
        );
    }
}


export default CompanyList;