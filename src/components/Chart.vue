<template>
    <div class="charts">
        <!-- <div class="header">
            <div>
                <img src="../assets/images/logo.svg">
            </div>
        </div> -->
        <div class="max-width-container">
            <div class="charts-container">
                <div class="charts-head">
                    <div class="head-left">
                        <p>实时行情</p>
                        <div class="box-item-top">
                            <span class="title-one">{{moneyValue}}</span>
                            <span class="title-one">{{bid}}</span>
                            <span class="result" :class="{'down': currentRate < 0, 'up': currentRate > 0}">{{currentRate > 0 ? '+' : ''}}{{currentRate}}</span>
                        </div>
                    </div>
                    <div class="head-right">
                        <el-select v-model="timeValue" placeholder="请选择" @change="handleTimeChange">
                            <el-option
                            size="mini"
                            v-for="item in timeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="moneyValue" placeholder="请选择" @change="handleRateChange">
                            <el-option
                            size="mini"
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="charts-wrap">
                    <div id="main" style="width: 650px;height:300px;"></div>
                    <ul class="notice">
                        <!-- <li v-for="(item, index) in noticeList" :key="index" :class="{'red': item.noticeStatus, 'blue': !item.noticeStatus}">
                            <el-tooltip class="item" effect="dark" placement="top-end">
                                <div slot="content">
                                    <p>{{item.timestamp}}</p>
                                    <p>{{item.label}}</p>
                                    <p>{{item.txt}}</p>
                                </div>
                                <el-button class="predictNotice">
                                    <i class="el-icon-message-solid"></i></br>
                                    <i :class="{'el-icon-error': !item.noticeStatus, 'el-icon-success': item.noticeStatus}"></i>
                                </el-button>
                            </el-tooltip>
                        </li> -->
                    </ul>
                </div>
                <div  class="charts-controls">
                    <ul class="ul-item">
                        <li>
                           <div class="li-item-top">
                               <p class="rate-name">USD/JPY</p>
                               <p class="rate-res"><span class="res">{{usdjpy.bid}}</span><i :class="{'el-icon-caret-top': usdjpy.rate > 0, 'el-icon-caret-bottom': usdjpy.rate < 0}"></i><i :class="{'blue': usdjpy.rate < 0, 'red': usdjpy.rate > 0}">{{usdjpy.ratePrecent > 0 ? '+' : ''}}{{usdjpy.ratePrecent}}</i></p>
                               <span>{{usdjpy.rate > 0 ? '+' : ''}}{{usdjpy.rate}}</span>
                           </div>
                           <div class="li-item-bottom">
                               <span>高 <i>{{usdjpy.high}}</i></span>
                               <span>开 <i>{{usdjpy.open}}</i></span>
                               <span>低 <i>{{usdjpy.low}}</i></span>
                               <span>收 <i>{{usdjpy.close}}</i></span>
                           </div>
                        </li>
                        <li>
                           <div class="li-item-top">
                               <p class="rate-name">GBP/USD</p>
                               <p class="rate-res"><span class="res">{{gpbusd.bid}}</span><i :class="{'el-icon-caret-top': gpbusd.rate > 0, 'el-icon-caret-bottom': gpbusd.rate < 0}"></i><i :class="{'blue': gpbusd.rate < 0, 'red': gpbusd.rate > 0}">{{gpbusd.ratePrecent > 0 ? '+' : ''}}{{gpbusd.ratePrecent}}</i></p>
                               <span>{{gpbusd.rate > 0 ? '+' : ''}}{{gpbusd.rate}}</span>
                           </div>
                           <div class="li-item-bottom">
                               <span>高 <i>{{gpbusd.high}}</i></span>
                               <span>开 <i>{{gpbusd.open}}</i></span>
                               <span>低 <i>{{gpbusd.low}}</i></span>
                               <span>收 <i>{{gpbusd.close}}</i></span>
                           </div>
                        </li>
                        <li>
                           <div class="li-item-top">
                               <p class="rate-name">USD/CAD</p>
                               <p class="rate-res"><span class="res">{{usdcad.bid}}</span><i :class="{'el-icon-caret-top': usdcad.rate > 0, 'el-icon-caret-bottom': usdcad.rate < 0}"></i><i :class="{'blue': usdcad.rate < 0, 'red': usdcad.rate > 0}">{{usdcad.ratePrecent > 0 ? '+' : ''}}{{usdcad.ratePrecent}}</i></p>
                               <span>{{usdcad.rate > 0 ? '+' : ''}}{{usdcad.rate}}</span>
                           </div>
                           <div class="li-item-bottom">
                               <span>高 <i>{{usdcad.high}}</i></span>
                               <span>开 <i>{{usdcad.open}}</i></span>
                               <span>低 <i>{{usdcad.low}}</i></span>
                               <span>收 <i>{{usdcad.close}}</i></span>
                           </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="time-line-container">
                <basic-loading v-show="timelineStatus"></basic-loading>
                <div class="top-title">
                    <span>资讯信息</span>
                    <span>{{currentTime}}</span>
                </div>
                <el-timeline class="k-time-line">
                    <el-timeline-item placement="top" v-for="(item, index) in timeList"
                    :key="index"
                    :timestamp="item.timestamp">
                        <el-card>
                            <p>{{item.txt}}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
                 <div class="predict">
                    <ul>
                        <p>预测统计</p>
                        <li v-for="(item, index) in predictList" :key="index">
                            <span>{{item.date}}</span>
                            <span>准确率{{item.rate}}%</span>
                            <span>正确{{item.post}}个 错误{{item.neg}}个，共{{item.total}}个</span>
                        </li>
                    </ul>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
