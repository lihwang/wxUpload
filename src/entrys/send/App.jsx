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
    WhiteSpace,TextareaItem,Modal
} from 'antd-mobile';
import ImagePickerExample from './ImagePickerExample'

export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',   //手机号
            sendDate: '',   //发送时间
            cancelDate: '', //取消时间
            firstpw:'',     //第一次密码
            secondpw:'',   //第二次密码
            areaValue:'',  //文本域值
            isHiddenTextArea:true, //文本域隐藏
            isHiddenPic:true, //照片显示隐藏
            modal1:false,    //弹窗
            hasError:true  //手机号错误
        }
    }

    componentDidMount() {
      super.componentDidMount();
    }

    componentDidUpdate() {
        
    }

    onClose(key){
        this.setState({
        [key]: false,
        });
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
          phone,
        });
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
                    <Button type="primary" onClick={()=>{
                        this.setState({
                            modal1:true
                        })
                    }}>所有资料准备完毕，确认上传</Button>
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
                    <ImagePickerExample/>
                    <WhiteSpace size='lg'/>
                    <div><Button onClick={()=>{
                    this.setState({
                        isHiddenPic:true
                    })
                }} type="primary">导入完毕</Button></div>
                </List>
            </div>
        )
    }
}