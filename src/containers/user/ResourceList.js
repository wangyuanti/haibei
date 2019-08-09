import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import moment from 'moment';

import Filter from '@/component/Filter';
class ResourceList extends Component {
    constructor(props) {
        super(props);
        this.state={
            companyID:undefined,
        }
    }
    componentDidMount(){

    }

    onFilterChange(value,type){
        switch (type){
            case 'company':
                this.setState({ companyID:value});
                break;

        }
    };
    render() {
        const{companyID}=this.state;
        let filterProps={   //设置条件搜索
            onChange:(value,type)=>this.onFilterChange(value,type),
            search:true,
            modulesData:[
                {
                    type:'companyFilter',
                    field:'company',
                    title:'国家'
                },
                {
                    type:'projectFilter',
                    field:'project',
                    title:'项目'
                },
                {
                    type:'dateFilter',
                    field:'dateFilter1',
                    title:'时间1'
                },
                {
                    type:'dateFilter',
                    field:'dateFilter2',
                    title:'时间2'
                }

            ]
        };
        return (
            <div>
                <Filter {...filterProps}/>
                {companyID}
            </div>
        );
    }
}


export default ResourceList;