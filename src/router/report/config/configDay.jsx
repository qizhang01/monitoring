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
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['18:40','18:45','18:50','18:55','19:00','19:05','19:10','19:15']
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
            type:'line',
            stack: '总量',
            data: ['0.73','1.50','2.00','1.75','1.50','1.00','0.95','0.50'],
            smooth: true,
            lineStyle:{
                width: '3',
                type: 'solid',
                color: '#31D1E9'
            },
            areaStyle:{
                color: '#31D1E9',
                opacity: '0.2'
            }
        },
    ]
}

