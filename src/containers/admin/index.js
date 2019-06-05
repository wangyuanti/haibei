import React , { Component} from 'react';
import PropTypes from 'prop-types'
import styles from './index.module.scss';
import {connect} from 'react-redux';
import { Menu, Icon } from 'antd';
const { SubMenu }  = Menu;
class Admin extends Component {

    render() {
        console.log(this.props.userInfo)
        return (
            <div>
                    进来了哈啊啊啊啊啊啊啊啊啊啊啊啊
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
