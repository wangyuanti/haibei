import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import { withRouter } from 'react-router-dom';
import styles from './index.module.scss';
import { Button,Modal,DatePicker,Input,Row,Col   } from 'antd';
import Table from '@/component/table'
const { TextArea } = Input;
class Communication extends Component {
    constructor(props) {
        super(props);
        this.state={
            total:0,  //列表条目总数
            current:1,  //页码
            page_size:10,   //每页条目数
            visible: false,
            confirmLoading: false,
        }
    }
    componentDidMount(){
        const { match:{params:{ id}}} = this.props;
        console.log(id)
    };
    change(value,type){
        switch (type){
            case 'current':
                this.setState({ current:value});
                break;
            case 'pageSize':
                this.setState({ page_size:value,current:1});
                break;
        }
    };
    //弹窗开启
    showModal(id){
        this.setState({
            visible: true,
        });
    };

    //弹窗保存
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };
    //弹窗关闭
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    //时间
    onDateChange=(date, dateString,type) =>{
        console.log(date, dateString);
    };
    //修改state
    stateChange(value,type){

    }
    render() {
        const columns=[
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '上次沟通时间',
                dataIndex: 'time',
            },
            {
                title: '沟通内容',
                dataIndex: 'body',
            },
            {
                title: '沟通人员',
                dataIndex: 'people',
            },
            {
                title: '回访时间',
                dataIndex: 'date',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <Button style={{marginRight:20}} onClick={()=>this.showModal()}>查看详情</Button>
                        <Button type="danger">删除</Button>
                    </span>
                ),
            }
        ];
        const {current,total,page_size,visible, confirmLoading,} = this.state;
        let data={
            columns,current,total,pageSize:page_size,
            onChange:(value,type)=>this.change(value,type),
        };
        return (
            <div className={styles.infoBox}>
                <div style={{marginBottom:30}}>
                    <Button type="primary" style={{width:120}} onClick={()=>this.showModal()}> 添加</Button>
                </div>
                <Table {...data}/>
                <Modal
                    title="跟进状态日志"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    okText="保存"
                >
                    <div>
                        <Row className={styles.flexCenter +' '+ styles.marginBottom} >
                            <Col span={5}>上次沟通时间：</Col>
                            <Col span={19}><DatePicker onChange={(date, dateString)=>this.onChange(date, dateString)} style={{width:180}}/></Col>
                        </Row>
                        <Row className={styles.flexCenter+' '+ styles.marginBottom}>
                            <Col span={5}><span>回访时间：</span></Col>
                            <Col span={19}><DatePicker onChange={(date, dateString)=>this.onChange(date, dateString)} style={{width:180}}/></Col>
                        </Row>
                        <Row className={styles.flexCenter+' '+ styles.marginBottom}>
                            <Col span={5}><span>沟通人员：</span></Col>
                            <Col span={19}><Input placeholder="请输入沟通人员" style={{width:180}}/></Col>
                        </Row>
                        <Row className={styles.flexCenter+' '+ styles.marginBottom}>
                            <Col span={5} style={{alignSelf:'flex-start',lineHeight:'32px'}}><span>沟通内容：</span></Col>
                            <Col span={19}> <TextArea rows={8} placeholder="请输入沟通内容"/></Col>
                        </Row>
                    </div>
                </Modal>
            </div>
        );
    }
}


export default withRouter(Communication);