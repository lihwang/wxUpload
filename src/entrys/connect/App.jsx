/**
 * @description 首页
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import style from './styles/App.less';
import { Button, WhiteSpace, WingBlank} from 'antd-mobile';
import {Toast} from 'antd-mobile';
import util from "commons/util";
import copy from 'copy-to-clipboard';

//api
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
                <h2 className={style.title}>联系方式</h2>
                <div className={style.cont}>
                        <WingBlank>
                            <div className={style.sub}>-、400电话</div>
                            <Button onClick={()=>{
                                copy('400xxx xxx');
                            }} type="ghost" className='am-button-borderfix'>400xxx xxx </Button>
                            <WhiteSpace size='lg'/>
                            <div className={style.sub}>二、电子邮箱</div>
                            <Button type="ghost" onClick={()=>{
                                  copy('18626882775@wo.cn');
                            }}>18626882775@wo.cn</Button>
                            <WhiteSpace size='lg'/>
                            <div className={style.sub}>三、微信号</div>
                            <Button type="ghost" onClick={()=>{
                                  copy('wxid_bjtz9sawzeyd22');
                            }}>wxid_bjtz9sawzeyd22</Button>
                            <WhiteSpace size='lg'/>
                        </WingBlank>
                </div>
            </div>
        )
    }
}