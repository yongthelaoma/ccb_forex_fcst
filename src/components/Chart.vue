<template>
    <div class="charts">
        <div v-show="activeIndex === 0" class="max-width-container">
            <div class="charts-container">
                <div class="left-top-container">
                    <div class="charts-head">
                        <div class="head-left">
                            <template v-if="moneyValue === 'EUR/USD'">
                                <div class="box-item-top">
                                    <span class="title-one title-high-light">{{moneyValue}}</span>
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
                            <template v-if="moneyValue === 'Gold'">
                                <div class="box-item-top">
                                    <span class="title-one">{{moneyValue}}</span>
                                    <span class="title-one">{{xau.bid}}</span>
                                    <span class="result" :class="{'down': xau.rate < 0, 'up': xau.rate > 0}">{{xau.rate > 0 ? '+' : ''}}{{xau.rate}}</span>
                                </div>
                            </template>
                            <template v-if="moneyValue === 'DXY'">
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
                                <img src="../assets/images/predict-up.png">up
                            </li>
                            <li>
                                <img src="../assets/images/predict-down.png">down
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
                    <p class="rate-title">Real-Time Quotes</p>
                    <ul class="ul-item">
                        <li>
                           <div class="li-item-top">
                               <p class="rate-name">USD/JPY</p>
                               <p class="rate-res"><span class="res">{{usdjpy.bid}}</span><i :class="{'el-icon-caret-top': usdjpy.rate > 0, 'el-icon-caret-bottom': usdjpy.rate < 0}"></i><i :class="{'blue': usdjpy.rate < 0, 'red': usdjpy.rate > 0}">{{usdjpy.ratePrecent > 0 ? '+' : ''}}{{usdjpy.ratePrecent}}</i></p>
                               <span>{{usdjpy.rate > 0 ? '+' : ''}}{{usdjpy.rate}}</span>
                           </div>
                           <div class="li-item-bottom">
                               <span>High <i>{{usdjpy.high}}</i></span>
                               <span>Open <i>{{usdjpy.open}}</i></span>
                               <span>Low <i>{{usdjpy.low}}</i></span>
                               <span>Close <i>{{usdjpy.close}}</i></span>
                           </div>
                        </li>
                        <li>
                           <div class="li-item-top">
                               <p class="rate-name">U.S.Dollar Index(DXY) </p>
                               <p class="rate-res"><span class="res">{{dx.last}}</span><i :class="{'el-icon-caret-top': dx.rate > 0, 'el-icon-caret-bottom': dx.rate < 0}"></i><i :class="{'blue': dx.rate < 0, 'red': dx.rate > 0}">{{dx.ratePrecent > 0 ? '+' : ''}}{{dx.ratePrecent}}</i></p>
                               <span>{{dx.rate > 0 ? '+' : ''}}{{dx.rate}}</span>
                           </div>
                           <div class="li-item-bottom">
                               <span>High <i>{{dx.high}}</i></span>
                               <span>Open <i>{{dx.open}}</i></span>
                               <span>Low <i>{{dx.low}}</i></span>
                               <span>Close <i>{{dx.close}}</i></span>
                           </div>
                        </li>
                        <li>
                           <div class="li-item-top">
                               <p class="rate-name">Gold</p>
                               <p class="rate-res"><span class="res">{{xau.bid}}</span><i :class="{'el-icon-caret-top': xau.rate > 0, 'el-icon-caret-bottom': xau.rate < 0}"></i><i :class="{'blue': xau.rate < 0, 'red': xau.rate > 0}">{{xau.ratePrecent > 0 ? '+' : ''}}{{xau.ratePrecent}}</i></p>
                               <span>{{xau.rate > 0 ? '+' : ''}}{{xau.rate}}</span>
                           </div>
                           <div class="li-item-bottom">
                               <span>High <i>{{xau.high}}</i></span>
                               <span>Open <i>{{xau.open}}</i></span>
                               <span>Low <i>{{xau.low}}</i></span>
                               <span>Close <i>{{xau.close}}</i></span>
                           </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="time-line-container">
                <div class="right-top-container">
                    <div class="top-title">
                        <span>Financial News</span>
                        <span>{{currentTime}}</span>
                    </div>
                    <div class="k-time-line" id="kTimeLine">
                        <basic-loading v-show="timelineStatus"></basic-loading>
                        <el-timeline id="scrollBox">
                            <el-timeline-item placement="top" v-for="(item, index) in timeList"
                            :key="index"
                            :color="item.color"
                            :timestamp="item.timestamp">
                                <el-card>
                                    <p>
                                    <i v-if="item.label === '横盘'" class="el-icon-caret-right">【{{item.label === "横盘" ? 'neutral' : item.label}}】</i>
                                    <i v-if="item.label !== '横盘'" :class="{'el-icon-caret-top': item.label === 'up', 'el-icon-caret-bottom': item.label === 'down'}">【{{item.label}}】</i>
                                    {{item.txt}}
                                    </p>
                                    <p class="line" v-if="item.dst"></p>
                                    <p class="dst">{{item.dst}}</p>
                                    <p class="translate-btn"><span @click="handleTranslate(item, index)"></span></p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </div>
                 <div class="predict">
                    <ul>
                        <basic-loading v-show="predictStatus"></basic-loading>
                        <p>Statistics Of Prediction</p>
                        <li v-for="(item, index) in predictList" :key="index">
                            <span v-if="index === 0">previous trading day</span>
                            <span v-if="index === 1">last 5 trading days</span>
                            <span v-if="index === 2">last 30 trading days</span>
                            <span>Accuracy Rate:{{item.rate}}%</span>
                            <span>Correct:{{item.post}} Wrong:{{item.neg}}，Total:{{item.total}}</span>
                        </li>
                    </ul>
                 </div>
            </div>
        </div>
        <div v-show="activeIndex === 1" class="max-width-container common-bg-box container-description">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#000000"
                active-text-color="#ffffff"
                @select="handelSelet"
                text-color="#fff">

                <el-menu-item index="1">
                    <span slot="title">Product Description</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title">产品介绍</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <span slot="title">Illustration</span>
                </el-menu-item>
            </el-menu>
            <div class="container-pages">

                <div class="page-item" v-show="pageIndex === '1'">
                    <p class="paragraph">Fin-tech innovation is an important strategy of the China Construction Bank, and also the key to the transformation of the banking technology and intelligence. China Construction Bank has always attached great importance to the development and application of advanced technology such as AI, and is good at combining its own business to create innovative products. The intelligent robot Alpha-X, which is based on financial information to predict the market trend in real time, is one of the innovative achievements of Fin-Tech.</p>
                    <p class="paragraph">Alpha-X is based on natural language understanding(NLU) and emotional analysis model. Through deep learning principle, the robot can master historical data analysis and compare market rules. Finally, it can predict the trend of Candlestick chart based on real-time information. Training data include foreign exchange, stock, precious metals, dollar index and other major markets. More than 1 million historical Candlestick chart data and 500,000 financial information analysis, labeling and feeding to TensorFlow, Bert and other machine learning and in-depth learning frameworks to achieve the training and optimization of robots. This product provides a powerful, advanced and intelligent real-time trading analysis platform for market traders, retail investors, financial market practitioners, and even academic analysis institutions. Using this platform, the analysis workload can be greatly reduced. In the complex mass of real-time information, the key information can be quickly and effectively grasped and trend prediction can be made based on historical data. Prediction of declining trend can help traders make rational judgments more efficiently and intelligently, reduce transaction risk, increase profit and win rate to counterparties.</p>
                    <p class="paragraph">The current version of Alpha-X has supported Candlestick chart forecasts in domestic and foreign financial markets from foreign exchange, stocks, precious metals, to the dollar index; foreign exchange transactions support EUR/USD, USD/JPY, GBP/USD, USD/CAD, AUD/USD and other currency pairs; stocks support Shanghai Stock Index and Shenzhen Stock Exchange Index; precious metals support gold and other products, after which more market data and products will be added. More functions, such as research report generation, analysis results comparison, intelligent question-and-answer and so on will be added into this product. By interestingly evaluating the audience's investment potential, this game will let you experience and feel the ability and charm of Alpha-X.</p>
                </div>
                <div class="page-item" v-show="pageIndex === '2'">
                    <p class="paragraph">金融科技创新是建设银行的重要战略，也是银行科技化、智能化转型的关键。建设银行一向重视人工智能等前沿技术的发展和应用，善于结合自身业务打造出创新型的产品。本次金融市场研发的，基于财经资讯实时预测市场走势的智能机器人Alpha-X就是创新成果之一。</p>
                    <p class="paragraph">Alpha-X基于自然语言理解和情绪分析模型，通过深度学习原理使机器人掌握历史数据分析，对比市场规律，最终达到根据实时资讯预测k线走势的效果。训练数据囊括了外汇、股票、贵金属、美元指数等几大市场，超过100万条分时k线数据以及50万条财经资讯分析、标注后提供给TensorFlow、Bert等机器学习和深度学习框架，达成对机器人的训练和调优。该产品为广大市场交易人员、散户投资者以及金融市场相关从业人员、甚至学术分析机构等提供了一个强大、成熟、智能的实时交易分析平台，利用该平台可以极大地减少分析工作量，在纷繁复杂的海量实时资讯中，快速有效地抓取关键信息并做出有历史依据的涨跌趋势预测，更高效、智能地辅助交易者作出理性判断，降低交易风险，提高收益率以及对交易对手的胜率。</p>
                    <p class="paragraph">当前版本的Alpha-X已经支持从外汇、股票、贵金属、到美元指数等几大国内外金融市场的K线预测；其中外汇交易支持欧元/美元、美元/日元、英镑/美元、美元/加币、澳元/美元等多种货币对；股票支持上证指数和深证成指；贵金属支持黄金等品种，之后产品将加入金融市场更多细分领域和相应数据，同时增加研究报告生成、分析结果对比、智能问答等闭环功能。本次游戏将通过趣味性地评测观众的投资潜能，让大家体验和感受Alpha-X的能力和魅力。</p>
                </div>
                <div class="page-item img-item" v-show="pageIndex === '3'">
                    <img src="../assets/images/reason.png">
                </div>
            </div>
        </div>
        <div v-show="activeIndex === 2" class="max-width-container common-bg-box container-description">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#000000"
                active-text-color="#ffffff"
                @select="handelSelet2"
                text-color="#fff">
                <el-menu-item index="1">
                    <span slot="title">Algorithm Instruction</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span slot="title">原理介绍</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <span slot="title">Illustration</span>
                </el-menu-item>
            </el-menu>
            <div class="container-pages">
                <div class="page-item" v-show="pageIndex2 === '1'">
                    <p class="paragraph">This product uses natural language understanding and deep learning technology to predict the impact of financial news events, and assist users to make trading decisions. Aspect-level sentiment analysis technology for real-time news events is the basis of trading decision-making.Aspect-based sentiment analysis refers to extracting the aspects involved in the text (that is, the area of impact), and the sentiments expressed by each aspect. This task can be divided into two parts: aspect recognition, which can be aspect extraction or aspect classification, and sentiment analysis of the aspect. Aspect term extraction refers to the direct extraction of the words or phrases involved in an aspect from the original text. Aspect classification refers to predefining the category of an aspect for each domain, and then classifying each sentence (which may or may not belong to one or more aspects).</p>
                    <p class="paragraph">The breakthroughs in deep learning and word embedding provide a basis for accurate emotional analysis at the aspect level. There are three important tasks in aspect level sentiment classification using neural networks. The first task is to express the target context words. This problem is solved by using distributed semantic representation (such as Word2vec). The second task is to generate target representations, which can interact properly with contextual words. The usual solution is learning goal embedding (similar to word embedding). The third task is to identify the important sentimental context words of a specific target, which is usually realized by the attention-based cyclic neural network. Therefore, the CNN-Bi-LSTM with Attention neural network is designed according to the relationship between historical news events and market, the market trend signal model is trained.</p>
                </div>
                <div class="page-item" v-show="pageIndex2 === '2'">
                    <p class="paragraph">本产品利用自然语言理解和深度学习技术对新闻事件对于行情走势的影响进行判断，从而辅助交易决策。对实时新闻事件的Aspect级别的情感分析技术是其中决策的依据。基于aspect的情感分析指的是挖掘篇章中涉及的aspect（即影响的方面），以及对每个aspect表现出来的情感。现有的工作一般把这个任务分成两个部分：aspect识别，可以是aspect term提取或者aspect分类；aspect的情感识别。aspect term提取指的是从原文本中直接提取涉及到的aspect的单词或词组，而aspect分类指的是为每个领域预定义aspect种类，然后对每个句子进行分类（可以属于一个或多个aspect，也可以不属于任何aspect）。</p>
                    <p class="paragraph">深度学习和词嵌入的技术突破为较为准确的aspect级别的情感分析提供了基础。使用神经网络的 aspect level 情感分类有三个重要任务。第一个任务是表示目标的语境词。该问题使用分布式的语义表示（如word2vec）来解决。第二个任务是生成目标表示，其可与语境词进行恰当地互动。通常的解决方案是学习目标嵌入（与词嵌入类似）。第三个任务是识别特定目标的重要情感语境词，这通常采用基于注意力的循环神经网络来实现。因此，设计了CNN-Bi-LSTM with Attention的神经网络，针对历史新闻事件与行情的关系，训练了行情走势信号模型。</p>
                </div>
                <div class="page-item img-item img-item-big" v-show="pageIndex2 === '3'">
                    <img src="../assets/images/product.png">
                </div>
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
import axios from 'axios';

