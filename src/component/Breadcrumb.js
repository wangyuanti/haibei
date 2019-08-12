import React , { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb} from 'antd';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
const breadcrumbNameMap = {
    '/userInfo': '个人中心',
    '/ResourceList': '资源列表',
    '/ResourceList/:id': '客户信息',
};

class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        const { location ,userInfo} = this.props;
        const re = /^[0-9]+.?[0-9]*$/;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            let url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            const urlEnd = url.split('/');
            if(re.test(urlEnd[urlEnd.length-1])){
                urlEnd.splice(urlEnd.length-1,1,':id');
                url = urlEnd.join('/');
                return (
                    <Breadcrumb.Item key={url}>
                        {breadcrumbNameMap[url]}
                    </Breadcrumb.Item>
                );
            }else{
                if(breadcrumbNameMap[url]){
                    return (
                        <Breadcrumb.Item key={url}>
                            <Link to={url}>{breadcrumbNameMap[url]}</Link>
                        </Breadcrumb.Item>
                    );
                }
            }


        });
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
                {userInfo.groupId===1?<Link to="/admin/CompanyList">首页</Link>:<Link to="/home">首页</Link>}
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