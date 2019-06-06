<template>
    <div class="charts">
        <div v-show="activeIndex === 0" class="max-width-container">
            <div class="charts-container">
                <div class="left-top-container">
                    <div class="charts-head">
                        <div class="head-left">
                            <!-- <p>实时行情</p> -->
                            <template v-if="moneyValue === 'EUR/USD'">
                                <div class="box-item-top">
                                    <span class="title-one">{{moneyValue}}</span>
                                    <span class="title-one">{{eurusd.bid}}</span>
                                    <span class="result" :class="{'down': eurusd.rate < 0, 'up': eurusd.rate > 0}">{{eurusd.rate > 0 ? '+' : ''}}{{eurusd.rate}}</span>
                                </div>
                            </template>
                            <template v-if="moneyValue === 'USD/JPY'">
                                <div class="box-item-top">
                                    <span class="title-one">{{moneyValue}}</span>
                                    <span class="title-one">{{usdjpy.bid}}</span>
                                    <span class="result" :class="{'down': usdjpy.rate < 0, 'up': usdjpy.rate > 0}">{{usdjpy.rate > 0 ? '+' : ''}}{{usdjpy.rate}}</span>
                                </div>
                            </template>
                            <template v-if="moneyValue === '贵金属'">
                                <div class="box-item-top">
                                    <span class="title-one">{{moneyValue}}</span>
                                    <span class="title-one">{{xau.bid}}</span>
                                    <span class="result" :class="{'down': xau.rate < 0, 'up': xau.rate > 0}">{{xau.rate > 0 ? '+' : ''}}{{xau.rate}}</span>
                                </div>
                            </template>
                            <template v-if="moneyValue === '美元指数'">
                                <div class="box-item-top">
                                    <span class="title-one">{{moneyValue}}</span>
                                    <span class="title-one">{{dx.last}}</span>
                                    <span class="result" :class="{'down': dx.rate < 0, 'up': dx.rate > 0}">{{dx.rate > 0 ? '+' : ''}}{{dx.rate}}</span>
                                </div>
                            </template>
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
                            <!-- <li>
                                <img src="../assets/images/predict-wrong.png">错
                            </li> -->
                        </ul>
                    </div>
                    <div class="charts-wrap" id="chartsWrap">
                        <div id="main" style="width: 550px;height:300px;"></div>
                    </div>
                </div>
                <div  class="charts-controls">
                    <p class="rate-title">实时行情</p>
                    <ul class="ul-item">
                        <li>
                           <div class="li-item-top">
                               <p class="rate-name">美元/日元</p>
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
                               <p class="rate-name">美元指数</p>
                               <p class="rate-res"><span class="res">{{dx.last}}</span><i :class="{'el-icon-caret-top': dx.rate > 0, 'el-icon-caret-bottom': dx.rate < 0}"></i><i :class="{'blue': dx.rate < 0, 'red': dx.rate > 0}">{{dx.ratePrecent > 0 ? '+' : ''}}{{dx.ratePrecent}}</i></p>
                               <span>{{dx.rate > 0 ? '+' : ''}}{{dx.rate}}</span>
                           </div>
                           <div class="li-item-bottom">
                               <span>高 <i>{{dx.high}}</i></span>
                               <span>开 <i>{{dx.open}}</i></span>
                               <span>低 <i>{{dx.low}}</i></span>
                               <span>收 <i>{{dx.close}}</i></span>
                           </div>
                        </li>
                        <li>
                           <div class="li-item-top">
                               <p class="rate-name">黄金</p>
                               <p class="rate-res"><span class="res">{{xau.bid}}</span><i :class="{'el-icon-caret-top': xau.rate > 0, 'el-icon-caret-bottom': xau.rate < 0}"></i><i :class="{'blue': xau.rate < 0, 'red': xau.rate > 0}">{{xau.ratePrecent > 0 ? '+' : ''}}{{xau.ratePrecent}}</i></p>
                               <span>{{xau.rate > 0 ? '+' : ''}}{{xau.rate}}</span>
                           </div>
                           <div class="li-item-bottom">
                               <span>高 <i>{{xau.high}}</i></span>
                               <span>开 <i>{{xau.open}}</i></span>
                               <span>低 <i>{{xau.low}}</i></span>
                               <span>收 <i>{{xau.close}}</i></span>
                           </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="time-line-container">
                <div class="right-top-container">
                    <div class="top-title">
                        <span>资讯信息</span>
                        <span>{{currentTime}}</span>
                    </div>
                    <div class="k-time-line" id="kTimeLine">
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
            <div class="desc-content">
                <p class="title">原理说明</p>
                <p class="paragraph">本产品利用自然语言理解和深度学习技术对新闻事件对于行情走势的影响进行判断，从而辅助交易决策。对实时新闻事件的Aspect级别的情感分析技术是其中决策的依据。</p>
                <p class="paragraph">基于aspect的情感分析指的是挖掘篇章中中涉及的aspect（即影响的方面），以及对每个aspect表现出来的情感。现有的工作一般把这个任务分成两个部分：aspect识别，可以是aspect term提取或者aspect分类；aspect的情感识别。aspect term提取指的是从原文本中直接提取涉及到的aspect的单词或词组，而aspect分类指的是为每个领域预定义aspect种类，然后对每个句子进行分类（可以属于一个或多个aspect，也可以不属于任何aspect）。</p>
                <p class="paragraph">深度学习和词嵌入的技术突破为较为准确的aspect级别的情感分析提供了基础。使用神经网络的 aspect level 情感分类有三个重要任务。第一个任务是表示目标的语境词。该问题使用分布式的语义表示（如word2vec）来解决。第二个任务是生成目标表示，其可与语境词进行恰当地互动。通常的解决方案是学习目标嵌入（与词嵌入类似）。第三个任务是识别特定目标的重要情感语境词，这通常采用基于注意力的循环神经网络来实现。因此，设计了CNN-Bi-LSTM with Attention的神经网络，针对历史新闻事件与行情的关系，训练了行情走势信号模型。</p>
            </div>
        </div>
        <div class="header">
            <ul>
                <li @click="activeIndex = index" :class="{'active': activeIndex === index}" v-for="(item, index) in navList" :key="index">{{item}}</li>
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
            timeOptions: [{
                value: '_1_min',
                label: '1分钟'
            },{
                value: '_5_mins',
                label: '5分钟'
            },{
                value: '_10_mins',
                label: '10分钟'
            }],
            typeOptions: [
                {
                    value: 'EUR/USD',
                    label: 'EUR/USD'
                },{
                    value: 'USD/JPY',
                    label: 'USD/JPY'
                }
                // ,{
                //     value: '美元指数',
                //     label: '美元指数'
                // },{
                //     value: '贵金属',
                //     label: '贵金属'
                // }
            ],
            timeList: [],
            timeValue: '1分钟',
            timelineStatus: true,
            moneyValue: 'EUR/USD',
            myChart: '',
            // baseUrl: 'ws:172.16.100.169:8080',
            baseUrl: 'ws:localhost:8080',
            rateStatus: 'EUR/USD',
            timeStatus: '_1_min',
            currentTime: '',
            currentRate: '0.0000',
            bid: '0',
            kData: [],
            usdjpy: {},
            eurusd: {},
            xau: {}, // 黄金指数
            dx: {}, // 美元实时指数
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
            wsK: '',
            predictGap: 10,
            // bar 最大个数
            maxKLength: 180,
        }
    },
    created() {
        // 启动咨询信息定时器
        this.startClock();
        // 获取3个实时汇率
        this.initeRate();
        // 获取统计信息
        this.fetchPredict();
        this.updateNews();
        setTimeout(() => {
            this.updateIK();
        }, 10000)
    },
    methods: {
        // 初始化图表
        initCharts() {
            this.myChart = echarts.init(document.getElementById('main'));
            this.myChart.setOption(this.updateOptions());
        },
        // 咨询信息定时器
        startClock(date, fmt) {
            setInterval(() => {
                const date = new Date()
                const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
                const ss = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
                const mm = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
                this.currentTime = `${month}月${date.getDate()}日 ${date.getHours()}:${mm}:${ss}`
            }, 1000)
        },
        // 获取实时汇率三大块（美元/日元、黄金、美元指数）
        initeRate() {
            // USD/JPY
            this.fetchRate(`${this.baseUrl}/ws/forex?symbol=USD&currency=JPY`, 'usdjpy');
            // EUR/USD
            this.fetchRate(`${this.baseUrl}/ws/forex?symbol=EUR&currency=USD`, 'eurusd');
            // 美元指数
            this.fetchRate(`${this.baseUrl}/ws/dx`, 'dx');
            // 黄金
            this.fetchRate(`${this.baseUrl}/ws/xau`, 'xau');
        },
        // 获取汇率封装
        fetchRate(url, type) {
            const ws = new WebSocket(url);
            ws.onmessage = (res) => {
                const data = JSON.parse(res.data);
                if (data instanceof Object) {
                    this[type]= data;
                    if (type === 'usdjpy' || type === 'eurusd') {
                        // 美元、日元
                        this[type].rate = ((data.bid - data.close) / data.close).toFixed(4);
                        this[type].ratePrecent = `${(((data.bid - data.close) / data.close) * 100).toFixed(2)}%`;
                    } else if (type === 'xau'){
                        // 黄金
                        this[type].rate = ((data.ask - data.close) / data.close).toFixed(4);
                        this[type].ratePrecent = `${(((data.ask - data.close) / data.close) * 100).toFixed(2)}%`;
                    } else {
                        // 美元指数
                        this[type].rate = ((data.last - data.close) / data.close).toFixed(4);
                        this[type].ratePrecent = `${(((data.last - data.close) / data.close) * 100).toFixed(2)}%`;
                    }
                }
            }
        },
        // 获取统计信息
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
        // 根据时间选项重组数据
        reGroup(date) {
            const times = new Date(date);
            // 转化成毫秒
            let seconeds = times.getTime();
            // 2、获取当前时间数据的分钟
            const minutes = times.getMinutes();
            // 将当前时间归到对应的时间段下，向前推，10分钟的话，14:35:00 归到 14:30:00
            if (minutes % this.timeGape !== 0) {
                let reduceMinutes = minutes % this.timeGape;
                // let addMinutes = this.timeGape - minutes % this.timeGape;
                // seconeds = seconeds + addMinutes * 60 * 1000;
                seconeds = seconeds - reduceMinutes * 60 * 1000;
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
        // 计算K线数据
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
        // 更新echats options
        updateOptions() {
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
                background: '#304547',
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
                    top: 10,
                    bottom: 55
                    // bottom: 80
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
                    handleSize: '50%',
                    dataBackground: {
                        areaStyle: {
                            color: '#8392A5'
                        },
                        lineStyle: {
                            opacity: 0.8,
                            color: '#8392A5'
                        }
                    },
                    height: 15,
                    bottom: 10,
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
        // 获取实时新闻
        updateNews() {
            const that = this;
            this.wsNews = new WebSocket(`${this.baseUrl}/ws/live`);
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
                this.handleNewsData(res);
            }
        },
        // 处理新闻数据
        handleNewsData(res) {
            const that = this;
            this.newsStatus = true;
            this.timelineStatus = false;
            if (JSON.parse(res.data).timeList instanceof Array) {
                that.timeList = JSON.parse(res.data).timeList;
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
        },
        // 获取k线数据
        updateIK() {
            const rate = this.moneyValue.split('/');
            const time = this.timeStatus;
            const that = this;
            const url = `${this.baseUrl}/ws/historical?symbol=${rate[0]}&currency=${rate[1]}&endDateTime=&duration=10800&durationUnit=SECOND&barSize=${time}&keepUpToDate=true`;
            this.wsK = new WebSocket(url);
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
                for (let i = 0; i < that.timeList.length; i++) {
                    for (let j = 0; j < that.kData.length; j++) {
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
                            if (that.timeList[i].label === '看涨') {
                                newBubble.value = '涨';
                                newBubble.itemStyle.normal.color = that.timeList[i].color;
                                that.noticeList.push(newBubble);
                                // 当前时间与 10分钟后的时间对比
                                // if (that.kData[j+that.predictGap]) {
                                //     if (that.kData[j+that.predictGap][2] - that.kData[j][2] > 0.0005) {
                                //         // 预测对了
                                //         newBubble.itemStyle.normal.color = that.timeList[i].color;
                                //         that.noticeList.push(newBubble);
                                //     } else {
                                //         // 预测错了
                                //         newBubble.itemStyle.normal.color = '#ccc';
                                //         that.noticeList.push(newBubble);
                                //     }
                                // }
                            } else if (that.timeList[i].label === '看跌') {
                                newBubble.value = '跌';
                                newBubble.itemStyle.normal.color = that.timeList[i].color;
                                that.noticeList.push(newBubble);
                                // if (that.kData[j+that.predictGap]) {
                                //     if (that.kData[j+that.predictGap][2] - that.kData[j][2] < -0.0005) {
                                //         // 预测对了
                                //         newBubble.itemStyle.normal.color = that.timeList[i].color;
                                //         that.noticeList.push(newBubble);
                                //     } else {
                                //         // 预测错了
                                //         newBubble.itemStyle.normal.color = '#ccc';
                                //         that.noticeList.push(newBubble);
                                //     }
                                // }
                            }
                        }
                    }
                }
                // 1分钟，最多180笔数据，5分钟，最多36数据，10分钟，最多18笔数据；
                if (that.kData.length > that.maxKLength) {
                    const limitKdata = that.kData.slice(0 - that.maxKLength);
                    that.$set(that, 'kData', limitKdata);
                }
            }
        },
        // 切换时间
        handleTimeChange(value) {
            this.wsNews.close();
            // this.wsK.close();
            if (value === '_5_mins') {
                this.timeGape = 5;
                this.maxKLength = 36;
            } else if (value === '_10_mins') {
                this.timeGape = 10;
                this.maxKLength = 18;
            } else {
                this.timeGape = 1;
                this.maxKLength = 180;
            }
            this.timeStatus = value;
            this.predictGap = 10 / this.timeGape;
            this.kData = [];
            this.noticeList = [];
            this.updateNews();
            if (this.rateStatus === '贵金属') {
                this.fetchHisK('/ws/xauhis');
            } else if (this.rateStatus === '美元指数') {
                this.fetchHisK('/ws/dxhis');
            } else {
                setTimeout(() => {
                    this.updateIK();
                }, 10000)
            }
        },
        // 切换汇率类型
        handleRateChange(value) {
            // TODO 暂时关闭这两个close
            // 断开新闻websocket 重新连接
            this.wsNews.close();
            // this.wsK.close();
            // EUR/USD 贵金属 需要反转
            if (value === 'EUR/USD' || value === '贵金属') {
                this.reverseStatus = true;
            } else {
                this.reverseStatus = false;
            }
            this.$set(this, 'kData', []);
            this.$set(this, 'noticeList', []);
            this.rateStatus = value;
            this.updateNews();
            if (value === '贵金属') {
                this.fetchHisK('/ws/xauhis');
            } else if (value === '美元指数') {
                this.fetchHisK('/ws/dxhis');
            }else {
                // 重新获取新闻，因为反转信息发生变化
                // this.updateNews();
                setTimeout(() => {
                    this.updateIK();
                }, 10000)
            }
        },
        // 获取贵金属、美元指数K线
        fetchHisK(url) {
            const that = this;
            const time = this.timeStatus;
            this.wsK = new WebSocket(`${this.baseUrl}${url}?&endDateTime=&duration=10800&durationUnit=SECOND&barSize=${time}&keepUpToDate=true`);
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
        // 动态计算画布宽高
        const wrapHeight = document.getElementById('chartsWrap').offsetHeight - 10;
        const wrapWidth = document.getElementById('chartsWrap').offsetWidth - 10;
        document.getElementById('main').style.height = `${wrapHeight}px`;
        document.getElementById('main').style.width = `${wrapWidth}px`;
        this.initCharts();
        setInterval(() => {
            this.myChart.setOption(this.updateOptions());
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
        width: 130px!important;
        background-color: #333333!important;
        background:rgba(17,17,17,1) rgba(53,198,217,0.05)!important;
        border-radius: 2px!important;
        border:1px solid rgba(48,69,71,1)!important;
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
    .el-select-dropdown__item.selected{
        background:rgba(49,85,99,1)!important;
        box-shadow: inset 0px 0px 10px 0px rgba(98,191,255,1),0px 0px 1px 0px rgba(51,233,255,1)!important;
    }
    .el-card{
        box-shadow:inset 0px 0px 18px 0px rgba(255,255,255,0.23)!important;
        border-radius:2px!important;
        color:rgba(255,255,255,1)!important;
        line-height: 20px!important;
        font-size: 12px!important;
        line-height: 18px!important;
        box-shadow:inset 0px 0px 18px 0px rgba(255,255,255,0.23)!important;
        border:1px solid rgba(73,73,73,1)!important;
        background-color: #1D252E!important;
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
    .desc-content{
        max-width: 1200px;
        margin: 40px auto;
        p{
            margin-bottom: 35px;
        }
        .title{
            font-size: 28px;
            color: #ffffff;
        }
        .paragraph{
            font-size: 24px;
            line-height: 38px;
        }

    }
    .header{
        background: #000000;
        height: 50px;
        width: 100%;
        padding: 0 20px;
        box-shadow:0px -1px 0px 0px rgba(51,51,51,1),0px -1px 0px 0px rgba(51,51,51,1);
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
                border-right: 1px solid #141321;
                color: #8F8F8F;
                &.active{
                    background:rgba(55,62,97,1);
                    font-weight:bold;
                    font-family:PingFang-SC-Bold;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    line-height:20px;
                    letter-spacing:5px;
                    text-shadow:0px 0px 7px rgba(182,182,182,0.5);
                    background: linear-gradient(180deg, rgba(94,234,255,1) 0%, rgba(0,177,255,1) 100%);
                    -webkit-background-clip:text;
                    -webkit-text-fill-color:transparent;
                    line-height: 48px;
                    position: relative;
                    &:after{
                        position: absolute;
                        content: '';
                        width: 36px;
                        height: 36px;
                        background: url('../assets/images/circle.svg') no-repeat;
                        background-size: contain;
                        left: 16px;
                        top: 6px;
                    }
                }
            }
        }
    }
    .max-width-container{
        .left-top-container{
            flex: 1;
            background:rgba(17,17,17,1) rgba(53,198,217,0.05);
            border-radius:2px;
            border:1px solid rgba(48,69,71,1);
            overflow: hidden;
            @include flex-box;
            flex-direction: column;
            position: relative;
            &:after{
                content: '';
                width: 82px;
                height: 57px;
                position: absolute;
                top: -16px;
                right: -16px;
                background: url('../assets/images/left_top.svg') no-repeat center;
            }
            &:before{
                content: '';
                width: 76px;
                height: 65px;
                position: absolute;
                bottom: -15px;
                left: -16px;
                background: url('../assets/images/left_bottom.svg') no-repeat center;
            }
        }
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
                @include flex-box;
                flex-direction: column;
                background: #1D252E;
                border-radius:2px;
                border:1px solid rgba(29,37,46,1);
                padding: 0 10px 10px 10px;
                @include box-sizing(border-box);
                .rate-title{
                    color: #FECC16;
                    font-size:14px;
                    padding: 10px 0 10px 10px;
                    @include box-sizing(border-box);
                }
                height: 188px;
                margin-top: 10px;
                @include box-sizing(border-box);
                .ul-item{
                    flex: 1;
                    // height: 100%;
                    @include flex-box;
                    flex-direction: row;
                    justify-content: space-between;
                    li{
                        flex: 1;
                        margin-right: 10px;
                        // height: 100%;
                        padding: 10px;
                        @include box-sizing(border-box);
                        box-shadow:inset 0px 0px 18px 0px rgba(255,255,255,0.23);
                        border-radius:3px;
                        border:1px solid rgba(73,73,73,1);
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                }
            }
            .charts-wrap{
                flex: 1;
                -webkit-box-flex: 1;
                overflow: hidden;
                // padding: 10px 0;
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
            width: 500px;
            min-width: 400px;
            margin-left: 10px;
            @include flex-box;
            flex-direction: column;
            .right-top-container{
                background: pink;
                flex: 1;
                position: relative;
                @include flex-box;
                flex-direction: column;
            }
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
    .li-item-top{
        padding-bottom: 6px;
        .rate-name{
            font-size:14px;
            line-height: 22px;
            color:rgba(176,185,228,1);
        }
        .rate-res{
            font-size:18px;
            line-height:26px;
            color:rgba(255,255,255,1);
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
        padding-top: 6px;
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
            &:nth-child(3), &:nth-child(4) {
                margin-bottom: 0;
            }
        }
    }
    .charts-head{
        @include flex-box;
        @include box-sizing(border-box);
        flex-direction: row;
        justify-content: space-between;
        padding: 20px 30px 5px;
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
            padding: 10px;
            @include box-sizing(border-box);
            background:rgba(17,17,17,1);
            border-radius:2px;
            border:1px solid rgba(29,37,46,1);
            p{
                font-size:14px;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:20px;
                text-shadow:0px 0px 7px rgba(182,182,182,0.5);
                background:linear-gradient(180deg, rgba(140,140,140,1) 0%, rgba(255,255,255,1) 100%);
                -webkit-background-clip:text;
                -webkit-text-fill-color:transparent;
            }
            li{
                font-size: 12px;
                margin-top: 10px;
                background:rgba(255,255,255,0.05);
                box-shadow:inset 0px 0px 18px 0px rgba(255,255,255,0.23);
                border-radius:3px;
                border:1px solid rgba(73,73,73,1);
                padding: 12px 10px;
                @include box-sizing(border-box);
                span{
                    display: inline-block;
                    &:first-child{
                        color:#ffffff;
                        width: 80px;
                    }
                    &:nth-child(2){
                        color:rgba(216,247,255,1);
                        margin-right: 10px;
                        position: relative;
                        &:after{
                            position: absolute;
                            content: '';
                            height: 3px;
                            width: 100%;
                            background:rgba(128,230,255,1);
                            box-shadow:0px 0px 10px 0px rgba(26,201,152,1);
                            left: 0;
                            bottom: -5px;
                        }
                    }
                    &:last-child{
                        color: #ffffff;
                    }
                }
            }
        }
    }
</style>
