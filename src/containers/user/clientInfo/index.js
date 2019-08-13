import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import { Tabs  } from 'antd';
import Breadcrumbs from '@/component/Breadcrumb'
import styles from './index.module.scss';
import Info from './info';
const { TabPane } = Tabs;
class ClientInfo extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <div>
                <Breadcrumbs />
                <div className={styles.body}>
                    <Tabs defaultActiveKey="1" onChange={this.callback} size={'large'}>
                        <TabPane tab="客户信息" key="1">
                           <Info />
                        </TabPane>
                        <TabPane tab="跟进状态日志" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}


export default ClientInfo;