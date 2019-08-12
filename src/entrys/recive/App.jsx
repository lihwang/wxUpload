/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import { Button, Badge, Tabs,TextareaItem,List,WhiteSpace, DatePicker,WingBlank,Modal,Toast} from 'antd-mobile';
import util from "commons/util";
import ImagePickerExample from '../send/ImagePickerExample'
import {infoGet,infoPut} from "api/api";
import {ossGet} from 'api/api_oss'
const alert = Modal.alert;
export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            isSave:false,
            sendDate:'',
            sendData:{},
            imgSrc:''
        }
    }

 
    //下载数据
    downLoad=()=>{

    }

    componentDidMount() {
        super.componentDidMount();
        let param = {
            serialNo: util.parseUrl(location.href).params.serialNo,
            userId: util.getCookie("userId"),
        };
        infoGet(param).then(data=>{
            var ossParam = {
                userId: util.getCookie("userId"),
                ossId: data.picId
            };
            this.setState({
                sendData: data,
            }) 
            ossGet(ossParam).then(res=>{
                this.setState({
                    imgSrc: "http://msg-upyun.linkmsg.net" + res.path
                }) 
            },(error)=>{
                if(error.code==10010){
                    this.setState({
                        imgSrc:''
                    })
                }
            })
        })
    }

   
    render() {
        let tabs = [
            { title: <Badge>文字</Badge> },
            { title: <Badge>图片</Badge> },
        ];
        if(!this.state.imgSrc){
            tabs = [
                { title: <Badge>文字</Badge> },
            ];
        }
        let from=util.parseUrl(location.href).params.from;
        
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
                            <ImagePickerExample  currentPic={this.state.imgSrc}/>
                        </List>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                        </div>
                    </Tabs>
                        <div hidden={from=='notSend'} className={style.actionBtn}>
                            <Button type="primary" size="small" inline style={{ marginRight: '40px' }} onClick={()=>{this.setState({isSave:true})}}>保存</Button>
                            <Button type="primary" size="small" inline style={{ marginRight: '40px' }} onClick={()=>{
                                      alert('提示', '是否确认删除该数据？', [
                                        { text: '取消'},
                                        { text: '确认', onPress: () =>{
                                            var param = {
                                                type: "1",
                                                remove: "1",
                                                status: "4",
                                                serialNo: util.parseUrl(location.href).params.serialNo,
                                                userId: util.getCookie("userId")
                                            };
                                            infoPut(param).then(data=>{
                                                Toast.success('删除成功',1000);
                                                setTimeout(()=>{
                                                    location.href=util.parseUrl(location.href).params.from+'.html';
                                                })
                                            },(error)=>{
                                                error&&error.message&&Toast.fail(error.message);
                                            })
                                        }},
                                      ])
                            }}>删除</Button>
                        </div>
                </div>
                <div className={style.savePage} hidden={!this.state.isSave}>
                    <WingBlank>
                        <div className={style.tips}>
                            您所需要保存的资料已确定，请设置保存时限
                        </div>
                        <WhiteSpace size='lg'/>
                            <DatePicker
                                minuteStep={5}
                                value={this.state.sendDate}
                                onChange={sendDate => this.setState({sendDate})}>
                                <List.Item arrow="horizontal">保存至</List.Item>
                            </DatePicker>
                        <WhiteSpace size='lg'/>
                        <div className={style.payTips}>
                            您所需要保存的资料**M,保存时长**时**分<br/>需要支付**元
                        </div>
                        <WhiteSpace size='lg'/>
                        <Button type="primary" onClick={()=>{
                            
                        }}>微信支付</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}