import BasicLoading from './Loading';
import moment from 'moment'

const echarts = require('echarts');
export default {
    name: 'charts',
    data() {
        return {
            timeOptions: [{
                value: '_1_min',
                label: '1 min'
            },{
                value: '_5_mins',
                label: '5 min'
            },{
                value: '_10_mins',
                label: '10 min'
            }],
            typeOptions: [
                {
                    value: 'EUR/USD',
                    label: 'EUR/USD'
                },{
                    value: 'USD/JPY',
                    label: 'USD/JPY'
                }
                ,{
                    value: 'DXY',
                    label: 'DXY'
                },{
                    value: 'Gold',
                    label: 'Gold'
                }
            ],
            timeList: [],
            timeValue: '1 min',
            timelineStatus: true,
            moneyValue: 'EUR/USD',
            myChart: '',
            baseUrl: '',
            httpBaseUrl: '',
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
            navList: ['Financial Event Monitor', 'Product Introduction', 'Technology Explanation'],
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
            pageIndex: '1',
            pageIndex2: '1',
            timer: null,
            predictStatus: true,
            catchItem: 'Eur'
        }
    },
    created() {
        // const URL = '172.16.100.169:8080';
        // const URL = 'localhost:8080';
        const URL = process.env.API_ROOT;
        console.log(URL);
        this.baseUrl = `ws:${URL}`;
        this.httpBaseUrl = `http://${URL}`;
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
        // 新闻翻译
        handleTranslate(item, index) {
            if (item.dst) {
                item.dst = '';
                return;
            }
            const that = this;
            axios({
                url: `${this.httpBaseUrl}/trans?id=${item.idStr}`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(function(res) {
                    const dstArr = res.data.trans_result.map((item) => item.dst);
                    that.$set(that.timeList[index], 'dst', dstArr.join(''));
                })
                .catch(function(error) {})
        },
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
                // this.currentTime = `${month}/${date.getDate()} ${date.getHours()}:${mm}:${ss}`
                const year = moment().format('LL');
                this.currentTime = `${year}  ${date.getHours()}:${mm}:${ss}`
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
            ws.onopen = () => {
                this.predictStatus = true;
            }
            ws.onmessage = (res) => {
                this.predictStatus = false;
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
                background: '#000000',
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
                        name: 'Candlestick',
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
                this.noticeList = [];
                const  option =  this.myChart.getOption();
                option.series[0].markPoint.data = null;
                this.myChart.setOption(option);
                this.timelineStatus = true;
                this.timer = setInterval(() => {
                    this.wsNews.send('ping');
                }, 30000)
            }
            this.wsNews.onerror = (error) => {
                this.$message.error(error);
                this.timelineStatus = false;
            }
            this.wsNews.onclose = () => {
                this.timelineStatus = false;
            }
            this.wsNews.onmessage = (res) => {
                this.timelineStatus = false;
                if (res.data !== 'pong') {
                    if (JSON.parse(res.data).timeList instanceof Array && JSON.parse(res.data).timeList.length > 0) {
                        this.handleNewsData(res);
                    }
                }
            }
            this.wsNews.onclose = () => {
                clearInterval(this.timer);
            }
            this.wsNews.onerror = () => {
                // 请求失败，接口出现异常，取缓存数据渲染页面
                clearInterval(this.timer);
            }
        },
        // 处理新闻数据
        handleNewsData(res) {
            const that = this;
            this.newsStatus = true;
            this.timelineStatus = false;
            that.timeList = JSON.parse(res.data).timeList.filter(item => item.txt !== '');
            that.timeList.map((item) => {
                item.fmtime = this.reGroup(item.timestamp);
                if (that.moneyValue === 'Gold') {
                    item.label = item.gold.label;
                } else {
                    item.label = item.forex.label;
                }
                if (item.label === '看涨') {
                    that.reverseStatus === true ? item.label = 'down' : item.label = 'up'
                    that.reverseStatus === true ? item.color = '#1AC998' : item.color = '#F25C62';
                } else if (item.label === '看跌') {
                    that.reverseStatus === true ? item.label = 'up' : item.label = 'down'
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
                if (data instanceof Object || res.data !== '{}') {
                    const dup = that.kData.filter(item => item[0] === data.time);
                    if (dup.length > 0) {
                        return;
                    }
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
                                if (that.timeList[i].label === 'up') {
                                    newBubble.value = 'up';
                                    newBubble.itemStyle.normal.color = that.timeList[i].color;
                                    that.noticeList.push(newBubble);
                                } else if (that.timeList[i].label === 'down') {
                                    newBubble.value = 'down';
                                    newBubble.itemStyle.normal.color = that.timeList[i].color;
                                    that.noticeList.push(newBubble);
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
            }
        },
        // 切换时间
        handleTimeChange(value) {
            // 如果时间没有变，不更新页面
            if (this.timeStatus === value) {
                return;
            }
            this.wsNews && this.wsNews.close();
            this.wsK && this.wsK.close();
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
            if (this.moneyValue === 'Gold') {
                this.fetchHisK('/ws/xauhis');
            } else if (this.moneyValue === 'DXY') {
                this.fetchHisK('/ws/dxhis');
            } else {
                this.updateIK();
            }
        },
        // 切换汇率类型
        handleRateChange(value) {
            // 断开新闻websocket 重新连接
            this.wsNews && this.wsNews.close();
            this.wsK && this.wsK.close();
            clearInterval(this.timer);
            // EUR/USD 贵金属 需要反转
            if (value === 'EUR/USD' || value === 'Gold') {
                this.reverseStatus = true;
            } else {
                this.reverseStatus = false;
            }
            this.$set(this, 'kData', []);
            this.$set(this, 'noticeList', []);
            this.updateNews();
            this.myChart.setOption(this.updateOptions());
            if (value === 'Gold') {
                setTimeout(() => {
                    this.fetchHisK('/ws/xauhis');
                }, 500)

            } else if (value === 'DXY') {
                setTimeout(() => {
                    this.fetchHisK('/ws/dxhis');
                }, 500)
            } else {
                setTimeout(() => {
                    this.updateIK();
                }, 500)
            }
        },
        // 获取贵金属、美元指数K线
        fetchHisK(url) {
            const that = this;
            const time = this.timeStatus;
            this.wsK = new WebSocket(`${this.baseUrl}${url}?&endDateTime=&duration=10800&durationUnit=SECOND&barSize=${time}&keepUpToDate=true`);
            this.wsK.onmessage = (res) => {
                const data = JSON.parse(res.data);
                if (data instanceof Object || res.data !== '{}') {
                    const dup = that.kData.filter(item => item[0] === data.time);
                    if (dup.length > 0) {
                        return;
                    }
                    const item = [];
                    item.push(data.time);
                    item.push(data.open);
                    item.push(data.close);
                    item.push(data.low);
                    item.push(data.high);
                    that.kData.push(item);
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
                                if (that.timeList[i].label === 'up') {
                                    newBubble.value = 'up';
                                    newBubble.itemStyle.normal.color = that.timeList[i].color;
                                    that.noticeList.push(newBubble);
                                } else if (that.timeList[i].label === 'down') {
                                    newBubble.value = 'down';
                                    newBubble.itemStyle.normal.color = that.timeList[i].color;
                                    that.noticeList.push(newBubble);
                                }
                            }
                        }
                    }
                    // 1分钟，最多180笔数据，5分钟，最多36数据，10分钟，最多18笔数据；
                    if (that.kData.length > that.maxKLength) {
                        const limitKdata = that.kData.slice(0 - that.maxKLength);
                        that.$set(that, 'kData', limitKdata);
                    }
                    console.log(that.kData);
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
        },
        handelSelet(index) {
            this.pageIndex = index;
        },
        handelSelet2(index) {
            this.pageIndex2 = index;
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
    .el-menu-item.is-active{
        border-left: 2px solid #5ECDFF!important;
    }
    .el-menu{
        border-right: solid 1px #232323!important;
    }
    .charts {
        width: 100%;
        height: 100vh;
        background: #000;
        @include flex-box;
        flex-direction: column;
    }
    .translate-btn{
        text-align: right;
        span{
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url('../assets/images/tran.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
        }
    }
    .line{
        padding-top: 5px;
        margin-bottom: 5px;
        border-bottom: 1px dashed #cccccc;
    }
    .dst{
        color: #1875F0 ;
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
            background: #000000;
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
                background: #111111;
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
                flex: 1;
                position: relative;
                @include flex-box;
                flex-direction: column;
            }
            .top-title{
                background: #111111;
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
                background: #111111;
                padding: 0 20px;
                @include box-sizing(border-box);
                flex: 1;
                -webkit-box-flex: 1;
                overflow-y: auto;
            }
        }
    }
    // 说明文档
    .container-description{
        height: 100%;
        padding: 0;
        display: flex;
        flex: row;
        overflow: hidden;
        .el-menu{
            width: 234px;
        }
        .container-pages{
            flex: 1;
            padding: 20px 40px;
            @include box-sizing(border-box);
            .page-item{
                width: 100%;
                height: 100%;
                overflow-y: auto;
                &.img-item{
                    text-align: center;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
                &.img-item-big{
                    position: relative;
                    img{
                        width: 80%;
                        position: absolute;
                        transform: translate(-50%, -50%);
                        left: 50%;
                        top: 50%;
                    }
                }
                p{
                    margin-bottom: 35px;
                }
                .title{
                    font-size: 20px;
                    color: #ffffff;
                }
                .paragraph{
                    font-size: 16px;
                    line-height: 28px;
                    text-align: justify;
                    text-indent: 2em;
                }
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
            .title-high-light{
                font-weight: bold;
                font-size: 20px;
                text-shadow:0px 0px 5px rgba(255,255,255,0.5);
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
            position: relative;
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
                        width: 120px;
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
