/**
 * @description 首页
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import style from './styles/App.less';
import { Button, WhiteSpace, WingBlank} from 'antd-mobile';
import {Toast} from 'antd-mobile';

import util from "commons/util";
//api
import {oauth2,queryUser } from "api/api";
export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    componentDidMount() {
        super.componentDidMount();
        

    }
  
    render() {
        return (
            <div className={style.container}>
                <h2 className={style.title}>天易智联时光胶囊</h2>
                <div className={style.cont}>
                        <WingBlank>
                            <Button onClick={()=>{
                                window.location.href='./send.html';
                            }} type="primary">我要发送</Button><WhiteSpace size='lg'/>
                            <Button type="ghost" onClick={()=>{
                                window.location.href = "./reciveList.html"
                            }} className='am-button-borderfix'>我要接收</Button><WhiteSpace size='lg'/>
                            <Button onClick={()=>{
                                location.href="./connect.html"
                            }}>联系我们</Button><WhiteSpace size='lg'/>
                            <Button onClick={()=>{
                                window.location.href='./history.html';
                            }} type="ghost">我要查询历史保存资料</Button><WhiteSpace size='lg'/>
                            <Button onClick={()=>{
                                location.href="./usage.html"
                            }}>使用说明</Button><WhiteSpace size='lg'/>
                            <Button type="warning" onClick={()=>{
                                window.location.href='./notSend.html';
                            }}>取消发送</Button><WhiteSpace size='lg'/>
                        </WingBlank>
                </div>
            </div>
        )
    }
}