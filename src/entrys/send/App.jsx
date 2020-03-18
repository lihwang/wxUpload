/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import PhoneInput from './PhoneInput'
import {
    List,
    DatePicker,
    Flex,
    Button,
    InputItem,
    WhiteSpace, TextareaItem, Modal, Toast, Checkbox
} from 'antd-mobile';
import classnames from 'classnames';
const AgreeItem = Checkbox.AgreeItem;
import ImagePickerExample from './ImagePickerExample'
import VideoPickerExample from './VideoPickerExample'
import util from "commons/util";

import { info } from "api/api";

export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            phoneList: [{ phone: '', id: 'id' + new Date().getTime() }],//手机列表
            sendDate: new Date(+new Date() + 5 * 60000),   //发送时间(5分钟后)
            cancelDate: '', //取消时间
            firstpw: '',     //第一次密码
            secondpw: '',   //第二次密码
            areaValue: '',  //文本域值
            isHiddenTextArea: true, //文本域隐藏
            isHiddenPic: true, //照片显示隐藏
            isHiddenVideo: true,
            modal1: false,    //弹窗
            ossId: '',
            picId: "",
            vedioId: "",
            topic: "测试",
            payParam: {},
            hasQuestion: false,
            question: '',
            answer: '',
            canClick: false,

        }
        this.canClick = true;
        this.nowTime = new Date();
    }

    componentDidMount() {
        super.componentDidMount();
    }

    onBridgeReady = () => {
        this.canClick = true;
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
            "appId": this.state.payParam.appId,     //公众号名称，由商户传入     
            "timeStamp": this.state.payParam.timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr": this.state.payParam.nonceStr, //随机串     
            "package": this.state.payParam.package,
            "signType": this.state.payParam.signType,         //微信签名方式：     
            "paySign": this.state.payParam.paySign,//微信签名 
        },
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    Toast.success("支付成功且信息准备发送！", 3000);
                    setTimeout(() => {
                        location.href = 'index.html';
                    }, 3000)
                }
            });
    }



    onClose(key) {
        this.setState({
            [key]: false,
        });
    }

    getPicId = (picId) => {
        this.setState({
            picId: picId
        })
    }

    getVideoId = (vedioId) => {
        this.setState({
            vedioId: vedioId
        })
    }

    addPhone = () => {
        this.setState({
            phoneList: [...this.state.phoneList, { phone: '', id: 'id' + new Date().getTime() }]
        }, this.judgeCanClick)
    }

    judgeCanClick = () => {
        let { phoneList, areaValue, firstpw, secondpw, sendDate, hasError, hasQuestion, question, answer } = this.state;
        let canClick = true;
        for (let i = 0; i < phoneList.length; i++) {
            if (!phoneList[i].phone) {
                canClick = false;
            }
        }

        if (!areaValue && !this.state.picId && !this.state.vedioId) canClick = false;
        if (!firstpw) canClick = false;
        if (!secondpw) canClick = false;
        if (!sendDate) canClick = false;
        this.setState({
            canClick,
            sendDate:+sendDate-new Date()<300000?new Date(+new Date() + 5 * 60000):sendDate
        })
    }




    sendInfo = () => {
        let { phoneList, areaValue, firstpw, secondpw, sendDate, hasError, hasQuestion, question, answer } = this.state;
        for (let i = 0; i < phoneList.length; i++) {
            if (!!phoneList[i].phone) {
                if (!/^1\d{10}/.test(phoneList[i].phone.replace(/\s/g, ''))) {
                    return Toast.fail(`第${i + 1}个手机格式有问题`);
                }
            } else {
                return Toast.fail(`第${i + 1}个手机号为空`);
            }
        }
        if (!areaValue && !this.state.picId && !this.state.vedioId) return Toast.fail("存储信息必填！");
        if (!firstpw) return Toast.fail("取消密码必填！");
        if (!secondpw) return Toast.fail("确认取消密码必填！");
        if (!sendDate) return Toast.fail("发送时间必填！");
        if (hasError) return Toast.fail("手机号格式错误");

        if (secondpw != firstpw) return Toast.fail("两次密码输入不一致！");
        var param = {
            mobile: phoneList.map(item => item.phone.replace(/\s/g, '')).join(','),
            password: secondpw,
            topic: this.state.topic,
            text: areaValue,
            tokenUser: sessionStorage.getItem('tokenUser'),
            picId: this.state.picId,
            vedioId: this.state.vedioId,
            planTime: util.msecToString(new Date(+sendDate - this.nowTime > 300000 ? sendDate : new Date(+new Date() + 300000)).getTime(), "yyyyMMddHHmmss"),
            passwdAsk: question,
            passwdReply: answer
        };

        if (this.canClick) {
            this.canClick = false;
            info(param).then(res => {
                this.setState({
                    payParam: res.payargs
                }, () => {
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
                })
            }, (error) => {
                this.canClick = true;
                if (error && error.code == 10020) {
                    Toast.fail("您输入的好友未注册，请提示好友注册！");
                } else {
                    error && error.message && Toast.fail(error.message);
                }
            })
        }
    }

    render() {
        let { isHiddenTextArea, canClick, isHiddenVideo, isHiddenPic } = this.state;
        return (<div className={style.container}>
            <div className={style.mian} hidden={(!isHiddenTextArea) || (!isHiddenPic) || (!isHiddenVideo)}>
                <div className={style.title}>选择发送对象</div>
                {
                    this.state.phoneList.map((item, index) => {
                        return <PhoneInput key={item.id} index={index} phone={item.phone} changePhone={(phone) => {
                            let newList = this.state.phoneList;
                            newList[index].phone = phone;
                            this.setState({
                                phoneList: newList
                            }, this.judgeCanClick)
                        }} delIndex={() => {
                            let newList = this.state.phoneList;
                            newList.splice(index, 1);
                            this.setState({
                                phoneList: newList
                            })
                        }} />
                    })
                }
                <div className={style.addPhone} hidden={this.state.phoneList.length == 5} onClick={this.addPhone}>+  添加发送人</div>
                <div className={style.operate}>
                    <div className={style.inputFont} onClick={() => {
                        this.setState({
                            isHiddenTextArea: false
                        })
                    }}>输入文字</div>
                    <div className={style.inputFont} onClick={() => {
                        this.setState({
                            isHiddenPic: false
                        }, this.judgeCanClick)
                    }}>导入照片</div>
                    <div className={style.inputFont} onClick={() => {
                        this.setState({
                            isHiddenVideo: false
                        }, this.judgeCanClick)
                    }}>导入视频</div>
                </div>
                <div className={style.selectTime}>
                    <DatePicker
                        minDate={new Date(+new Date()+300000)}
                        minuteStep={1}
                        value={this.state.sendDate}
                        onChange={sendDate => this.setState({ sendDate }, this.judgeCanClick)}>
                        <List.Item arrow="horizontal">设定发送时间</List.Item>
                    </DatePicker>
                </div>
                <div className={style.inputPw}>
                    <InputItem maxLength='6' value={this.state.firstpw} onChange={firstpw => this.setState({ firstpw }, this.judgeCanClick)} type="password" placeholder="****">设置取消密码</InputItem>
                    <InputItem maxLength='6' value={this.state.secondpw} onChange={secondpw => this.setState({ secondpw }, this.judgeCanClick)} type="password" placeholder="****">再次确认密码</InputItem>
                </div>
                <div className={style.passWordTips}>发送时间到达前，可凭此密码取消发送，密码输入错误，会导致系统立刻发送！<span>只有一次机会！！不可逆！！</span></div>
                <div className={classnames(style.sendInfo, { [style.canclick]: canClick })} onClick={this.sendInfo}>所有资料准备完毕，确认上传</div>
            </div>
            <div className={style.inputDetail}>
                <div hidden={isHiddenTextArea}>
                    <List renderHeader={() => '请输入文字资料'}>
                        <TextareaItem
                            placeholder='请输入内容'
                            rows={15}
                            count={300}
                            value={this.state.areaValue}
                            onChange={(areaValue) => {
                                this.setState({
                                    areaValue
                                })
                            }}
                        />
                    </List>
                    <div className={style.sureInputText} onClick={() => {
                        this.setState({
                            isHiddenTextArea: true
                        }, this.judgeCanClick)
                    }}>输入完毕</div>
                </div>
                <div className={style.imageInput} hidden={isHiddenPic}>
                    <div className={style.imgTitle}>请选择上传照片</div>
                    <ImagePickerExample getPicId={this.getPicId} allowUpload={true} />
                    <WhiteSpace size='lg' />
                    <div className={style.sureInputText} onClick={() => {
                        this.setState({
                            isHiddenPic: true
                        })
                    }}>导入完毕</div>
                </div>
                <div className={style.imageInput} hidden={isHiddenVideo}>
                    <div className={style.imgTitle}>请选择上传视频</div>
                    <VideoPickerExample getVideoId={this.getVideoId} allowUpload={false} />
                    <WhiteSpace size='lg' />
                    <div className={style.sureInputText} onClick={() => {
                        this.setState({
                            isHiddenVideo: true
                        })
                    }}>导入完毕</div>
                </div>
            </div>

        </div>
        )
    }
}