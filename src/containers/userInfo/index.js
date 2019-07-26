import React , { Component } from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Breadcrumbs from '@/component/Breadcrumb'
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    go=()=>{
        this.props.history.goBack();
    }
    render() {
        // const { location } = this.props;
        // const pathSnippets = location.pathname.split('/').filter(i => i);
        return (
            <div>
                userInfo
            </div>
        );
    }
}

UserInfo.propTypes = {
    userInfo:PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        userInfo:state.userInfo
    }
}
export default connect(mapStateToProps)(UserInfo);