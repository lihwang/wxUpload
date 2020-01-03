/**
 * @description 历史记录
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import { Button,Modal,List,Toast,Icon} from 'antd-mobile';
import style from './styles/App.less';
import util from "commons/util";
const alert = Modal.alert;
import {infoList ,infoPut,payGet} from "api/api";
let status={
    3:'待发送',
    1:'发送成功'
}
export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            modal1:false,
            historyList:[],
            // 正在加载
            isLoading: false,

            // 没有更多资源
            noMoreResource: false,

            // 记录scrollview-height
            recordBoxHeight: window.innerHeight,
            offset:0
        }
    }

    onClose(key){
        this.setState({
        [key]: false,
        });
    }

        // 滚动
    onScroll=()=> {
        let bT = window.scrollY;// body滚动距离
        let bH = document.body.clientHeight;// body内容高度
        let wH = window.innerHeight;// 可视区域高
        if (bT + wH + 2 >= bH) { //到达底部时,加载新内容
            this.onEndReached();
        }
    }


    onEndReached=()=> {
        if (this.state.isLoading || this.state.noMoreResource) {
            return;
        }

        this.setState({
            isLoading: true
        });

        this.setState({
            offset: this.state.offset + 1
        }, () => {
            this.getRecords();
        })
    }

    httpCallBack(backDatas) {
        this.setState({
          isLoading: false
        });
    
        if (backDatas.length < 10) {
          this.setState({
            noMoreResource: true
          })
        } else {
          this.setState({
            noMoreResource: false
          })
        }
    }

    componentDidMount() {
        super.componentDidMount();
        document.addEventListener('scroll', this.onScroll);//添加监听滚动
        this.getRecords();
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll);//移除监听滚动
      }
    
    getRecords(){
        let param={
            type: "1",
            status:0,
            size: 10,
            offset: this.state.offset,
            tokenUser: localStorage.getItem('tokenUser'),
        }
        infoList(param).then(data=>{
            this.setState({
                historyList:[...this.state.historyList,...data.records],
            },()=>{
                this.httpCallBack(data.records)
            })
        })
    }

    onBridgeReady  = () => {
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
                    Toast.success("信息支付成功，消息会在指定时间发出！", 3000);
                    setTimeout(() => {
                        location.href = 'index.html';
                    }, 3000)
                } else {
                    location.href = "index.html";
                }
            });
    }
  
    render() {
        return (
            <div className={style.container}>
              <h2 className={style.title}>未完成发送操作（按时间顺序）</h2>
              <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
                  {
                      this.state.historyList.length ? this.state.historyList.map((item,index)=>{
                        return <List.Item key={index}
                            extra={<Button type="warning" size="small" style={{verticalAlign: 'sub'}} inline  onClick={()=>{
                            alert('提示', '是否确认删除该数据？', [
                                { text: '取消'},
                                { text: '确认', onPress: () =>{
                                    var param = {
                                        type: "1",
                                        remove: "1",
                                        status: "4",
                                        serialNo: item.serialNo,
                                        tokenUser: localStorage.getItem('tokenUser'),
                                    };
                                    infoPut(param).then(data=>{
                                        Toast.success('删除成功');
                                        let historyList=this.state.historyList;
                                        historyList.splice(index,1);
                                        this.setState({
                                            historyList:historyList
                                        })
                                    })
                                }},
                              ])
                        }}>删除</Button>}
                        multipleLine
                        >
                        <Button style={{marginRight:'10px',verticalAlign: 'top',marginTop:'20px'}} onClick={()=>{
                            window.location.href='recive.html'
                        }} className={style.x_left} type="ghost" size="small" inline onClick={()=>{
                            let param={
                                payOrderNo:item.payOrderNo,
                                tokenUser: localStorage.getItem('tokenUser'),
                                type:'1',
                            }

                            payGet(param).then(data=>{
                                let payParam=JSON.parse(data.records[0].payargs);
                                this.setState({
                                    payParam
                                },()=>{
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
                            })
                        }}>去支付</Button>
                            <div style={{fontSize: 28,display:'inline-block'}} onClick={()=>{
                            window.location.href = "recive.html?from=notSend&serialNo=" + item.serialNo
                        }}>
                                <span>{item.createTime}{status[item.status]?(' | '+status[item.status]):''}</span><br/>
                                <span>序列号:{item.serialNo}</span>
                            </div>
                        </List.Item>
                      }):<div style={{textAlign:'center',padding:30}}>
                          <div><Icon type="cross-circle" size="large" /></div>
                            <div>暂无数据</div>
                          </div>
                  }
            </List>
            </div>
        )
    }
}