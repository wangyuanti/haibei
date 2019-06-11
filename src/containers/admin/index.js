import React , { Component} from 'react';
import {  Route,Switch,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import styles from './index.module.scss';
import {connect} from 'react-redux';
import Nav from "@/component/nav";
import Header from '@/component/header';
import Cookie from "@/component/cookie.js";
import {message} from "antd";
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

    componentWillMount(){
        let key =document.cookie.indexOf('login_key=');
        if(key === -1){
            message.error('请先登录!');
            this.props.history.push('/admin/login');
            return
        }
    }

    render() {
        // console.log(this.props);
        //导航列表
        let navList=[
            {path:'/admin/CompanyList',name:'公司列表',ico:CompanyListIco,exact:false},
            {path:'/admin/UserList',name:'用户列表',ico:UserListIco,exact:false},
        ];
        //路由列表
        let routeList=[
            {path:"/admin/CompanyList",component:CompanyList},
            {path:"/admin/UserList",component:UserList},
        ];
        let newRouteList=routeList.map((e,i)=>{
            return <Route path={e.path}  component={e.component} key={e.path}/>
        })
        return (
            <div>
                <Header path='/admin'/>
                <div className={styles.navAndBody}>
                    <Nav navList={navList}/>
                    <div className={styles.body}>
                        <Switch>
                            {newRouteList}
                            <Redirect path="/admin" to={{pathname: '/admin/CompanyList'}} />
                        </Switch>

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
