import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import {   } from 'antd';
import Breadcrumbs from '@/component/Breadcrumb';
import styles from './index.module.scss';
import { withRouter } from 'react-router-dom';

class ContractInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:props.match.params.id,

        }
    }

    render() {
        return (
            <div>
                <Breadcrumbs />
            </div>
        );
    }
}


export default withRouter(ContractInfo);