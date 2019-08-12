import React , { Component } from 'react';
import request from '@/ajax/helper.js';
import { Table,Button } from 'antd';
import styles from './index.module.scss';
class Filter extends Component {
    static defaultProps = {
        columns:[    //表头
            {
                title: '序号',
                dataIndex: 'key',
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => (
                    <span>
                        <Button>查看详情</Button>
                        <Button type="danger">删除</Button>
                    </span>
                ),
            }
        ],
        tableData:[  //表格数据
            {key:1},{key:2},{key:3},{key:11},{key:21},{key:31},{key:12},{key:22},{key:33},{key:121},{key:222},{key:333},
        ],
        bordered:true, //表格是否有边框
        current:2,      //当前页码
        total:100,        //表格数据总数
        showSizeChanger:true,//是否开启切换每页显示条数
        pageSize:10,    //每页条数
        showQuickJumper:true, //是否开启跳转页码
    };
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount(){

    }
    //切换每页显示条数
    onShowSizeChange=(current, size,type)=>{
        this.props.onChange(size,type)
    };
    //跳转页码
    change=(current, size,type)=>{
        this.props.onChange(current,type)
    };
    render() {
        let{columns,tableData,bordered,total,current,pageSize,showQuickJumper,showSizeChanger}=this.props;
        return (
            <div>
                <Table columns={columns} dataSource={tableData}  bordered={bordered}
                       pagination={{total,current,pageSize, showSizeChanger,showQuickJumper,
                            onShowSizeChange:(current, size)=>this.onShowSizeChange(current, size,'pageSize'),
                            onChange:(current, size)=>this.change(current, size,'current'),
                       }}
                       rowClassName={
                           (re,index)=>index%2===0?styles.ou:styles.ji
                       }
                />
            </div>
        );
    }
}


export default Filter;