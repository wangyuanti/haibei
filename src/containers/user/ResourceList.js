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
            ClearValue:(type)=>this.ClearValue(type),
            companyFilter:true,
            countryFilter:true,
            projectFilter:true,
            staffFilter:true,
            minWidth:1110,
        };
        return (
            <div>
                <Filter {...filterProps}/>
                {companyID}
                <button onClick={()=>this.ClearValue(true)}>aaaaaaaaaaa</button>
            </div>
        );
    }
}


export default ResourceList;