import React , { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
class EchersModule extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount() {

    }
    render() {
        const{data}=this.props
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data,
                type: 'line'
            }]
        };
        return (
            <ReactEcharts  option={option} style={{height:'200px',width:'100%'}}/>
        );
    }
}


export default EchersModule;