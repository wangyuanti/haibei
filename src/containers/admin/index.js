import React , { Component} from 'react';
import { BrowserRouter, Route,Switch,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import styles from './index.module.scss';
import {connect} from 'react-redux';
import Nav from "@/component/nav"
import Header from '@/component/header'
//子页面
import UserList from './userList';
import CompanyList from './companyList'
//nav图标
import UserListIco from '@/img/userList.png';
import CompanyListIco from '@/img/companyList.png';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {
        console.log(this.props);
        //导航列表
        let navList=[
            {path:'/admin/UserList',name:'用户列表',ico:UserListIco,exact:false},
            {path:'/admin/CompanyList',name:'公司列表',ico:CompanyListIco,exact:false},
        ];
        //路由列表
        let routeList=[
            {path:"/admin/UserList",component:UserList},
            {path:"/admin/CompanyList",component:CompanyList},
        ];
        let newRouteList=routeList.map((e,i)=>{
            return <Route path={e.path}  component={e.component} key={e.path}/>
        })
        return (
            <div>
                <Header />
                <div className={styles.navAndBody}>
                    <Nav navList={navList}/>
                    <div className={styles.body}>
                        {newRouteList}
                    </div>
                </div>
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
