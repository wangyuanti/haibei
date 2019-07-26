import React , { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb} from 'antd';

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
        const { location } = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        console.log(pathSnippets)
        const identity=this.props.history.location.pathname=='/login'?2:1;
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            console.log(url)
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{breadcrumbNameMap[url]}</Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
                {identity===2?<Link to="/">首页</Link>:identity===1?<Link to="/admin/CompanyList">首页</Link>:''}
            </Breadcrumb.Item>,
        ].concat(extraBreadcrumbItems);
        return (
            <div>
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            </div>
        );
    }
}
export default withRouter(Breadcrumbs);