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
const AgreeItem = Checkbox.AgreeItem;
import ImagePickerExample from './ImagePickerExample'
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
            modal1: false,    //弹窗
            ossId: '',
            picId: "",
            vedioId: "",
            topic: "测试",
            payParam: {},
            hasQuestion: false,
            question:'',
            answer:''
        }
        this.canClick = true;
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

    addPhone = () => {
        this.setState({
            phoneList: [...this.state.phoneList, { phone: '', id: 'id' + new Date().getTime() }]
        })
    }


    sendInfo = () => {
        let { phoneList, areaValue, firstpw, secondpw, sendDate, hasError, hasQuestion,question,answer } = this.state;
        for (let i = 0; i < phoneList.length; i++) {
            if (!!phoneList[i].phone) {
                if (!/^1\d{10}/.test(phoneList[i].phone.replace(/\s/g, ''))) {
                    return Toast.fail(`第${i + 1}个手机格式有问题`);
                }
            } else {
                return Toast.fail(`第${i + 1}个手机号为空`);
            }
        }
        if (!areaValue) return Toast.fail("存储文字必填！");
        if (!firstpw) return Toast.fail("取消密码必填！");
        if (!secondpw) return Toast.fail("确认取消密码必填！");
        if (!sendDate) return Toast.fail("发送时间必填！");
        if (hasError) return Toast.fail("手机号格式错误");

        if (secondpw != firstpw) return Toast.fail("两次密码输入不一致！");
        if (hasQuestion && (!answer||!question)) {
            return Toast.fail("自定义问题和答案必填！");
        }
        var param = {
            mobile: phoneList.map(item=>item.phone.replace(/\s/g, '')).join(','),
            password: secondpw,
            topic: this.state.topic,
            text: areaValue,
            tokenUser: localStorage.getItem('tokenUser'),
            picId: this.state.picId,
            vedioId: this.state.vedioId,
            planTime: util.msecToString(new Date(this.state.sendDate).getTime(), "yyyyMMddHHmmss"),
            passwdAsk:question,
            passwdReply:answer
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
        return (<div className={style.container}>
            <div className={style.mian} hidden={(!this.state.isHiddenTextArea) || (!this.state.isHiddenPic)}>
                <h2 className={style.title}>选择发送对象 微信好友</h2>
                <WhiteSpace />
                {
                    this.state.phoneList.map((item, index) => {
                        return <PhoneInput key={item.id} index={index} phone={item.phone} changePhone={(phone) => {
                            let newList = this.state.phoneList;
                            newList[index].phone = phone;
                            this.setState({
                                phoneList: newList
                            })
                        }} delIndex={() => {
                            let newList = this.state.phoneList;
                            newList.splice(index, 1);
                            this.setState({
                                phoneList: newList
                            })
                        }} />
                    })
                }
                <div className={style.addPhone} hidden={this.state.phoneList.length == 5} onClick={this.addPhone}>
                    <div className={style.addIcon}>+</div>添加发送人
                    </div>
                <Flex>
                    <Flex.Item>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.setState({
                                    isHiddenTextArea: false
                                })
                            }}
                            style={{
                                marginLeft: 10
                            }}
                            inline>输入文字</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.setState({
                                    isHiddenPic: false
                                })
                            }}
                            style={{
                                marginLeft: 10
                            }}
                            inline>导入照片</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button
                            disabled
                            type="primary"
                            style={{
                                marginLeft: 10
                            }}
                            inline>导入视频</Button>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size='lg' />
                <DatePicker
                    minDate={new Date()}
                    minuteStep={5}
                    value={this.state.sendDate}
                    onChange={sendDate => this.setState({ sendDate })}>
                    <List.Item arrow="horizontal">设定发送时间</List.Item>
                </DatePicker>
                <WhiteSpace size='lg' />
                <InputItem maxLength='6' value={this.state.firstpw} onChange={firstpw => this.setState({ firstpw })} type="password" placeholder="****">设置取消密码</InputItem>
                <WhiteSpace size='lg' />
                <div className={style.passWordTips}>发送时间到达前，可凭此密码取消发送，密码输入错误，会导致系统立刻发送！只有一次机会！！不可逆！！！敬请牢记！！！如需长期保存建议</div>
                <WhiteSpace size='lg' />
                <InputItem maxLength='6' value={this.state.secondpw} onChange={secondpw => this.setState({ secondpw })} type="password" placeholder="****">再次确认密码</InputItem>
                <WhiteSpace size='lg' />
                <AgreeItem onChange={e => {
                    this.setState({
                        hasQuestion: e.target.checked
                    })
                }}>
                    是否要添加找回取消密码自定义问题
                    </AgreeItem>
                <div hidden={!this.state.hasQuestion}>
                    <InputItem placeholder="请输入自定义问题？" maxLength={25} value={this.state.question}
                        onChange={(question) => {
                            this.setState({
                                question
                            })
                        }}>自定义问题</InputItem>
                    <InputItem placeholder="请输入问题答案？" maxLength={10} value={this.state.answer}
                        onChange={(answer) => {
                            this.setState({
                                answer
                            })
                        }}>自定义答案</InputItem>
                </div>
                <WhiteSpace size='lg' />
                <Button disabled={!this.canClick} type="primary" onClick={this.sendInfo}>所有资料准备完毕，确认上传</Button>
            </div>
            {/* <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={() => { this.onClose('modal1') }}
                title="提示"
                footer={[{ text: 'Ok', onPress: () => { this.onClose('modal1') } }]}
            >
                <div>
                    您的资料已接收<br />
                    时间：**年**月**日**点**分<br />
                    将按照您设定的时间发送
                    </div>
            </Modal> */}
            <List hidden={this.state.isHiddenTextArea} renderHeader={() => '请输入文字资料'}>
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
                <WhiteSpace size='lg' />
                <div><Button onClick={() => {
                    this.setState({
                        isHiddenTextArea: true
                    })
                }} type="primary">输入完毕</Button></div>
            </List>
            <List hidden={this.state.isHiddenPic} renderHeader={() => '请选择上传照片'}>
                <ImagePickerExample userId={this.userId} getPicId={this.getPicId} />
                <WhiteSpace size='lg' />
                <div><Button onClick={() => {
                    this.setState({
                        isHiddenPic: true
                    })
                }} type="primary" >导入完毕</Button></div>
            </List>
        </div>
        )
    }
}