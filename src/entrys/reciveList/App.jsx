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
            modal1:false,
            historyList:[]
        }
    }

    onClose(key){
        this.setState({
        [key]: false,
        });
    }

    componentDidMount() {
        super.componentDidMount();
        this.getList();
    }
    
    getList(){
        let param={
            type: "2",
            toUserId:util.getCookie("userId"),
            size: 200,
            offset: 0
        }
        infoList(param).then(data=>{
            this.setState({
                historyList:data.records
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
                                        this.getList();
                                    })
                                }},
                              ])
                        }}>删除</Button>}
                        multipleLine
                        >
                        <Button style={{verticalAlign: 'middle',marginRight:'10px'}} onClick={()=>{
                            window.location.href='recive.html'
                        }} className={style.x_left} type="ghost" size="small" inline onClick={()=>{
                            window.location.href = "recive.html?from=reciveList&serialNo=" + item.serialNo
                        }}>查看</Button>
                        {item.createTime}
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