import React, {Component} from 'react';
import ReactEchart from 'echarts-for-react';
import {Row, Col} from 'antd';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import DataBlock from '@/components/data-block';
import './style.less';

@config({
    path: '/',
    title: {local: 'home', text: '首页', icon: 'home'},
    breadcrumbs: [{key: 'home', local: 'home', text: '首页', icon: 'home'}],
    connect(state){
        return {local:state.system.i18n.homePage}
    }
})

export default class Home extends Component {
    constructor(...props) {
        super(...props);
        this.props.onComponentWillShow(() => {
            this.setState({
                users: 868,
                read: 1869,
                like: 666,
                warning: 28,
                start: 168,
            });
        });

        this.props.onComponentWillHide(() => {
            this.setState({
                users: 0,
                read: 0,
                like: 0,
                warning: 0,
                start: 0,
            });
        });
    }

    state = {
        users: 868,
        read: 1869,
        like: 666,
        warning: 28,
        start: 168,
    };

    getPieOption = (lang) => {
        return {
            title: {
                text: lang.accessSource,
                left: 'center',
                top: 20,
            },

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            toolbox: {
                // y: 'bottom',
                feature: {
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [
                {
                    name: lang.accessSource,
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 335, name: lang.straightAccess},
                        {value: 310, name: lang.emailMarket},
                        {value: 274, name: lang.unionAds},
                        {value: 235, name: lang.videoAds},
                        {value: 400, name: lang.seoAds}
                    ].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    roseType: 'radius',
                    labelLine: {
                        normal: {
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
    };

    getBarOption = (lang) => {
        const xAxisData = [];
        const data1 = [];
        const data2 = [];
        for (let i = 0; i < 100; i++) {
            xAxisData.push( lang.product+ i);
            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }

        return {
            title: {
                text:lang.MonthlyDloads
            },
            legend: {
                data: [lang.lastMonth,lang.currentMonth],
                align: 'left'
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {},
            series: [
                {
                    name:lang.lastMonth,
                    type: 'bar',
                    data: data1,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                },
                {
                    name: lang.currentMonth,
                    type: 'bar',
                    data: data2,
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        };
    };

    getBar2Option = (lang) => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: [lang.accessSource,lang.emailMarket,lang.unionMarket, lang.videoAds, lang.seoAds, lang.baidu, lang.google, lang.bingying, lang.others]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [lang.Mon, lang.Tues, lang.Wed, lang.Thurs, lang.Fir, lang.Sat, lang.Sun]
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: lang.straightAccess,
                    type: 'bar',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: lang.emailMarket,
                    type: 'bar',
                    stack: lang.ads,
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: lang.unionMarket,
                    type: 'bar',
                    stack:  lang.ads,
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: lang.videoAds,
                    type: 'bar',
                    stack:  lang.ads,
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: lang.seoAds,
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine: {
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        },
                        data: [
                            [{type: 'min'}, {type: 'max'}]
                        ]
                    }
                },
                {
                    name: lang.baidu,
                    type: 'bar',
                    barWidth: 5,
                    stack: lang.seo,
                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name: lang.baidu,
                    type: 'bar',
                    stack: lang.seo,
                    data: [120, 132, 101, 134, 290, 230, 220]
                },
                {
                    name: lang.bingying,
                    type: 'bar',
                    stack: lang.seo,
                    data: [60, 72, 71, 74, 190, 130, 110]
                },
                {
                    name: lang.others,
                    type: 'bar',
                    stack: lang.seo,
                    data: [62, 82, 91, 84, 109, 110, 120]
                }
            ]
        };
    };

    render() {
        const {
            users,
            read,
            like,
            warning,
            start,
        } = this.state;
        const lang=this.props.local;
        const colStyle = {
            border: '1px solid #e8e8e8',
            borderRadius: '5px',
            padding: 8,
        };
        return (
            <PageContent styleName="root">
                <div styleName="statistics">
                    <DataBlock
                        color="#1890FF"
                        count={users}
                        tip={lang.newUsers}
                        icon="user-add"
                    />
                    <DataBlock
                        color="#FAAD14"
                        count={read}
                        tip={lang.readYesterday}
                        icon="area-chart"
                    />
                    <DataBlock
                        color="#3E8F2D"
                        count={like}
                        tip={lang.newLikes}
                        icon="like"
                    />
                    <DataBlock
                        color="red"
                        count={warning}
                        tip={lang.NoWarning}
                        icon="warning"
                    />
                    <DataBlock
                        color="#FA541C"
                        count={start}
                        tip={lang.newCollect}
                        icon="star"
                    />
                </div>
                <Row style={{marginTop: 16}}>
                    <Col span={8} style={{paddingRight: 16}}>
                        <div style={colStyle}>
                            <ReactEchart option={this.getPieOption(lang)}/>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div style={colStyle}>
                            <ReactEchart option={this.getBarOption(lang)}/>
                        </div>
                    </Col>
                </Row>
                <div style={{...colStyle, marginTop: 16}}>
                    <ReactEchart option={this.getBar2Option(lang)}/>
                </div>
            </PageContent>
        );
    }
}
