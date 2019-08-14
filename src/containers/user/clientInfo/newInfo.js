import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import { withRouter } from 'react-router-dom';
import styles from './index.module.scss';
import Breadcrumbs from '@/component/Breadcrumb';
import { Row, Col,Input,Select,Button,DatePicker } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
class NewInfo extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        const { match:{params:{ id}}} = this.props;
    }
    //选择器
    handleChange=(value)=> {
        console.log(`selected ${value}`);
    };
    //日期选择器
    onChange=(date, dateString)=>{
        console.log(date, dateString);
    };
    render() {
        return (
            <div>
                <Breadcrumbs />
                <div className={styles.body}>
                    <div className={styles.infoBox}>
                        <div className={styles.infoOne}>
                            <div className={styles.infoOneTitle}>
                                <span className={styles.infoOneTitleImg}></span>
                                <span>基本信息</span>
                            </div>
                            <div className={styles.infoOneBody}>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                客户编号
                                            </Col>
                                            <Col span={18}>
                                                123465
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                姓名
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入姓名" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                手机号
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入手机号" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                性别
                                            </Col>
                                            <Col span={18}>
                                                <Select  style={{ width: 160 }} onChange={this.handleChange}>
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                年龄
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入年龄" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                所在地
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入所在地" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                客户星级
                                            </Col>
                                            <Col span={18}>
                                                <Select  style={{ width: 160 }} onChange={this.handleChange}>
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                VIP资源
                                            </Col>
                                            <Col span={18}>
                                                <Button type="primary" style={{marginRight:20}}>是</Button>
                                                <Button type="">否</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className={styles.infoOne}>
                            <div className={styles.infoOneTitle}>
                                <span className={styles.infoOneTitleImg}></span>
                                <span>留学相关信息</span>
                            </div>
                            <div className={styles.infoOneBody}>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                学历
                                            </Col>
                                            <Col span={18}>
                                                <Select  style={{ width: 160 }} onChange={this.handleChange}>
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                学校
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入学校" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                专业
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入专业" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                在校平均成绩
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入平均成绩" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                计划留学国家
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入国家" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                计划留学阶段
                                            </Col>
                                            <Col span={18}>
                                                <Select  style={{ width: 160 }} onChange={this.handleChange}>
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                计划入学时间
                                            </Col>
                                            <Col span={18}>
                                                <DatePicker onChange={this.onChange}  style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                计划申请专业
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入申请专业" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                留学预算
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入留学预算" style={{width:160,marginRight:30}}/><span>万元</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className={styles.infoOne}>
                            <div className={styles.infoOneTitle}>
                                <span className={styles.infoOneTitleImg}></span>
                                <span>其他信息</span>
                            </div>
                            <div className={styles.infoOneBody} style={{borderBottom: '0px solid #E5E5E5',marginBottom:20}}>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                信息来源
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入信息来源" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                出生日期
                                            </Col>
                                            <Col span={18}>
                                                <DatePicker onChange={this.onChange}  style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                家庭地址
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入家庭地址" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                微信号码
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入微信号码" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                邮箱号码
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入邮箱号码" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                现有海外身份
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入 现有海外身份" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                意向国家
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入意向国家" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                资产规模
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入资产规模" style={{width:160,marginRight:30}}/><span>万元</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                推荐人
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入推荐人" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                归属公司
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入归属公司" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                咨询
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入咨询" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={8}>
                                        <Row className={styles.flexCenter}>
                                            <Col span={6}>
                                                归属顾问
                                            </Col>
                                            <Col span={18}>
                                                <Input placeholder="请输入归属顾问" style={{width:240}}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={styles.infoOneBodyOne}>
                                    <Col span={16} >
                                        <Row className={styles.flexCenter}>
                                            <Col span={3} style={{alignSelf:'flex-start',lineHeight:'32px'}}>
                                                备注
                                            </Col>
                                            <Col span={21}>
                                                <TextArea rows={4} placeholder="请输入备注"/>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div style={{display:'flex',justifyContent: 'flex-end'}}>
                            <div>
                                <Button  type="primary" style={{width:120}}>保存</Button >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default withRouter(NewInfo);