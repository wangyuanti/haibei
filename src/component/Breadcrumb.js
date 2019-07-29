import React , { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb} from 'antd';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
const breadcrumbNameMap = {
    '/userInfo': '个人中心',
};

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        const { location ,userInfo} = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbNameMap[url]}</Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
                {userInfo.groupId===1?<Link to="/admin/CompanyList">首页</Link>:<Link to="/">首页</Link>}
            </Breadcrumb.Item>,
        ].concat(extraBreadcrumbItems);

        return (
            <div>
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        userInfo:state.userInfo
    }
}
export default withRouter(connect(mapStateToProps)(Breadcrumbs));