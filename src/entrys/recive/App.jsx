/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import { Button, Badge, Tabs, TextareaItem, List, WhiteSpace, InputItem, DatePicker, WingBlank, Modal, Toast } from 'antd-mobile';
import util from "commons/util";
import ImagePickerExample from '../send/ImagePickerExample'
import { infoGet, infoPut, info, infoDeposit, depositExtend, payGet, payUpdate } from "api/api";
import { ossGet } from 'api/api_oss'
const alert = Modal.alert;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


let serialNo = util.parseUrl(location.href).params.serialNo || '';
let from = util.parseUrl(location.href).params.from || '';
let tokenUser = localStorage.getItem('tokenUser') || '';
export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            isSave: false,
            sendDate: '',
            sendData: {},//发送数据
            imgSrc: '',
            payPrice: 0,
            payParam: {},//支付参数
            extendDay: ''
        }
        this.canClick = true;
    }


    componentDidMount() {
        super.componentDidMount();
        this.infoGetFn();

    }

    infoGetFn() {
        let param = {
            serialNo,
            tokenUser,
            type: from == 'reciveList' || from == 'payList' ? "2" : '1'
        };
        infoGet(param).then(data => {
            var ossParam = {
                tokenUser,
                ossId: data.picId
            };
            this.setState({
                sendData: data,
            })
            if (data.picId) {
                ossGet(ossParam).then(res => {
                    this.setState({
                        imgSrc: "http://msg-upyun.linkmsg.net" + res.path
                    })
                }, (error) => {
                    if (error.code == 10010) {
                        this.setState({
                            imgSrc: ''
                        })
                    }
                })
            }
        })
    }

    onBridgeReady = () => {
        let { orderNo } = this.state.sendData;
        let { extendDay } = this.state;
        infoDeposit({
            tokenUser,
            serialNo,
            orderNo: orderNo,
            extendDay
        }).then(data => {
            let payParam = data.payargs;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                "appId": payParam.appId,     //公众号名称，由商户传入     
                "timeStamp": payParam.timeStamp,         //时间戳，自1970年以来的秒数     
                "nonceStr": payParam.nonceStr, //随机串     
                "package": payParam.package,
                "signType": payParam.signType,         //微信签名方式：     
                "paySign": payParam.paySign,//微信签名 
            },
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        Toast.success("信息保存成功，可以在保存时长内重复查看！", 3000);
                        setTimeout(() => {
                            location.href = 'index.html';
                        }, 3000)
                    } else {
                        location.href = "index.html";
                    }
                });
            this.canClick = true;
        })
    }

    onBridgeReadyPay = () => {
        let { payParam } = this.state;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
            "appId": payParam.appId,     //公众号名称，由商户传入     
            "timeStamp": payParam.timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr": payParam.nonceStr, //随机串     
            "package": payParam.package,
            "signType": payParam.signType,         //微信签名方式：     
            "paySign": payParam.paySign,//微信签名 
        },
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    Toast.success("信息保存成功，可以在保存信息内重复查看！", 3000);
                    setTimeout(() => {
                        location.href = 'index.html';
                    }, 3000)
                } else {
                    location.href = "index.html";
                }
            });
    }

    payWx = () => {
        if (!this.state.extendDay) {
            Toast.fail("保存时长必须填写！");
            return false;
        }
        if (this.canClick) {
            this.canClick = false;
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                }
            } else {
                this.onBridgeReady();
            }
        }
    }


    render() {
        let { sendDate, payParam, payPrice, sendData } = this.state;
        let tabs = [
            { title: <Badge>文字</Badge> },
            { title: <Badge>图片</Badge> },
        ];
        if (!this.state.imgSrc) {
            tabs = [
                { title: <Badge>文字</Badge> },
            ];
        }
        let from = util.parseUrl(location.href).params.from;
        return (<div className={style.container}>
            <div className={style.cont} hidden={this.state.isSave}>
                <Tabs tabs={tabs}
                    initialPage={0}
                    animated={false}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        <List>
                            <TextareaItem
                                placeholder='请输入内容'
                                rows={15}
                                count={300}
                                value={this.state.sendData.text || ""}
                            />
                        </List>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        <List>
                            <ImagePickerExample currentPic={this.state.imgSrc} />
                        </List>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                    </div>
                </Tabs>
                <div hidden={from == 'notSend' || (sendData.status == '3' && from != 'payList')} className={style.actionBtn}>
                    {sendData.status == '5' ?
                        [<Button key='0' type="primary" size="small" inline style={{ marginRight: '40px' }} onClick={() => {
                            let attach = JSON.parse(sendData.attach);
                            alert('提示', `确定保存该信息${attach.extendDay}天，支付${attach.amount / 100}元`, [
                                { text: '取消' },
                                {
                                    text: '确认', onPress: () => {
                                        let param = {
                                            tokenUser,
                                            payOrderNo: sendData.payOrderNo,
                                            type: from == 'reciveList' || from == 'payList' ? "2" : '1',
                                        }
                                        payGet(param).then(res => {
                                            this.setState({
                                                payParam: JSON.parse(res.records[0].payargs)
                                            }, () => {
                                                if (typeof WeixinJSBridge == "undefined") {
                                                    if (document.addEventListener) {
                                                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReadyPay, false);
                                                    } else if (document.attachEvent) {
                                                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReadyPay);
                                                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReadyPay);
                                                    }
                                                } else {
                                                    this.onBridgeReadyPay();
                                                }
                                            })
                                        })
                                    }
                                },
                            ])
                        }}>去支付</Button>, <Button key='1' type="primary" size="small" inline style={{ marginRight: '40px' }} onClick={() => {
                            let attach = JSON.parse(sendData.attach);
                            alert('提示', `确定取消该支付订单（${attach.extendDay}天，支付${attach.amount / 100}元）`, [
                                { text: '取消' },
                                {
                                    text: '确认', onPress: () => {
                                        let param = {
                                            tokenUser,
                                            status: 2,
                                            depositNo: attach.depositNo,
                                            serialNo,
                                        }
                                        payUpdate(param).then(data => {
                                            this.infoGetFn();
                                            Toast.success('取消支付订单成功！');
                                        })
                                    }
                                },
                            ])
                        }}>取消支付</Button>] :
                        <Button type="primary" size="small" inline style={{ marginRight: '40px' }} onClick={() => { this.setState({ isSave: true }) }}>保存</Button>
                    }
                    <Button type="primary" size="small" inline style={{ marginRight: '40px' }} onClick={() => {
                        alert('提示', '是否确认删除该数据？', [
                            { text: '取消' },
                            {
                                text: '确认', onPress: () => {
                                    var param = {
                                        type: "1",
                                        remove: "1",
                                        status: "4",
                                        serialNo,
                                    };
                                    infoPut(param).then(data => {
                                        Toast.success('删除成功', 1000);
                                        setTimeout(() => {
                                            location.href = util.parseUrl(location.href).params.from + '.html';
                                        })
                                    }, (error) => {
                                        error && error.message && Toast.fail(error.message);
                                    })
                                }
                            },
                        ])
                    }}>删除</Button>
                </div>
            </div>
            <div className={style.savePage} hidden={!this.state.isSave}>
                <WingBlank>
                    <div className={style.tips}>
                        您所需要保存的资料已确定，请设置保存时限
                        </div>
                    <WhiteSpace size='lg' />
                    {/* <DatePicker
                        minDate={new Date(Date.now() + 1000 * 24 * 3600)}
                        value={sendDate}
                        mode="date"
                        maxDate={new Date(Date.now() + 365 * 1000 * 24 * 3600)}
                        onChange={sendDate => {
                            let { orderNo } = this.state.sendData;
                            depositExtend({
                                tokenUser,
                                serialNo,
                                orderNo: orderNo,
                                extendDay: sendDate ? Math.ceil((new Date(sendDate) - new Date()) / (24 * 3600000)) : 0
                            }).then(data => {
                                this.setState({
                                    payPrice: data.amount,
                                    sendDate,
                                    extendDay:sendDate ? Math.ceil((new Date(sendDate) - new Date()) / (24 * 3600000)) : 0
                                })
                            })
                        }}>
                        <List.Item arrow="horizontal">保存至</List.Item>
                    </DatePicker> */}
                    <InputItem type="number"
                    placeholder="请输入保存天数"
                        max={365}
                        onChange={(e) => {
                            this.setState({
                                extendDay: e ? (parseInt(e) > 365 ? 365 : parseInt(e)) : ''
                            }, () => {
                                if (this.state.extendDay) {
                                    let { orderNo, extendDay } = this.state.sendData;
                                    depositExtend({
                                        tokenUser,
                                        serialNo,
                                        orderNo: orderNo,
                                        extendDay: this.state.extendDay
                                    }).then(data => {
                                        this.setState({
                                            payPrice: data.amount,
                                        })
                                    })
                                }
                            })
                        }}
                        value={this.state.extendDay}
                    >保存天数：</InputItem>
                    <WhiteSpace size='lg' />
                    <div className={style.payTips}>
                        您所需要保存的资料保存时长{this.state.extendDay || 0}天<br />需要支付{payPrice}元
                        </div>
                    <WhiteSpace size='lg' />
                    <Button type="primary" onClick={this.payWx}>微信支付</Button>
                </WingBlank>
            </div>
        </div>
        )
    }
}