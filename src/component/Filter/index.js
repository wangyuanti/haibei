import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import moment from 'moment';
import { Select } from 'antd';
const { Option } = Select;
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(){

    }
    //获取公司列表

    onChange=(value)=>{
        console.log(`selected ${value}`);
    };

    render() {

        return (
            <div>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择公司"
                    onChange={this.onChange}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="">全部</Option>
                    <Option value="1">Jack</Option>
                    <Option value="2">Lucy</Option>
                    <Option value="3">Tom</Option>
                </Select>
            </div>
        );
    }
}


export default Filter;