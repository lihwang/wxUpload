/**
 * @description 历史记录
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import { Button,Modal,List,Toast,Icon} from 'antd-mobile';
import style from './styles/App.less';
import util from "commons/util";
const alert = Modal.alert;
import {infoList ,infoPut} from "api/api";

export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
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
    onScroll=()=> {
        let bT = window.scrollY;// body滚动距离
        let bH = document.body.clientHeight;// body内容高度
        let wH = window.innerHeight;// 可视区域高
        console.log(bT, wH , bH)
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

    onClose(key){
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

    getRecords(){
        let param={
            type: "2",
            toUserId:util.getCookie("userId"),
            size: 10,
            offset: this.state.offset
        }
        infoList(param).then(data=>{
            this.setState({
                historyList:[...this.state.historyList,...data.records]
            },()=>{
                this.httpCallBack(data.records)
            })
        })
    }
  
    render() {
        return (
            <div className={style.container}>
              <h2 className={style.title}>接收资料目录（按时间顺序）</h2>
              <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
                  {
                      this.state.historyList.length ? this.state.historyList.map((item,index)=>{
                        return <List.Item key={index}
                            extra={<Button type="warning" size="small" inline onClick={()=>{
                            alert('提示', '是否确认删除该数据？', [
                                { text: '取消'},
                                { text: '确认', onPress: () =>{
                                    var param = {
                                        type: "2",
                                        remove: "1",
                                        status: "4",
                                        serialNo: item.serialNo,
                                        userId: util.getCookie("userId")
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
                            window.location.href = "recive.html?from=reciveList&serialNo=" + item.serialNo
                        }}>查看</Button>
                            <div style={{fontSize: 28,display:'inline-block'}}>
                                <span>{item.createTime}</span><br/>
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