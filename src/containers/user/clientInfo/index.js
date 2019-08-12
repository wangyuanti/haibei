import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import { Button } from 'antd';
import Breadcrumbs from '@/component/Breadcrumb'
class ClientInfo extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <div>
                <Breadcrumbs />
                123456
            </div>
        );
    }
}


export default ClientInfo;