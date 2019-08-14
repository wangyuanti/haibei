import React , { Component} from 'react';
import {  Route,Switch,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import styles from './index.module.scss';
import {connect} from 'react-redux';
import Nav from "@/component/nav";
import Header from '@/component/header';
import {message} from "antd";
import UserInfo from '@/containers/userInfo';

//页面
import Home from './home';
import ResourceList from './ResourceList/ResourceList';
import ClientInfo from './clientInfo';
//图标
import CompanyListIco from '@/img/companyList.png';
import ResourceListIco from  '@/img/resourceList.png'

class User extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        let key =document.cookie.indexOf('login_key=');
        if(key === -1){
            message.error('请先登录!');
            this.props.history.push('/login');
            return
        }
    }
    render() {
        console.log(this.props);
        //导航路由
        let routeList=[
            {path:'/home',name:'公司列表',ico:CompanyListIco,component:Home},
            {path:"/ResourceList",component:ResourceList,exact:true,name:'资源列表',ico:ResourceListIco}
        ];
        let routeChildList=[
            {path:"/ResourceList/:id",component:ClientInfo},
        ];

        let newRouteList=routeList.map((e,i)=>{
            return <Route path={e.path}  component={e.component} key={e.path} exact={e.exact}/>
        });
        let newRouteChildList=routeChildList.map((e,i)=>{
            return <Route path={e.path}  component={e.component} key={e.path} exact={e.exact}/>
        });
        return (
            <div>
                <Header path='/'/>
                <div className={styles.navAndBody}>
                    <Nav navList={routeList}/>
                    <div className={styles.body}>
                        <div className={styles.bodyBox}>
                            <Switch>
                                {newRouteList}
                                {newRouteChildList}
                                <Route path="/userInfo" component={UserInfo} />
                                <Redirect from="/*" to={{pathname: '/login'}} />
                            </Switch>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
User.propTypes = {
    userInfo:PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        userInfo:state.userInfo
    }
}
export default connect(mapStateToProps)(User);;
