import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import moment from 'moment';

import Filter from '@/component/Filter';
class ResourceList extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(){

    }
    render() {

        return (
            <div>
                <Filter />
            </div>
        );
    }
}


export default ResourceList;