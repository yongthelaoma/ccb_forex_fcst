<template>
    <div class="charts">
        <div v-show="activeIndex === 0" class="max-width-container">
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
                <div class="indicate-box">
                    <ul class="indicate">
                        <li>
                            <img src="../assets/images/predict-up.png">涨
                        </li>
                        <li>
                            <img src="../assets/images/predict-down.png">跌
                        </li>
                        <li>
                            <img src="../assets/images/predict-wrong.png">错
                        </li>
                    </ul>
                </div>
                <div class="charts-wrap" id="chartsWrap">
                    <div id="main" style="width: 550px;height:300px;"></div>
                </div>
                <div  class="charts-controls">
                    <p class="rate-title">实时汇率</p>
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
                <!-- <basic-loading v-show="timelineStatus"></basic-loading> -->
                <div class="top-title">
                    <span>资讯信息</span>
                    <span>{{currentTime}}</span>
                </div>
                <div class="k-time-line" id="kTimeLine" @mouseenter="handleMouseenter" @mouseleave="handleLeave">
                    <el-timeline id="scrollBox">
                        <el-timeline-item placement="top" v-for="(item, index) in timeList"
                        :key="index"
                        :color="item.color"
                        :timestamp="item.timestamp">
                            <el-card>
                                <p>
                                <i v-if="item.label === '横盘'" class="el-icon-caret-right">【{{item.label}}】</i>
                                <i v-if="item.label !== '横盘'" :class="{'el-icon-caret-top': item.label === '看涨', 'el-icon-caret-bottom': item.label === '看跌'}">【{{item.label}}】</i>
                                {{item.txt}}</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
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
        <div v-show="activeIndex === 1" class="max-width-container common-bg-box">
            产品说明
        </div>
        <div v-show="activeIndex === 2" class="max-width-container common-bg-box">
            原理说明
        </div>
        <div class="header">
            <ul>
                <li @click="handleTab(index)" :class="{'active': activeIndex === index}" v-for="(item, index) in navList" :key="index">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import BasicLoading from './Loading';
