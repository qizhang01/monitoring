export function Monthsbar() {
    return {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['趋势图']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
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
                data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
        ]
    }
}

export function Daysbar() {
    return {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['趋势图']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
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
                data:[120, 132, 101, 134, 90, 230, 210]
            },
        ]
    }
}
