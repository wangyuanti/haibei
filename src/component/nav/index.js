import React , { Component } from 'react';
import {NavLink} from "react-router-dom";
import styles from './index.module.scss';
import Ico from '@/component/ico';
import defaultImg from '@/img/default.png'
class Nav extends Component {
    static defaultProps = {
        navList:[{path:'/admin',name:'导航',ico:defaultImg,exact:false}]
    };
    render() {
        let newNavList = this.props.navList.map(e=>{
            return <NavLink to={e.path} key = {e.path}
                            activeStyle={{
                                backgroundColor:'#2458F2',
                                width:'130px'
                            }}>
                <Ico img={e.ico}/>
                <p>{e.name}</p>
            </NavLink>
        })
        return (
            <div className={styles.nav}>
                {newNavList}
            </div>
        );
    }
}


export default Nav;