/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import {
    List,
    DatePicker,
    Flex,
    Button,
    InputItem,
    WhiteSpace,TextareaItem,Modal,Toast
} from 'antd-mobile';
import ImagePickerExample from './ImagePickerExample'
import util from "commons/util";

import { info} from "api/api";
export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            phone:'17602154326',   //手机号
            sendDate: new Date,   //发送时间
            cancelDate: '', //取消时间
            firstpw:'12',     //第一次密码
            secondpw:'12',   //第二次密码
            areaValue:'1',  //文本域值
            isHiddenTextArea:true, //文本域隐藏
            isHiddenPic:true, //照片显示隐藏
            modal1:false,    //弹窗
            hasError:true,  //手机号错误
            ossId:'',
            picId: "",
            vedioId: "",
            topic: "测试",
            payParam: {}
        }
    }

    componentDidMount() {
      super.componentDidMount();
    }


    onClose(key){
        this.setState({
        [key]: false,
        });
    }

    getPicId=(picId)=>{
        this.setState({
            picId:picId
        })
    }

    onChange = (phone) => {
        if (phone.replace(/\s/g, '').length < 11) {
          this.setState({
            hasError: true,
          });
        } else {
          this.setState({
            hasError: false,
          });
        }
        this.setState({
          phone
        });
    }

    sendInfo=()=>{
        if (!this.state.areaValue) return Toast.fail("存储文字必填！");
        if (!this.state.phone) return Toast.fail("手机号必填！");
        if (!this.state.firstpw) return Toast.fail("取消密码必填！");
        if (!this.state.secondpw) return Toast.fail("确认取消密码必填！");
        if (!this.state.sendDate) return Toast.fail("发送时间必填！");
        if (this.state.hasError) return Toast.fail("手机号格式错误");

        if(this.state.secondpw!=this.state.firstpw) return Toast.fail("两次密码输入不一致！");
        var param = {
            mobile: this.state.phone.replace(/\s+/g, ""),
            userId: this.userId,
            password: this.state.secondpw,
            topic: this.state.topic,
            text: this.state.areaValue,
            picId: this.state.picId,
            vedioId: this.state.vedioId,
            planTime:util.msecToString(new Date(this.state.sendDate).getTime(), "yyyyMMddHHmm")
        };
        info(param).then(res=>{
            this.setState({
                payParam:res
            },()=>{
                Toast.success("信息发送成功！");
            })
        },(error)=>{
            if(error&&error.code==10020){
                Toast.fail("您输入的好友未注册，请提示好友注册！");
            }else{
                error&&error.message&&Toast.fail(error.message);
            }
        })
    }

    render() {
        return (<div className={style.container}>
                <div className={style.mian} hidden={(!this.state.isHiddenTextArea)||(!this.state.isHiddenPic)}>
                    <h2 className={style.title}>选择发送对象 微信好友</h2>
                    <WhiteSpace/>
                    <InputItem type="phone" 
                        onChange={this.onChange}
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        value={this.state.phone}
                        clear placeholder="1** **** ****">手机号：</InputItem>
                    <WhiteSpace size='lg'/>
                    <Flex>
                        <Flex.Item>
                            <Button
                                type="primary"
                                onClick={()=>{
                                    this.setState({
                                        isHiddenTextArea:false
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
                                onClick={()=>{
                                    this.setState({
                                        isHiddenPic:false
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
                    <WhiteSpace size='lg'/>
                    <DatePicker
                        minuteStep={5}
                        value={this.state.sendDate}
                        onChange={sendDate => this.setState({sendDate})}>
                        <List.Item arrow="horizontal">设定发送时间</List.Item>
                    </DatePicker>
                    <WhiteSpace size='lg'/>
                    <DatePicker
                        minuteStep={5}
                        value={this.state.sendDate}
                        onChange={sendDate => this.setState({sendDate})}>
                        <List.Item arrow="horizontal">设定取消提醒</List.Item>
                    </DatePicker>
                    <WhiteSpace size='lg'/>
                    <InputItem maxLength='6' value={this.state.firstpw}  onChange={firstpw => this.setState({firstpw})} type="password" placeholder="****">密码</InputItem>
                    <WhiteSpace size='lg'/>
                    <InputItem maxLength='6' value={this.state.secondpw} onChange={secondpw => this.setState({secondpw})} type="password" placeholder="****">再次输入密码</InputItem>
                    <WhiteSpace size='lg'/>
                    <div>密码输错一次视为立即发送</div>
                    <WhiteSpace size='lg'/>
                    <Button type="primary" onClick={this.sendInfo}>所有资料准备完毕，确认上传</Button>
                </div>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={()=>{this.onClose('modal1')}}
                    title="提示"
                    footer={[{ text: 'Ok', onPress: () => { this.onClose('modal1')} }]}
                    >
                    <div>
                    您的资料已接收<br/>
                    时间：**年**月**日**点**分<br/>
                    将按照您设定的时间发送
                    </div>
                    </Modal>
                <List hidden={this.state.isHiddenTextArea} renderHeader={() => '请输入文字资料'}>
                    <TextareaItem
                    placeholder='请输入内容'
                    rows={15}
                    count={300}
                    value={this.state.areaValue}
                    onChange={(areaValue)=>{
                        this.setState({
                            areaValue
                        })
                    }}
                />
                <WhiteSpace size='lg'/>
                <div><Button onClick={()=>{
                    this.setState({
                        isHiddenTextArea:true
                    })
                }} type="primary">输入完毕</Button></div>
                </List>
                <List hidden={this.state.isHiddenPic} renderHeader={() => '请选择上传照片'}>
                    <ImagePickerExample userId={this.userId} getPicId={this.getPicId}/>
                    <WhiteSpace size='lg'/>
                    <div><Button onClick={()=>{
                          this.setState({
                            isHiddenPic:true
                        })
                    }} type="primary" >导入完毕</Button></div>
                </List>
            </div>
        )
    }
}