import BasicLoading from './Loading';

const echarts = require('echarts');
export default {
    name: 'charts',
    data() {
        return {
            input: '',
            timeList: [],
            timeOptions: [{
                value: '_1_min',
                label: '1分钟'
                }, {
                value: '_5_mins',
                label: '5分钟'
                }, {
                value: '_10_mins',
                label: '10分钟'
            }],
            timeValue: '1分钟',
            timelineStatus: true,
            typeOptions: [
                {
                    value: 'EUR/USD',
                    label: 'EUR/USD'
                },
                {
                    value: 'USD/JPY',
                    label: 'USD/JPY'
                },
                {
                    value: 'GBP/USD',
                    label: 'GBP/USD'
                },
                {
                    value: 'USD/CAD',
                    label: 'USD/CAD'
                },
                {
                    value: 'AUD/USD',
                    label: 'AUD/USD'
                }
            ],
            moneyValue: 'EUR/USD',
            myChart: '',
            baseUrl: 'ws:0dc55c5c.ngrok.io',
            rateStatus: 'EUR/USD',
            timeStatus: '_1_min',
            currentTime: '',
            currentRate: '0.0000',
            bid: '0',
            kData: [],
            usdjpy: {},
            gpbusd: {},
            usdcad: {},
            newsStatus: false,
            noticeList: [],
            predictList: []
        }
    },
    created() {
        this.updateNews();
        this.updateRate();
        this.formatTime();
        this.updateVerb();
        this.fetchPredict();
        this.updateIK();
    },
    methods: {
        formatTime() {
            setInterval(() => {
                const date = new Date()
                const month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
                const ss = date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`;
                this.currentTime = `${month}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${ss}`
            }, 1000);
        },
        calculateMA() {
            function calculateMA(dayCount, data) {
                var result = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += data[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            }
        },
        formateData() {
            const rawData = this.kData || [];
            let dates = [];
            let data = [];
            if (rawData.length > 0) {
                dates = rawData.map(function (item) {
                    return item[0];
                });
                data = rawData.map(function (item) {
                    return [+item[1], +item[2], +item[3], +item[4]];
                });
            }
            var option = {
                backgroundColor: '#212943',
                legend: {
                    data: ['日K', 'MA5', 'MA10'],
                    inactiveColor: '#777',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        animation: false,
                        type: 'cross',
                        lineStyle: {
                            color: '#376df4',
                            width: 2,
                            opacity: 1
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: dates,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: ['#373E61'],
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                yAxis: {
                    scale: true,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    splitLine: { show: false },
                    position: 'left',
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: ['#373E61'],
                            width: 1,
                            type: 'dashed'
                        }
                    }
                },
                grid: {
                    bottom: 80
                },
                animation: false,
                series: [
                    {
                        type: 'candlestick',
                        name: '日K',
                        data: data,
                        itemStyle: {
                            normal: {
                                color: '#1AC998', // 跌
                                color0: '#F25C62', // 涨
                                borderColor: '#1AC998',
                                borderColor0: '#F25C62'
                            }
                        },
                        markPoint: {
                            // symbol: 'path://M8.88888889,7.14995057 L9.44444444,7.14995057 C9.75126931,7.14995057 10,7.39868126 10,7.70550612 L10,8.24997528 C10,8.85750216 9.50750216,9.35 8.89997528,9.35 L1.10002472,9.35 C0.492497842,9.35 7.44005844e-17,8.85750216 0,8.24997528 L0,7.70550612 C-3.75752084e-17,7.39868126 0.248730695,7.14995057 0.555555556,7.14995057 L1.11132333,7.14995057 L1.11132333,4.98878278 C1.11132333,2.84106736 2.85239068,1.1 5.00010611,1.1 C7.14782153,1.1 8.88888889,2.84106736 8.88888889,4.98878278 L8.88888889,5.50766348 L8.88888889,7.14995057 Z',
                            symbolSize: 50,
                            label: {
                                show:true
                            },
                            data: this.noticeList,
                            tooltip: {
                                formatter: function (param) {
                                    return param.name.split('，').join('</br>');
                                }
                            },
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: this.calculateMA(5, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: this.calculateMA(10, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    }
                ],
                dataZoom: [{
                    textStyle: {
                        color: '#8392A5'
                    },
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    dataBackground: {
                        areaStyle: {
                            color: '#8392A5'
                        },
                        lineStyle: {
                            opacity: 0.8,
                            color: '#8392A5'
                        }
                    },
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }, {
                    type: 'inside'
                }]
            };
            
            return option;
        },
        initCharts() {
            this.myChart = echarts.init(document.getElementById('main'));
            // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
            this.myChart.setOption(this.formateData());
        },
        // 获取实时新闻
        updateNews() {
            // 打开新的websocket 连接
            const ws = new WebSocket(`${this.baseUrl}/ws/live`);
            ws.onopen = () => {
                this.timelineStatus = true;
            }
            ws.onerror = (error) => {
                this.$message.error(error);
                this.timelineStatus = false;
            }
            ws.onclose = () => {
                this.timelineStatus = false;
            }
            ws.onmessage = (res) => {
                this.newsStatus = true;
                this.timelineStatus = false;
                if (JSON.parse(res.data).timeList instanceof Array) {
                    this.timeList = JSON.parse(res.data).timeList;
                }
            }
        },
        // transformArr(orig) {
        //     var newArr = [],
        //         types = {},
        //         i, j, cur;
        //     for (i = 0, j = orig.length; i < j; i++) {
        //         cur = orig[i];
        //         if (!(cur.date in types)) {
        //             types[cur.date] = {type: cur.date, news: []};
        //         }
        //         types[cur.date].news.push(cur);
        //         if (newArr.indexOf(types[cur.date]) === -1) {
        //             newArr.push(types[cur.date]);
        //         }
        //     }
        //     console.dir(newArr);
        //     return newArr;
        // },
        // 获取k线数据
        updateIK() {
            const rate = this.moneyValue.split('/');
            const time = this.timeStatus;
            const url = `${this.baseUrl}/ws/historical?symbol=${rate[0]}&currency=${rate[1]}&endDateTime=&duration=3600&durationUnit=SECOND&barSize=${time}&keepUpToDate=true`;
            const ws = new WebSocket(url);
            const that = this;
            ws.onerror = (error) => {
                this.$message.error(error);
            }
            ws.onmessage = (res) => {
                const data = JSON.parse(res.data);
                const item = [];
                item.push(data.time);
                item.push(data.open);
                item.push(data.close);
                item.push(data.low);
                item.push(data.high);
                that.kData.push(item);
                for (var i = 0; i < that.timeList.length; i++) {
                    for (var j = 0; j < that.kData.length; j++) {
                        if (that.timeList[i].timestamp === that.kData[j][0]) {
                            if (that.timeList[i].label === '看涨') {
                                const temp1 = [];
                                temp1.push(that.timeList[i].timestamp);
                                temp1.push(that.kData[j][2]);
                                that.noticeList.push({
                                    name: that.timeList[i].txt.substring(0,20),
                                    coord: temp1,
                                    value: '涨',
                                    itemStyle: {
                                        normal: {color: '#F25C62'}
                                    }
                                }) 
                            }
                            if (that.timeList[i].label === '看跌') {
                                const temp1 = [];
                                temp1.push(that.timeList[i].timestamp);
                                temp1.push(that.kData[j][2]);
                                that.noticeList.push({
                                    name: that.timeList[i].txt.substring(0,20),
                                    coord: temp1,
                                    value: '跌',
                                    itemStyle: {
                                        normal: {color: '#1AC998'}
                                    }
                                }) 
                            }
                        }
                    }
                }
            }
        },
        // 获取实时汇率
        updateRate() {
            const rate = this.moneyValue.split('/');
            const wsurl = `${this.baseUrl}/ws/forex?symbol=${rate[0]}&currency=${rate[1]}`
            const ws = new WebSocket(wsurl);
            ws.onmessage = (res) => {
                const data = JSON.parse(res.data);
                this.currentRate = ((data.bid - data.close) / data.close).toFixed(4);
                this.bid = data.bid;
            }
            ws.onerror = (error) => {
                this.$message.error(error);
            }
        },
        handleTimeChange(value) {
            this.timeStatus = value;
            this.kData = [];
            this.updateIK();
        },
        handleRateChange(value) {
            this.kData = [];
            this.rateStatus = value;
            this.updateIK();
        },
        handleVerbUpdate(rate, item) {
            const wsurl = `${this.baseUrl}/ws/forex?symbol=${rate[0]}&currency=${rate[1]}`
            const ws = new WebSocket(wsurl);
            ws.onmessage = (res) => {
                const data = JSON.parse(res.data);
                if (data instanceof Object) {
                    this[item] = data;
                    this[item].rate = ((data.bid - data.close) / data.close).toFixed(4);
                    this[item].ratePrecent = `${(((data.bid - data.close) / data.close) * 100).toFixed(2)}%`;
                }
            }
            ws.onerror = (error) => {
                this.$message.error(error);
            }
        },
        updateVerb() {
            this.handleVerbUpdate(['USD', 'JPY'], 'usdjpy');
            this.handleVerbUpdate(['GBP', 'USD'], 'gpbusd');
            this.handleVerbUpdate(['USD', 'CAD'], 'usdcad');
        },
        fetchPredict() {
            const wsurl = `${this.baseUrl}/ws/analyse`
            const ws = new WebSocket(wsurl);
            ws.onmessage = (res) => {
                const data = JSON.parse(res.data);
                if (data instanceof Array) {
                    this.predictList = data;
                }
            }
        }

    },
    components: {
        BasicLoading
    },
    mounted() {
        this.initCharts();
        setInterval(() => {
            this.myChart.setOption(this.formateData());
            if (this.noticeList.length > 0) {
                var option =  this.myChart.getOption()
                option.series[0].markPoint.data.push(this.noticeList);
                this.myChart.setOption(option);
            }
        }, 1000)
    }
}
</script>

<style lang="scss">
    @import '@/assets/styles/global.scss';
    // elemnet reset
    .el-input__inner{
       background: none;
       border:1px solid rgba(55,62,97,1);
       color: #B0B9E4;
       width: 130px;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border-color: rgba(55,62,97,1);
    }
    .el-select .el-input__inner:focus{
        border-color: rgba(55,62,97,1);
    }
    .el-input__inner:hover{
        border-color: rgba(55,62,97,1);
    }
    .el-select-dropdown{
        background: #373E61;
        border: none;
    }
    .el-popper[x-placement^=bottom] .popper__arrow{
        display: none;
    }
    .el-select-dropdown__item{
        color: #B0B9E4;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background-color: #373E61;
    }
    .el-card{
        background: #2A3354;
        border-radius:2px;
        border: 1px solid #2A3354;
        color: #B0B9E4;
        line-height: 20px;
    }
    .el-timeline-item__tail{
        border-left: 2px dashed #676E8E;
    }
    .el-timeline-item__timestamp{
        color: #676E8E;
        font-size: 12px;
    }
    .el-timeline-item__node{
        background: #676E8E;
    }
    .el-timeline-item__node--normal{
        left: -5px;
        width: 20px;
        height: 20px;
    }
    .el-button{
        background: none;
        border: none;
        padding: 0;
        border-radius: 0;
    } 
    .el-button:focus, .el-button:hover{
        border-color: #212943;
        background-color: #212943;
    }
    .charts {
        width: 100%;
        height: 100vh;
        background: #151934;
        @include flex-box;
        flex-direction: column;
    }
    .header{
        background: #212943;
        height: 50px;
        width: 100%;
        >div{
            height: 50px;
            width: 50px;
            background: #2A3354;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 20px;
                height: auto;
                vertical-align: middle;
            }
        }
    }
    .max-width-container{
        flex: 1;
        padding: 10px 20px; 
        @include box-sizing(border-box);
        @include flex-box;
        flex-direction: row;
        height: 100%;
        overflow: hidden;
        .charts-container{
            @include flex-box;
            flex-direction: column;
            overflow: hidden;
            .charts-controls{
                height: 188px;
                margin-top: 10px;
                @include box-sizing(border-box);
                .ul-item{
                    height: 100%;
                    @include flex-box;
                    flex-direction: row;
                    justify-content: space-between;
                    li{
                        width: calc(33.33% - 7px);
                        background: #212943;
                        height: 100%;
                        padding: 10px;
                        @include box-sizing(border-box);
                    }
                }
            }
            .charts-wrap{
                flex: 1;
                background: #212943;
                .notice{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    padding: 10px 40px 0;
                    @include box-sizing(border-box);
                    li{
                        width: 20px;
                        margin-right: 20px;
                        &.red{
                            i{
                                color: #F76260;
                            }
                        }
                        &.blue{
                           i{
                                color: #00A699!important;
                            }
                        }
                    }
                }
            }
        }
        .time-line-container{
            position: relative;
            flex: 1;
            min-width: 400px;
            margin-left: 10px;
            @include flex-box;
            flex-direction: column;
            .top-title{
                background: #212943;
                @include box-sizing(border-box);
                padding: 20px;
                font-size:14px;
                color: #ffffff;
                span{
                    display: inline-block;
                    margin-right: 10px;
                    &:first-child{
                        color: #676E8E;
                    }
                }
            }
            .k-time-line{
                background: #212943;
                padding: 0 20px;
                @include box-sizing(border-box);
                flex: 1;
                overflow-y: auto;
            }
        }
    }
    .li-item-top{
        border-bottom: 1px dashed #373E61;
        padding-bottom: 15px;
        .rate-name{
            font-size:14px;
            margin-bottom: 10px;
            color:rgba(176,185,228,1);
        }
        .rate-res{
            font-size:18px;
            line-height:26px;
            color:rgba(255,255,255,1);
            margin-bottom: 6px;
            span{
                display: inline-block;
                width: 85px;
                color:rgba(255,255,255,1);
                font-size: 18px;
            }
            i{
                font-size:12px;
                font-style: normal;
                color: #676E8E;
                &.red, &.el-icon-caret-top{
                    color:rgba(242,92,98,1);
                }
                &.blue, &.el-icon-caret-bottom{
                    color: #1AC998;
                }
            }
        }
        span{
            font-size: 14px;
            color: #676E8E;
        }
    }
    .li-item-bottom{
        padding-top: 15px;
        @include flex-box;
        flex-direction: row;
        flex-wrap: wrap;
        span{
            width: 50%;
            font-size:12px;
            margin-bottom: 12px;
            i{
                font-style: normal;
                color:rgba(176,185,228,1);
            }
            color:rgba(103,110,142,1);
        }
    }
    .charts-head{
        @include flex-box;
        @include box-sizing(border-box);
        flex-direction: row;
        justify-content: space-between;
        background: #212943;
        padding: 20px 30px;
        .head-left{
            flex: 1;
            p{
                font-size:14px;
                color:rgba(103,110,142,1);
                line-height:20px;
                margin-bottom: 10px;
            }
            .box-item-top{
                margin-bottom: 6px;
            }
            .title-one{
                display: inline-block;
                font-size:18px;
                color:rgba(255,255,255,1);
                line-height:26px;
                margin-right: 40px;
            }
            .result{
                font-size:12px;
                line-height:20px;
                color: #fff;
                &.down{
                    color:rgba(26,201,152,1);
                }
                &.up{
                    color: #F25C62;
                }
            }
        }
    }
    .predict{
        height: 188px;
        width: 100%;
        padding-top: 10px;
        ul{
            height: 100%;
            background: #212943;
            padding: 10px;
            @include box-sizing(border-box);
            p{
                font-size:14px;
                color:rgba(103,110,142,1);
            }
            li{
                font-size: 12px;
                margin-top: 10px;
                background:rgba(42,51,84,1);
                border-radius:2px;
                padding: 14px 10px;
                @include box-sizing(border-box);
                span{
                    display: inline-block;
                    &:first-child{
                        color:rgba(176,185,228,1);
                        width: 80px;
                    }
                    &:nth-child(2){
                        color: #FFFFFF;
                        margin-right: 10px;
                    }
                    &:last-child{
                        color: #B0B9E4;
                    }
                }
            }
        }
    }
</style>
