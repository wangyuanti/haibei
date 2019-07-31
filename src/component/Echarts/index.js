import React , { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
class EchersModule extends Component {
    constructor(props) {
        super(props);

        this.state={
            num:30,
        }
    }
    //默认的props
    static defaultProps={
        backgroundColor:'',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        title: '{b|这段文本采用样式b},{a|这段文本采用样式a}',
        textStyle:{
            color:'red',
            fontWeight:'normal',
            fontSize:16,
            rich: {
                a: {
                    color: 'red',
                    lineHeight: 10
                },
                b: {
                    color: '#222222',
                    height: 40
                },
            }
        }
    }
    componentDidMount() {

    }
    render() {
        const{data,title,textStyle,backgroundColor}=this.props;
        const option = {
            backgroundColor:backgroundColor,
            title:{
                text:title,
                textStyle:textStyle,

            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            tooltip:{
                show:true,
                trigger:'axis',
                backgroundColor:'rgba(36,122,242,1)',
                formatter:'{b}<br/>{c}',
                padding:[5,20,5,5]
            },
            series: [{
                data: data,
                type: 'line',
                areaStyle: {
                    color:{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
            }],
        };
        return (
            <ReactEcharts  option={option} style={{height:'200px',width:'100%'}}/>
        );
    }
}


export default EchersModule;