import moment from 'moment'

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
            baseUrl: 'ws:b45fe909.ngrok.io',
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
            predictList: [],
            navList: ['财经事件监控', '产品说明', '原理说明'],
            activeIndex: 0,
            reverseStatus: true,
            timeOut: '',
            area: '',
            maxHeight: 0,
            speed: 50,
            delay: 0,
            containerHeight: 0,
            scrollStatus: false,
            //  表示当前是5分钟一根k线
            timeGape: 1,
            wsNews: '',
            wsK: ''
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
        reGroup(date) {
            const times = new Date(date);
            // 转化成毫秒
            let seconeds = times.getTime();
            // 2、获取当前的分钟
            const minutes = times.getMinutes();
            // 将当前时间归到对应的时间段下
            if (minutes % this.timeGape !== 0) {
                let addMinutes = this.timeGape - minutes % this.timeGape;
                seconeds = seconeds + addMinutes * 60 * 1000;
                const newDate = new Date(seconeds);
                const year = newDate.getFullYear();
                const month = newDate.getMonth() + 1 >= 10 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`;
                const dd =  newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
                const hh = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
                const mm = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
                return `${year}-${month}-${dd} ${hh}:${mm}:00`;
            } else {
                return date;
            }
        },
        handleTab(index) {
            this.activeIndex = index;
        },
        formatTime(date, fmt) {
            setInterval(() => {
                const date = new Date()
                const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
                const ss = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
                this.currentTime = `${month}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes()}:${ss}`
            }, 1000)
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
                backgroundColor: '#111111',
                // legend: {
                //     data: ['日K', 'MA5', 'MA10'],
                //     inactiveColor: '#777',
                //     textStyle: {
                //         color: '#fff'
                //     }
                // },
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
                toolbox: {
                    show: false
                },
                series: [
                    {
                        type: 'candlestick',
                        name: '日K',
                        data: data,
                        itemStyle: {
                            normal: {
                                color: '#F25C62', // 跌
                                color0: '#1AC998', // 涨
                                borderColor: '#F25C62',
                                borderColor0: '#1AC998'
                            }
                        },
                        markPoint: {
                            // symbol: 'path://M10.8888889,7.14995057 L11.4444444,7.14995057 C11.7512693,7.14995057 12,7.39868126 12,7.70550612 L12,8.24997528 C12,8.85750216 11.5075022,9.35 10.8999753,9.35 L3.10002472,9.35 C2.49249784,9.35 2,8.85750216 2,8.24997528 L2,7.70550612 C2,7.39868126 2.24873069,7.14995057 2.55555556,7.14995057 L3.11132333,7.14995057 L3.11132333,4.98878278 C3.11132333,2.84106736 4.85239068,1.1 7.00010611,1.1 C9.14782153,1.1 10.8888889,2.84106736 10.8888889,4.98878278 L10.8888889,5.50766348 L10.8888889,7.14995057 Z',
                            symbolSize: 40,
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
            this.wsNews = new WebSocket(`${this.baseUrl}/ws/live`);
            const that = this;
            this.wsNews.onopen = () => {
                this.timelineStatus = true;
            }
            this.wsNews.onerror = (error) => {
                this.$message.error(error);
                this.timelineStatus = false;
            }
            this.wsNews.onclose = () => {
                this.timelineStatus = false;
            }
            this.wsNews.onmessage = (res) => {
                // 更新新闻时，清空定时器
                if (this.scrollStatus) {
                    this.area.scrollTop = 0;
                    clearTimeout(this.timeOut);
                    clearInterval(this.time);
                }
                this.newsStatus = true;
                this.timelineStatus = false;
                if (JSON.parse(res.data).timeList instanceof Array) {
                    that.timeList = JSON.parse(res.data).timeList;
                    // that.timeList = [
                    //     {
                    //         label: "看涨",
                    //         score: "56.4158082008",
                    //         timestamp: "2019-05-13 16:42:00",
                    //         txt: "日本政府下调称，基于同步指标的下调来看，日本经济在恶化，此为2013年1月来首",
                    //     },
                    //     {
                    //         label: "看跌",
                    //         score: "56.4158082008",
                    //         timestamp: "2019-05-13 16:34:00",
                    //         txt: "日本政府下调称，基于同步指标的下调来看，日本经济在恶化，此为2013年1月来首",
                    //     },
                    //     {
                    //         label: "横盘",
                    //         score: "56.4158082008",
                    //         timestamp: "2019-05-13 16:20:00",
                    //         txt: "日本政府下调称，基于同步指标的下调来看，日本经济在恶化，此为2013年1月来首",
                    //     },
                    //     {
                    //         label: "看涨",
                    //         score: "56.4158082008",
                    //         timestamp: "2019-05-13 16:50:00",
                    //         txt: "分数低",
                    //     },
                    //     {
                    //         label: "看涨",
                    //         score: "57.4158082008",
                    //         timestamp: "2019-05-13 16:50:00",
                    //         txt: "分数高",
                    //     }
                    // ]
                    if (that.timeList.length > 0 && that.scrollStatus) {
                        that.maxHeight = document.getElementById("scrollBox").offsetHeight;
                        if (that.maxHeight > 0) {
                            that.scrollStatus = false;
                            that.timeOut = setTimeout(() => {
                                that.starMove();
                            }, that.delay)
                        }
                    }
                    that.timeList.map((item) => {
                        item.fmtime = this.reGroup(item.timestamp);
                        if (item.label === '看涨') {
                            that.reverseStatus === true ? item.label = '看跌' : item.label = '看涨'
                            that.reverseStatus === true ? item.color = '#1AC998' : item.color = '#F25C62';
                        } else if (item.label === '看跌') {
                            that.reverseStatus === true ? item.label = '看涨' : item.label = '看跌'
                            that.reverseStatus === true ? item.color = '#F25C62' : item.color = '#1AC998';
                        }
                    })
                    
                    const newData = [];
                    const timeAsse = [];
                    for (let i = 0; i < that.timeList.length; i++) {
                        if (timeAsse.indexOf(that.timeList[i].fmtime) === -1) {
                            newData.push(that.timeList[i]);
                            timeAsse.push(that.timeList[i].fmtime);
                        } else {
                            if (that.timeList[timeAsse.indexOf(that.timeList[i].fmtime)].score < that.timeList[i].score) {
                                newData[timeAsse.indexOf(that.timeList[i].fmtime)] = that.timeList[i];
                            }
                        }
                    }
                    that.timeList = newData;
                }
            }
        },
        // 获取k线数据
        updateIK() {
            const rate = this.moneyValue.split('/');
            const time = this.timeStatus;
            const url = `${this.baseUrl}/ws/historical?symbol=${rate[0]}&currency=${rate[1]}&endDateTime=&duration=3600&durationUnit=SECOND&barSize=${time}&keepUpToDate=true`;
            this.wsK = new WebSocket(url);
            const that = this;
            this.wsK.onerror = (error) => {
                this.$message.error(error);
            }
            this.wsK.onmessage = (res) => {
                const data = JSON.parse(res.data);
                const item = [];
                item.push(data.time);
                item.push(data.open);
                item.push(data.close);
                item.push(data.low);
                item.push(data.high);
                that.kData.push(item);
                that.noticeList = [];
                for (var i = 0; i < that.timeList.length; i++) {
                    for (var j = 0; j < that.kData.length; j++) {
                        if (that.timeList[i].fmtime === that.kData[j][0]) {
                            const temp = [];
                            temp.push(that.timeList[i].fmtime);
                            temp.push(that.kData[j][2]);
                            let color = '';
                            let bubble = '';
                            const newBubble = {
                                name: that.timeList[i].txt.substring(0,20),
                                coord: temp,
                                value: bubble,
                                itemStyle: {
                                    normal: { color }
                                }
                            }
                            if (that.kData[j+1][2] - that.kData[j][2] > 0.0005) {
                                // 当前预测正确
                                newBubble.itemStyle.normal.color = that.timeList[i].color
                                if (that.timeList[i].label === '看涨') {
                                    newBubble.value = '涨'
                                    that.noticeList.push(newBubble)
                                } else if (that.timeList[i].label === '看跌') {
                                    newBubble.value = '跌';
                                    that.noticeList.push(newBubble)
                                }
                            } else {
                                // 预测错误
                                newBubble.itemStyle.normal.color = '#ccc';
                                if (that.timeList[i].label === '看涨') {
                                    newBubble.value = '涨';
                                    that.noticeList.push(newBubble)
                                } else if (that.timeList[i].label === '看跌') {
                                    newBubble.value = '跌';
                                    that.noticeList.push(newBubble)
                                }
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
            this.wsNews.close()
            this.wsK.close()
            // this.area.scrollTop = 0;
            // this.handleMouseenter();
            if (value === '_5_min') {
                this.timeGape = 5;
            } else if (value === '_10_min') {
                this.timeGape = 10;
            } else {
                this.timeGape = 1;
            }
            this.timeStatus = value;
            this.kData = [];
            this.noticeList = [];
            this.updateIK();
            this.updateNews();
        },
        handleRateChange(value) {
            this.wsNews.close()
            this.wsK.close()
            // this.area.scrollTop = 0;
            // this.handleMouseenter();
            if (value === 'EUR/USD' || value === "GBP/USD" || value === 'AUD/USD') {
                this.reverseStatus = true;
            } else {
                this.reverseStatus = false;
            }
            this.kData = [];
            this.noticeList = [];
            this.rateStatus = value;
            this.updateNews();
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
        },
        handleMouseenter() {
            clearTimeout(this.timeOut);
            clearInterval(this.time);
        },
        handleLeave() {
            this.timeOut = setTimeout(() => {
                this.starMove();
            }, this.delay)
        },
        scrollUp() {
            if(this.area.scrollTop === 0){
                clearInterval(this.time);
                setTimeout(() => {
                    this.starMove();
                }, this.delay)
            }else{
                this.area.scrollTop++;
                if(this.area.scrollTop >= this.maxHeight - this.containerHeight){
                    this.area.scrollTop = 0;
                }
            }
        },
        starMove() {
            this.area.scrollTop++;
            this.time = setInterval(() => {
                this.scrollUp();
            }, this.speed)
        }

    },
    components: {
        BasicLoading
    },
    mounted() {
        const wrapHeight = document.getElementById('chartsWrap').offsetHeight - 40;
        const wrapWidth = document.getElementById('chartsWrap').offsetWidth - 50;
        document.getElementById('main').style.height = `${wrapHeight}px`;
        document.getElementById('main').style.width = `${wrapWidth}px`;
        this.initCharts();
        setInterval(() => {
            this.myChart.setOption(this.formateData());
            if (this.noticeList.length > 0) {
                var option =  this.myChart.getOption()
                option.series[0].markPoint.data.push(this.noticeList);
                this.myChart.setOption(option);
            }
        }, 1000)
        // 滚动动画效果实现
        this.area = document.getElementById("kTimeLine");
        this.maxHeight = document.getElementById("scrollBox").offsetHeight;
        this.containerHeight = document.getElementById('kTimeLine').offsetHeight;
        this.area.scrollTop = 0;
        this.timeOut = setTimeout(() => {
            this.scrollStatus = true;
            this.maxHeight > 0 && this.starMove();
        }, this.delay)
    }
}
</script>

<style lang="scss">
    @import '@/assets/styles/global.scss';
    // elemnet reset
    .el-input__inner{
       background: none;
       border:1px solid #333333!important;
       color: #FFFFFF!important;
       width: 130px!important;
       background-color: #333333!important;
    }
    .el-select .el-input.is-focus .el-input__inner{
        border-color: #333333!important;
    }
    .el-select .el-input__inner:focus{
        border-color: #333333!important;
    }
    .el-input__inner:hover{
        border-color: #333333!important;
    }
    .el-select-dropdown{
        background: #222222!important;
        border: none!important;
    }
    .el-popper[x-placement^=bottom] .popper__arrow{
        display: none!important;
    }
    .el-select-dropdown__item{
        color: #868686!important;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background-color: #222222!important;
    }
    .el-card{
        background: #E9E9E9!important;
        border-radius:2px!important;
        border: 1px solid #E9E9E9!important;
        color: #333333!important;
        line-height: 20px!important;
        font-size: 12px!important;
        line-height: 18px!important;
    }
    .el-card__body{
        padding: 10px!important;
    }
    .el-timeline-item__tail{
        border-left: 1px dashed #666666!important;
    }
    .el-timeline-item__timestamp{
        color: #BABABA!important;
        font-size: 12px!important;
    }
    .el-timeline-item__node{
        background: #999999;
    }
    .el-timeline-item__node--normal{
        left: 0!important;
        width: 10px!important;
        height: 10px!important;
    }
    .k-time-line li:first-child .el-timeline-item__node--normal{
        left: -5px!important;
        width: 20px!important;
        height: 20px!important;
    }
    .el-icon-caret-right{
        color: #1875F0!important;
        font-style: normal!important;
    }
    .el-icon-caret-top{
        color: #EF252D!important;
        font-style: normal!important;
    }
    .el-icon-caret-bottom{
        color: #00857A!important;
        font-style: normal!important;
    }
    .charts {
        width: 100%;
        height: 100vh;
        background: #000;
        @include flex-box;
        flex-direction: column;
    }
    .indicate-box{
        background: #111111;
    }
    .indicate{
        @include flex-box;
        align-items: center;
        justify-content: center;
        li{
            img{
                width: 14px;
                height: 20px;
                vertical-align: middle;
                margin-right: 5px;
            }
            margin-right: 20px;
            font-size: 12px;
        }
    }
    .header{
        background: #1E1D2E;
        height: 50px;
        width: 100%;
        padding: 0 20px;
        @include box-sizing(border-box);
        ul{
            @include flex-box;
            flex-direction: row;
            height: 48px;
            li{
                padding: 0 50px;
                height: 46px;
                line-height: 46px;
                font-size:14px;
                font-weight:400;
                padding-bottom: 2px;
                cursor: pointer;
                letter-spacing:5px;
                &.active{
                    background:rgba(55,62,97,1);
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                    box-shadow: 0px 10px 0px 0px #F25C62;
                    font-family:PingFang-SC-Bold;
                    position: relative;
                    &:after{
                        position: absolute;
                        content: '';
                        width: 17px;
                        height: 14px;
                        background: url('../assets/images/arrow.svg') no-repeat center;
                        transform: translateX(-50%);
                        left: 50%;
                        top: -8px;
                        background-size: contain;
                    }
                }
            }
        }
    }
    .max-width-container{
        flex: 1;
        -webkit-box-flex: 1;
        padding: 10px 20px; 
        @include box-sizing(border-box);
        @include flex-box;
        flex-direction: row;
        height: 100%;
        overflow: hidden;
        .charts-container{
            flex: 1;
            @include flex-box;
            flex-direction: column;
            overflow: hidden;
            .charts-controls{
                background: #1E1D2E;
                .rate-title{
                    color: #FECC16;
                    font-size:14px;
                    padding: 10px 0 0 10px;
                    @include box-sizing(border-box);
                }
                height: 188px;
                margin-top: 10px;
                @include box-sizing(border-box);
                .ul-item{
                    height: 100%;
                    @include flex-box;
                    flex-direction: row;
                    justify-content: space-between;
                    li{
                        flex: 1;
                        height: 100%;
                        padding: 10px;
                        @include box-sizing(border-box);
                    }
                }
            }
            .charts-wrap{
                flex: 1;
                -webkit-box-flex: 1;
                background: #111111;
                overflow: hidden;
                padding: 20px 0;
                @include box-sizing(border-box);
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
            width: 500px;
            // flex: 1;
            // -webkit-box-flex: 1;
            min-width: 400px;
            margin-left: 10px;
            @include flex-box;
            flex-direction: column;
            .top-title{
                background: #222222;
                @include box-sizing(border-box);
                padding: 20px;
                font-size:14px;
                color: #ffffff;
                span{
                    display: inline-block;
                    margin-right: 10px;
                    &:first-child{
                        color: #999999;
                    }
                }
            }
            .k-time-line{
                background: #222222;
                padding: 0 20px;
                @include box-sizing(border-box);
                flex: 1;
                -webkit-box-flex: 1;
                overflow-y: auto;
            }
        }
    }
    .common-bg-box{
        // background: #1E1D2E;
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
        background: #111111;
        padding: 20px 30px;
        .head-left{
            flex: 1;
            -webkit-box-flex: 1;
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
            background:rgba(38,24,31,1);
            padding: 10px;
            @include box-sizing(border-box);
            p{
                font-size:14px;
                color:rgba(103,110,142,1);
            }
            li{
                font-size: 12px;
                margin-top: 10px;
                background:rgba(66,38,38,1);
                border-radius:2px;
                padding: 14px 10px;
                @include box-sizing(border-box);
                span{
                    display: inline-block;
                    &:first-child{
                        color:#E4B0B0;
                        width: 80px;
                    }
                    &:nth-child(2){
                        color: #FFFFFF;
                        margin-right: 10px;
                    }
                    &:last-child{
                        color: #E4B0B0;
                    }
                }
            }
        }
    }
</style>
