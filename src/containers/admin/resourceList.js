import React , { Component } from 'react';
import { Table,  message,Spin,Button,Popconfirm,Divider,Input,Icon,DatePicker } from 'antd';
import styles from './list.module.scss';
import request from '@/ajax/helper.js';
import moment from 'moment';

const Search = Input.Search;
const { RangePicker,} = DatePicker;
class ResourceList extends Component {
    constructor(props) {
        super(props);
        this.state={
            page:1,        //列表页码
            limit:10,      //列表每页显示数
            listInfo:[],   //显示列表
            total:0,      //列表项总数
            dataLoading:false, //数据请求Loading
            SearchInfo:{search:'',country_id:'',items_id:'',start_time:'',end_time:''}, //搜索条件
            CountryAndProjectList:[],   //国家与项目
            projectList:[],  //项目列表
        }
    }
    componentDidMount(){
        this.getList();
        this.getCountryAndProject();
    }
    //获取案子列表
    getList=()=>{
        let{page,limit,SearchInfo}=this.state;
        this.setState({dataLoading:true},()=>{
            request({
                url:'/items/signingItems',
                method:'post',
                data:{...SearchInfo,page_num:page,page_size:limit,}
            }).then((res)=>{
                if(res.response===1){
                    let list = res.content.map((e,i)=>{
                        return {...e,key:(page-1)*10+i+1}
                    });
                    this.setState({listInfo:list,total:res.all_count,dataLoading:false})
                }else if(res.response==="0"){
                    this.setState({dataLoading:false});
                    message.error(res.content);
                }
            })
        })
    };
    //获取国家项目
    getCountryAndProject=()=>{
        request({
            url:'/items',
            method:'get',
        }).then((res)=>{
            if(res.response==='1'){
                this.setState({CountryAndProjectList:res.content})
            }else if(res.response==="0"){
                message.error(res.content);
            }
        })
    }
    //修改每页显示数
    onShowSizeChange(current, pageSize){
        this.setState({limit:pageSize},this.getList)
    }
    //页码跳转
    onJumpChange(pageNumber) {
        this.setState({page:pageNumber},this.getList)
    }
    //输入搜索
    SearchChange(e){
        let{SearchInfo}=this.state;
        this.setState({SearchInfo:{...SearchInfo,search:e.target.value}})
    }
    //搜索
    Search(value){
        this.setState({SearchInfo:{search:value,country_id:'',items_id:'',start_time:'',end_time:''}},this.getList);
    }
    //点击国家
    changeCountryItem(e){
        let{SearchInfo}=this.state;
        this.setState({projectList:e.items,SearchInfo:{...SearchInfo,country_id:e.id,items_id:'',search:''}},this.getList)
    }
    //点击项目
    changeProjectItem(e){
        let{SearchInfo}=this.state;
        this.setState({SearchInfo:{...SearchInfo,items_id:e.id,search:''}},this.getList)
    }
    //点击全部
    allItem(type){
        let{SearchInfo}=this.state;
        switch (type){
            case 'country_id':
                this.setState({SearchInfo:{...SearchInfo,items_id:'',country_id:'',search:''},projectList:[]},this.getList);
                break;
            case 'items_id':
                this.setState({SearchInfo:{...SearchInfo,items_id:'',search:''}},this.getList);
                break;
        }
    }
    // 选择时间区间
    onDateChange(date, dateString) {
        let {SearchInfo}=this.state;
        this.setState({SearchInfo:{...SearchInfo,search:'',start_time:dateString[0],end_time:dateString[1]}},this.getList)
    }
    addInfo=()=>{
        this.props.history.push('/admin/ResourceList/add');
    }
    render() {
        let{listInfo,total,page,dataLoading,CountryAndProjectList,projectList,SearchInfo} = this.state;
        let columns = [ {title: '序号',dataIndex: 'key'},{title: '名称',dataIndex: 'name'},
            {title: '状态',dataIndex: 'status',render:(text)=>(<span>{text?'可用':'禁用'}</span>)},
            {title: '操作',key: 'action',
                render: (text, record) => (<div>
                    <Button type="primary">编辑</Button>
                    <Divider type="vertical" />
                    <Button type="danger" >删除</Button>
                </div>)},
        ];
        let countryList = CountryAndProjectList.map((e,i)=>{
            return <li key={e.id} className={SearchInfo.country_id ===e.id?styles.countryItemOk+ ' '+styles.countryItem:styles.countryItem}
                       onClick={()=>this.changeCountryItem(e)}>{e.name}</li>

        });
        let newProjectList = projectList.map((e,i)=>{
            return <li key={e.id} className={SearchInfo.items_id ===e.id?styles.countryItemOk+ ' '+styles.countryItem:styles.countryItem}
                       onClick={()=>this.changeProjectItem(e)}>{e.name}</li>
        });
        return (
            <div>
                <div className={styles.header}>
                    <Button type="primary" icon="plus" size='large' style={{width:'100px'}} onClick={this.addInfo}>添加</Button>
                    <Search placeholder="请输入搜索内容" onSearch={value =>this.Search(value)} onChange={(e)=>this.SearchChange(e)}
                            enterButton='搜索' style={{width:270}} size="large" value={SearchInfo.search}/>
                </div>
                <div  className={styles.body}>
                    <div className={styles.filterBox}>
                        <div className={styles.filterHeader}><span><Icon type="filter" /> 条件筛选</span><Button type="link" size='large'>清空筛选条件</Button></div>
                        <div className={styles.filterBody}><span className={styles.filterTitle}>国家：</span>
                            <ul className={styles.countryList}>
                                <li className={SearchInfo.country_id ===''?styles.countryItemOk+ ' '+styles.countryItem:styles.countryItem}
                                    onClick={()=>this.allItem('country_id')}>全部</li>
                                {countryList}
                            </ul>
                        </div>
                        <div className={styles.filterBody}><span className={styles.filterTitle}>项目：</span>
                            <ul className={styles.countryList}>
                                <li className={SearchInfo.items_id ===''?styles.countryItemOk+ ' '+styles.countryItem:styles.countryItem}
                                    onClick={()=>this.allItem('items_id')}>全部</li>
                                {newProjectList}
                            </ul>
                        </div>
                        <div className={styles.filterBody} style={{alignItems: 'center',marginBottom:36}}>
                            <span className={styles.filterTitle}>时间：</span>
                            <RangePicker onChange={(date, dateString)=>this.onDateChange(date, dateString)} style={{marginLeft:19}}
                                         value={SearchInfo.start_time&&SearchInfo.end_time!==0?[moment(SearchInfo.start_time), moment(SearchInfo.end_time)]:[]}/>
                        </div>
                    </div>
                    <Spin spinning={dataLoading}>
                        <Table columns={columns} dataSource={listInfo} bordered
                               rowClassName={(record,index) => index % 2===0?styles.oddRow:styles.evenRow }
                               pagination={{total,showSizeChanger:true,onShowSizeChange:(current, pageSize)=>this.onShowSizeChange(current, pageSize),
                                   showQuickJumper:true,onChange:(pageNumber)=>this.onJumpChange(pageNumber),current:page}}
                        />
                    </Spin>
                </div>

            </div>
        );
    }
}


export default ResourceList;