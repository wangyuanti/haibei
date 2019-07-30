import React , { Component } from 'react';
import { DatePicker } from 'antd';
import EchersModule from '../../component/Echarts'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            data: [820, 932, 901, 934, 1290, 1330, 1320],
        }
    }
    dateChange=(date, dateString)=>{
        console.log(date, dateString);
    };
    ok=()=>{
        this.setState({data:[1,1,1,1,2,3,4]})
    }
    render() {
        const {data}=this.state;
        return (
            <div>
                <RangePicker onChange={this.dateChange} />
                <button onClick={this.ok}>变</button>
                <div style={{width:'30%',height:200}}>
                    <EchersModule data={data}/>
                </div>

            </div>
        );
    }
}


export default Home;