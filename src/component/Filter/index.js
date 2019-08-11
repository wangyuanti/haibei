import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import moment from 'moment';
import styles from './index.module.scss'
import { Select,DatePicker,Input  } from 'antd';
import {message} from "antd/lib/index";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
class Filter extends Component {
    static defaultProps = {
        onChange:()=>{},//向父组件传值的函数
        modulesData:[],//选择器数组
        search:false, //搜索框
        minWidth:1110,     //组件的最小宽度
        marginRight:20,     //单个筛选框的右边距
        marginBottom:20,    //单个筛选框的下边距
        searchWidth:200,  //搜索框宽度
        newButton:<div></div>,//自定义按钮
    }
    constructor(props) {
        super(props);
        this.state={
            searchValue:'',
            companyList:[],
            staffList:[],
            countryList:[],
            projectList:[],
        }
    }
    componentDidMount(){
        const{modulesData}=this.props;
        let companyFilter,staffFilter,countryFilter,projectFilter,staffFilterType= undefined;
        modulesData.forEach(item=>{
            if(item.type==='companyFilter'){
                companyFilter = true;
            }
            if(item.type==='staffFilter'){
                staffFilter = true;
                staffFilterType = item.staffFilterType;
            }
            if(item.type==='countryFilter'){
                countryFilter = true;
            }
            if(item.type==='projectFilter'){
                projectFilter = true;
            }
        });
        if(companyFilter){
            this.getCompany();
        };
        if(staffFilter){
            // this.getStaff(staffFilterType)
        };
        if(countryFilter){
            this.getCountry();
        };
        if(projectFilter){
            this.getProject();
        }

    }
    //获取公司列表
    getCompany=()=>{
        request({
            url:'/company',
            method:'get',
        }).then((res)=>{
            if(res.response==='1'){
                this.setState({companyList:res.content});
            }else if(res.response==="0"){
                message.error(res.content);
            }
        })
    };
    //获取员工列表
    getStaff(staffFilterType){
        request({
            url:'/company',
            method:'get',
            data:{staffFilterType}
        }).then((res)=>{
            if(res.response==='1'){
                this.setState({staffList:res.content});
            }else if(res.response==="0"){
                message.error(res.content);
            }
        })
    };
    //获取国家列表
    getCountry=()=>{
        request({
            url:'/country',
            method:'get',
        }).then((res)=>{
            if(res.response==='1'){
                this.setState({countryList:res.content});
            }else if(res.response==="0"){
                message.error(res.content);
            }
        })
    };
    //获取项目列表
    getProject=()=>{
        request({
            url:'/items/all',
            method:'get',
        }).then((res)=>{
            if(res.response==='1'){
                this.setState({projectList:res.content});
            }else if(res.response==="0"){
                message.error(res.content);
            }
        })
    }
    //向父组件传值
    onChange(value,type){
        if(type==='search'){
            console.log(type);
            let qk = {};
            this.props.modulesData.forEach(e=>{
                qk[e.field]=undefined;
            });
            console.log(qk)
            this.setState({
                [type]:value,...qk},this.props.onChange(value,type));
        }else{
            this.setState({[type]:value,searchValue:''},this.props.onChange(value,type));
        }
    };
    //日期选择器
    onDateChange(date, dateString,type){
        this.onChange(dateString,type);
    }
    //搜索框Change
    searchChange=(e)=>{
        this.setState({searchValue:e.target.value});
    };
    render() {
        const{search,minWidth,searchWidth,marginRight,marginBottom,newButton,modulesData}=this.props;
        const{searchValue,companyList,staffList,countryList,projectList}=this.state;
        let companyOption = companyList.map((e,i)=>(
            <Option value={e.id} key={e.name + i}>{e.name}</Option>
        ));
        let staffOption = staffList.map((e,i)=>(
            <Option value={e.id} key={e.name + i}>{e.name}</Option>
        ));
        let countryOption = countryList.map((e,i)=>(
            <Option value={e.id} key={e.name + i}>{e.name}</Option>
        ));
        let projectOption = projectList.map((e,i)=>(
            <Option value={e.id} key={e.name + i}>{e.name}</Option>
        ));
        let modules= modulesData.map((e,i)=>{
            let module = undefined;
            switch (e.type){
                case 'companyFilter':
                    module =
                        <div key={e.type+'_'+e.field} className={styles.oneFilter} style={{marginBottom}}>
                            <span style={{marginRight}}>{e.title}:</span>
                            <Select
                                showSearch
                                style={{ width: 120,marginRight}}
                                placeholder="请选择公司"
                                onChange={(value)=>this.onChange(value,e.field)}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={this.state[e.field]}
                            >
                                <Option value="">全部</Option>
                                {companyOption}
                            </Select>
                        </div>;
                            break;
                case 'staffFilter':
                    module=
                        <div key={e.type+'_'+e.field} className={styles.oneFilter} style={{marginBottom}}>
                            <span style={{marginRight}}>{e.title}:</span>
                            <Select
                                showSearch
                                style={{ width: 120 ,marginRight}}
                                placeholder="请选择人员"
                                onChange={(value)=>this.onChange(value,e.field)}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={this.state[e.field]}
                            >
                                <Option value="">全部</Option>
                                {staffOption}
                            </Select>
                        </div>;
                                break;
                case 'countryFilter':
                    module=
                        <div key={e.type+'_'+e.field} className={styles.oneFilter} style={{marginBottom}}>
                            <span style={{marginRight}}>{e.title}:</span>
                            <Select
                                showSearch
                                style={{ width: 180 ,marginRight}}
                                placeholder="请选择国家"
                                onChange={(value)=>this.onChange(value,e.field)}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={this.state[e.field]}
                            >
                                <Option value="">全部</Option>
                                {countryOption}
                            </Select>
                        </div>;
                    break;
                case 'projectFilter':
                    module=
                        <div key={e.type+'_'+e.field} className={styles.oneFilter} style={{marginBottom}}>
                            <span style={{marginRight}}>{e.title}:</span>
                            <Select
                                showSearch
                                style={{ width: 300,marginRight}}
                                placeholder="请选择项目"
                                onChange={(value)=>this.onChange(value,e.field)}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={this.state[e.field]}
                            >
                                <Option value="">全部</Option>
                                {projectOption}
                            </Select>
                        </div>;
                    break;
                case 'dateFilter':
                    module=
                        <div key={e.type+'_'+e.field} className={styles.oneFilter} style={{marginBottom}}>
                            <span style={{marginRight}}>{e.title}:</span>
                            <RangePicker onChange={(date, dateString)=>this.onDateChange(date, dateString,e.field)}
                                         value={(this.state[e.field]&&this.state[e.field][0]&&this.state[e.field][1])
                                             ?[moment(this.state[e.field][0]), moment(this.state[e.field][1])]:[]}
                                         style={{ marginRight }}/>
                        </div>;
                    break;
            }
            return module;
        });
        return (
            <div style={{minWidth}}>
                <div className={styles.filterUp}>
                    <div>
                        {newButton}
                    </div>
                    <div>
                        {
                            search?
                            <Search
                                style={{ width:searchWidth ,marginBottom}}
                                placeholder="请输入搜索内容"
                                enterButton="搜索"
                                onSearch={(value)=>this.onChange(value,'search')}
                                onChange={this.searchChange}
                                value={searchValue}
                            />
                            :''
                        }
                    </div>
                </div>
                <div className={styles.filterDown}>
                    {modules}
                </div>
            </div>
        );
    }
}


export default Filter;