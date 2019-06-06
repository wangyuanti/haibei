import React , { Component} from 'react';
import PropTypes from 'prop-types'
import styles from './index.module.scss';
import {connect} from 'react-redux';
import { Menu, Icon ,Avatar} from 'antd';
import Logo from '@/img/logo.png';
import url from  '@/config';
import Cookie from "@/component/cookie.js"
const { SubMenu }  = Menu;
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {
        console.log(this.props);
        let imgUrl='' ;
        if(this.props.userInfo&&JSON.stringify(this.props.userInfo) !== "{}"){
            console.log(1)
            imgUrl=url.img +this.props.userInfo.avatar;
        }else {
            console.log(2)
            imgUrl=url.img +Cookie.getCookie('avatar')
        }
        console.log(imgUrl,Cookie.getCookie('avatar'));
        return (
            <div>
                <div className={styles.header}>
                    <div><img src={Logo} alt=""/></div>
                    <div>
                        <Avatar size={50} src={imgUrl} />
                    </div>
                </div>
                <div></div>
            </div>

        );
    }
}
Admin.propTypes = {
    userInfo:PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        userInfo:state.userInfo
    }
}
export default connect(mapStateToProps)(Admin);;
