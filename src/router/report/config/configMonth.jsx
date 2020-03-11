export default {
    tooltip : {
        trigger: 'axis'
    },

    toolbox: {
        show : false,
    },
    textStyle:{
        color: '#8EC7DC'
    },
    xAxis : [
        {
            type : 'category',
            data : ['微店','员福','爱行销','E保通','赠险','交银人寿','卡中心']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'趋势图',
            type:'bar',
            stack: '总量',
            data: [1140, 550, 660, 90, 150, 390, 120],
        },
    ]
}
