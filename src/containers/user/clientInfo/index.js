import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import { Tabs  } from 'antd';
import Breadcrumbs from '@/component/Breadcrumb';
import styles from './index.module.scss';
import Info from './info';
import Communication from './communication'
import { withRouter } from 'react-router-dom';
import NewInfo from './newInfo';
const { TabPane } = Tabs;
class ClientInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:props.match.params.id,

        }
    }
    callback(key) {
        console.log(key);
    }
    render() {
        let {id}=this.state;
        let info=<div>
                    <Breadcrumbs />
                    <div className={styles.body}>
                        <Tabs defaultActiveKey="2" onChange={this.callback} size={'large'}>
                            <TabPane tab="客户信息" key="1">
                                <Info />
                            </TabPane>
                            <TabPane tab="跟进状态日志" key="2">
                                <Communication />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>;
        return (
            <div>
                {id==='new'?<NewInfo />:info}
            </div>
        );
    }
}


export default withRouter(ClientInfo);