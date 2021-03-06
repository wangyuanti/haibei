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
//动态路由页面
import ResourceListChild from './resourceListChild'
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        let {groupId} = this.props.userInfo;
        let key =document.cookie.indexOf('login_key=');
        if(key === -1){
            message.error('请先登录!');
            this.props.history.push('/admin/login');
            return
        }
        if(groupId!==1){
            message.error('请先登录!');
            this.props.history.push('/admin/login');
            return
        }
    }
    render() {
        console.log(this.props);
        //导航路由列表
        let routeList=[
            {path:"/admin/CompanyList",component:CompanyList,name:'公司列表',ico:CompanyListIco},
            {path:"/admin/CompetenceList",component:CompetenceList,name:'权限列表',ico:CompetenceListIco},
            {path:"/admin/UserGroupList",component:UserGroupList,name:'用户组列表',ico:UserGroupListIco},
            {path:"/admin/UserList",component:UserList,name:'用户列表',ico:UserListIco},
            {path:"/admin/LogList",component:LogList,name:'操作日志',ico:LogListIco},
            {path:"/admin/countryList",component:CountryList,name:'国家列表',ico:countryListIco},
            {path:"/admin/projectList",component:ProjectList,name:'项目列表',ico:ProjectListIco},
            {path:"/admin/CaseList",component:CaseList,name:'案子列表',ico:CaseListIco},
            {path:"/admin/ResourceList",component:ResourceList,exact:true,name:'资源列表',ico:ResourceListIco},
            {path:"/admin/FeeTypeList",component:FeeTypeList,name:'费用类型',ico:FeeTypeListIco},
            {path:"/admin/ClientSourceList",component:ClientSourceList,name:'客户来源',ico:ClientSourceListIco},
            {path:"/admin/ResourcePoolDeploy",component:ResourcePoolDeploy,name:'资源池配置',ico:ResourcePoolDeployIco},

        ];
        //二级路由列表
        let routeChildList=[
            {path:"/admin/ResourceList/add",component:ResourceListChild},
        ];
        let newRouteList=routeList.map((e,i)=>{
            return <Route path={e.path}  component={e.component} key={e.path} exact={e.exact}/>
        });
        let newRouteChildList=routeChildList.map((e,i)=>{
            return <Route path={e.path}  component={e.component} key={e.path} exact={e.exact}/>
        })
        return (
            <div>
                <Header path='/admin'/>
                <div className={styles.navAndBody}>
                    <Nav navList={routeList}/>
                    <div className={styles.body}>
                        <Switch>
                            {newRouteList}
                            {newRouteChildList}
                            <Redirect path="/admin" to={{pathname: '/admin/login'}} />
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
