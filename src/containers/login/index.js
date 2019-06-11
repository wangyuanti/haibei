import React , { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, message} from 'antd';
import * as Actions from './actions';
import {connect} from 'react-redux';
import styles from './index.module.scss';
import request from '@/ajax/helper.js';
import Cookie from "@/component/cookie.js"
message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
});
class Login extends Component {
    //点击登录
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let identity=this.props.history.location.pathname=='/login'?2:1;
                request({
                    url:'/login',
                    method:'post',
                    data:{...values,identity}
                }).then((res)=>{
                    if(res.response==="1"){
                        message.success('登录成功');
                        this.props.addUserInfo(res.content);
                        Cookie.setCookie('login_key', res.content.login_key);
                        Cookie.setCookie('id', res.content.id);
                        Cookie.setCookie('nick_name', res.content.nick_name);
                        Cookie.setCookie('avatar', res.content.avatar);
                        if(identity==2){
                            this.props.history.push('/');
                        }else if(identity==1){
                            this.props.history.push('/admin/CompanyList');
                        }
                    }else{
                        message.error(res.content);
                    }
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.bodyBox}>
                <div className={styles.loginBox}>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Item>
                            {getFieldDecorator('login_name', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入手机号"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

LoginForm.propTypes = {
    addUserInfo: PropTypes.func.isRequired,
};


function mapStateToProps(state, ownProps) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        addUserInfo: (userInfo) => {
            dispatch(Actions.addUserInfo(userInfo));
        },

    }
}
export default connect(null, mapDispatchToProps)(LoginForm);
