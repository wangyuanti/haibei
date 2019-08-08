import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import moment from 'moment';
import { Select,DatePicker,Input  } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
class Filter extends Component {
    static defaultProps = {
        onChange:()=>{},//向父组件传值的函数
        companyFilter:false,//公司选择器
        countryFilter:false,//国家选择器
        projectFilter:false,//项目选择器
        staffFilter:false,//员工选择器
        search:false, //搜索框
        staffFilterType:'',//员工类别
        minWidth:1110,     //组件的最小宽度
        marginRight:20,     //单个筛选框的右边距
        marginBottom:20,    //单个筛选框的下边距
        searchWidth:200,  //搜索框宽度
    }
    constructor(props) {
        super(props);
        this.state={
            company:undefined,
            countryFilter:undefined,
            projectFilter:undefined,
            staffFilter:undefined,
            date:[],

        }
    }
    componentDidMount(){
    }

    //获取公司列表

    //向父组件传值
    onChange(value,type){
        this.setState({[type]:value},this.props.onChange(value,type));

    };
    //日期选择器
    onDateChange(date, dateString,type){
        this.onChange(dateString,type);
    }
    render() {
        const{companyFilter,countryFilter,projectFilter,staffFilter,minWidth,searchWidth,marginRight,marginBottom}=this.props;
        const{company,country,project,staff,date}=this.state;
        console.log(date)
        return (
            <div style={{minWidth}}>
                <div>
                    <Search
                        style={{ width:searchWidth ,marginBottom}}
                        placeholder="请输入搜索内容"
                        enterButton="搜索"
                        onSearch={(value)=>this.onChange(value,'search')}
                    />
                </div>
                <div>
                    {
                        companyFilter?
                            <Select
                                showSearch
                                style={{ width: 120,marginRight,marginBottom}}
                                placeholder="请选择公司"
                                onChange={(value)=>this.onChange(value,'company')}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={company}
                            >
                                <Option value="">全部</Option>
                                <Option value="1">Jack</Option>
                                <Option value="2">Lucy</Option>
                                <Option value="3">Tom</Option>
                            </Select>
                            :""
                    }
                    {
                        staffFilter?
                            <Select
                                showSearch
                                style={{ width: 120 ,marginRight,marginBottom}}
                                placeholder="请选择人员"
                                onChange={(value)=>this.onChange(value,'staff')}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={staff}
                            >
                                <Option value="">全部</Option>
                                <Option value="1">Jack</Option>
                                <Option value="2">Lucy</Option>
                                <Option value="3">Tom</Option>
                            </Select>

                            :""
                    }
                    {
                        countryFilter?
                            <Select
                                showSearch
                                style={{ width: 180 ,marginRight,marginBottom}}
                                placeholder="请选择国家"
                                onChange={(value)=>this.onChange(value,'country')}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={country}

                            >
                                <Option value="">全部</Option>
                                <Option value="1">Jack</Option>
                                <Option value="2">Lucy</Option>
                                <Option value="3">Tom</Option>
                            </Select>
                            :""
                    }
                    {
                        projectFilter?
                            <Select
                                showSearch
                                style={{ width: 220,marginRight,marginBottom}}
                                placeholder="请选择项目"
                                onChange={(value)=>this.onChange(value,'project')}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={project}
                            >
                                <Option value="">全部</Option>
                                <Option value="1">Jack</Option>
                                <Option value="2">Lucy</Option>
                                <Option value="3">Tom</Option>
                            </Select>
                            :""
                    }
                    <RangePicker onChange={(date, dateString)=>this.onDateChange(date, dateString,'date')}
                                 value={(date[0]&&date[1])?[moment(date[0]), moment(date[1])]:[]}
                                 style={{ marginRight,marginBottom }}/>
                </div>

            </div>
        );
    }
}


export default Filter;