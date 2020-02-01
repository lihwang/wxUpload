/**
 * @description 历史记录
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import { Button, Modal, List, Toast, Icon, InputItem } from 'antd-mobile';
import style from './styles/App.less';
import classnames from 'classnames'
import util from "commons/util";
const alert = Modal.alert;
import { infoList, infoPut, infoGet } from "api/api";
//image
import nodata from 'images/nodata.png'
import receiveItem from 'images/receiveItem.png'
export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
            serialNo: '',
            historyList: [],
            // 正在加载
            isLoading: false,

            // 没有更多资源
            noMoreResource: false,

            // 记录scrollview-height
            recordBoxHeight: window.innerHeight,
            offset: 0
        }
    }
    // 滚动
    onScroll = () => {
        let bT = window.scrollY;// body滚动距离
        let bH = document.body.clientHeight;// body内容高度
        let wH = window.innerHeight;// 可视区域高
        if (bT + wH + 2 >= bH) { //到达底部时,加载新内容
            this.onEndReached();
        }
    }


    onEndReached = () => {
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

    onClose(key) {
        this.setState({
            [key]: false,
        });
    }

    componentDidMount() {
        super.componentDidMount();
        document.addEventListener('scroll', this.onScroll);//添加监听滚动
        this.getRecords();
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll);//移除监听滚动
    }

    getRecords() {
        let param = {
            type: "2",
            size: 10,
            offset: this.state.offset,
            tokenUser: sessionStorage.getItem('tokenUser'),
        }
        infoList(param).then(data => {
            this.setState({
                historyList: [...this.state.historyList, ...data.records]
            }, () => {
                this.httpCallBack(data.records)
            })
        })
    }

    querySerialNo = () => {
        let { serialNo } = this.state;
        let param = {
            serialNo: serialNo,
            tokenUser: sessionStorage.getItem('tokenUser'),
            type: "2"
        };
        infoGet(param).then(data => {
            window.location.href = "recive.html?from=reciveList&serialNo=" + serialNo
        }, () => {
            Toast.fail('此序列号不存在！')
        })
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.title}>接收资料目录（按时间顺序）</div>
                <div className={style.queryInput}>
                    <InputItem type="number"
                        className={classnames(style.queryNo)}
                        maxLength={12}
                        onChange={(serialNo) => {
                            this.setState({
                                serialNo
                            })
                        }}
                        value={this.state.serialNo}
                        placeholder="请输入内容">序列号</InputItem>
                    <div className={style.queryBtn} onClick={this.querySerialNo}>查询</div>
                </div>
                <div className={style.listTips}>已收消息（每条消息只保留<span>48</span>小时）</div>
                <div className={style.receiveList}>
                    {
                        this.state.historyList.length ? this.state.historyList.map((item, index) => {
                            return <div className={style.receiveItem} key={item.serialNo}>
                                <img src={receiveItem} onClick={() => {
                                    window.location.href = "recive.html?from=reciveList&serialNo=" + item.serialNo
                                }} />
                                <div className={style.info} onClick={() => {
                                    window.location.href = "recive.html?from=reciveList&serialNo=" + item.serialNo
                                }}>
                                    <div className={style.serialNo}>序列号:{item.serialNo}</div>
                                    <div className={style.time}>{item.createTime}</div>
                                </div>
                                <div className={style.delItem} onClick={() => {
                                    alert('提示', '是否确认删除该数据？', [
                                        { text: '取消' },
                                        {
                                            text: '确认', onPress: () => {
                                                var param = {
                                                    type: "2",
                                                    remove: "1",
                                                    status: "4",
                                                    serialNo: item.serialNo,
                                                    tokenUser: sessionStorage.getItem('tokenUser'),
                                                    userId: util.getCookie("userId")
                                                };
                                                infoPut(param).then(data => {
                                                    Toast.success('删除成功');
                                                    let historyList = this.state.historyList;
                                                    historyList.splice(index, 1);
                                                    this.setState({
                                                        historyList: historyList
                                                    })
                                                })
                                            }
                                        },
                                    ])
                                }}>删除</div>
                            </div>
                        }) : <div style={{ textAlign: 'center', padding: '0 30px' }}>
                                <div style={{ marginTop: '300px' }}><img src={nodata} alt="" /></div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}