import React , { Component } from 'react';
import { Menu, Icon ,Avatar,Dropdown} from 'antd';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import styles from './index.module.scss';
import Logo from '@/img/logo.png';
import url from  '@/config';
import Cookie from "@/component/cookie.js";
import {connect} from "react-redux";
class Header extends Component {
    tc=()=>{
        Cookie.deleteCookie('login_key','/admin')
        Cookie.deleteCookie('id','/admin')
        Cookie.deleteCookie('nick_name','/admin')
        Cookie.deleteCookie('avatar','/admin')
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    个人中心
                </Menu.Item>
                <Menu.Item>
                    <Link to='/admin/login' onClick={this.tc}>退出登录</Link>
                </Menu.Item>
            </Menu>
        );
        let imgUrl='' ;
        if(this.props.userInfo&&JSON.stringify(this.props.userInfo) !== "{}"){
            imgUrl=url.img +this.props.userInfo.avatar;
        }else {
            imgUrl=url.img +Cookie.getCookie('avatar');
        }
        return (
            <div className={styles.header}>
                <div><img src={Logo} alt=""/></div>
                <div className={styles.userInfo}>
                    <Avatar size={50} src={imgUrl} style={{marginRight:21}}/>
                    <Dropdown overlay={menu} className={styles.userInfoName}>
                        <div>
                            <span className={styles.nickName}>{Cookie.getCookie('nick_name')}</span><Icon type="caret-down" theme="filled"/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        );
    }
}


Header.propTypes = {
    userInfo:PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        userInfo:state.userInfo
    }
}
export default connect(mapStateToProps)(Header);;