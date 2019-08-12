/**
 * @description 取消发送
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import { Button,Modal,List,Toast,Icon} from 'antd-mobile';
import style from './styles/App.less';
import util from "commons/util";
const prompt = Modal.prompt;
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
            type: "1",
            userId:util.getCookie("userId"),
            size: 200,
            offset: 0,
            status:'3'
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
              <h2 className={style.title}>取消发送（按时间顺序）</h2>
              <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
                  {
                      this.state.historyList.length ? this.state.historyList.map((item,index)=>{
                        return <List.Item key={index}
                            extra={<Button type="warning" size="small" inline onClick={()=>{
                            prompt('提示', '是否确认取消该数据？', (password)=>{
                                var param = {
                                    type: "1",
                                    status: "2",
                                    serialNo: item.serialNo,
                                    userId: util.getCookie("userId"),
                                    password:password
                                };
                                infoPut(param).then(data=>{
                                    Toast.success('取消成功');
                                    this.getList();
                                },(error)=>{
                                    error&&error.message&&Toast.fail(error.message);
                                })
                            },'secure-text','',['请输入取消密码'])
                        }}>取消</Button>}
                        multipleLine
                        >
                        <Button style={{marginRight:'10px',verticalAlign: 'top',marginTop:'20px'}} onClick={()=>{
                            window.location.href='recive.html'
                        }} className={style.x_left} type="ghost" size="small" inline onClick={()=>{
                            window.location.href = "recive.html?from=notSend&serialNo=" + item.serialNo
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