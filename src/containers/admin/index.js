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
import CompanyList from './companyList';
import LogList from './logList';
import CountryList from './countryList';
import ProjectList from './projectList';
import CompetenceList from './competenceList';
import UserGroupList from './userGroupList';
import FeeTypeList from './feeTypeList';
import ClientSourceList from './clientSourceList';
import ResourcePoolDeploy from './resourcePoolDeploy';
import CaseList from './caseList';
import ResourceList from './resourceList'
//nav图标
import UserListIco from '@/img/userList.png';
import CompanyListIco from '@/img/companyList.png';
import LogListIco from '@/img/log.png';
import countryListIco from '@/img/country.png';
import  ProjectListIco from '@/img/project.png';
import  CompetenceListIco from '@/img/competence.png';
import  UserGroupListIco from '@/img/userGroup.png';
import  FeeTypeListIco from '@/img/feeType.png';
import  ClientSourceListIco from '@/img/clientSource.png';
import ResourcePoolDeployIco from '@/img/resourcePool.png';
import CaseListIco from '@/img/case.png';
import ResourceListIco from  '@/img/resourceList.png'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        let key =document.cookie.indexOf('login_key=');
        if(key === -1){
            message.error('请先登录!');
            this.props.history.push('/admin/login');
            return
        }
    }
    render() {
        console.log(this.props);
        //导航列表
        let navList=[
            {path:'/admin/CompanyList',name:'公司列表',ico:CompanyListIco,exact:false},
            {path:'/admin/CompetenceList',name:'权限列表',ico:CompetenceListIco,exact:false},
            {path:'/admin/UserGroupList',name:'用户组列表',ico:UserGroupListIco,exact:false},
            {path:'/admin/UserList',name:'用户列表',ico:UserListIco,exact:false},
            {path:'/admin/LogList',name:'操作日志',ico:LogListIco,exact:false},
            {path:'/admin/countryList',name:'国家列表',ico:countryListIco,exact:false},
            {path:'/admin/projectList',name:'项目列表',ico:ProjectListIco,exact:false},
            {path:'/admin/CaseList',name:'案子列表',ico:CaseListIco,exact:false},
            {path:'/admin/ResourceList',name:'资源列表',ico:ResourceListIco,exact:false},
            {path:'/admin/FeeTypeList',name:'费用类型',ico:FeeTypeListIco,exact:false},
            {path:'/admin/ClientSourceList',name:'客户来源',ico:ClientSourceListIco,exact:false},
            {path:'/admin/ResourcePoolDeploy',name:'资源池配置',ico:ResourcePoolDeployIco,exact:false},


        ];
        //路由列表
        let routeList=[
            {path:"/admin/CompanyList",component:CompanyList},
            {path:"/admin/CompetenceList",component:CompetenceList},
            {path:"/admin/UserGroupList",component:UserGroupList},
            {path:"/admin/UserList",component:UserList},
            {path:"/admin/LogList",component:LogList},
            {path:"/admin/countryList",component:CountryList},
            {path:"/admin/projectList",component:ProjectList},
            {path:"/admin/CaseList",component:CaseList},
            {path:"/admin/ResourceList",component:ResourceList},
            {path:"/admin/FeeTypeList",component:FeeTypeList},
            {path:"/admin/ClientSourceList",component:ClientSourceList},
            {path:"/admin/ResourcePoolDeploy",component:ResourcePoolDeploy},

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
