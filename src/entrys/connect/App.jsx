/**
 * @description 首页
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import style from './styles/App.less';
import { Button, WhiteSpace, WingBlank,Toast} from 'antd-mobile';
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
                            <div className={style.sub}>一、400电话</div>
                            <Button onClick={()=>{
                                copy('400xxx xxx');
                                window.location.href = "tel://10086";
                            }} type="ghost" className='am-button-borderfix'>400xxx xxx </Button>
                            <WhiteSpace size='lg'/>
                            <div className={style.sub}>二、电子邮箱</div>
                            <Button type="ghost" onClick={()=>{
                                  copy('18626882775@wo.cn');
                                  Toast.success("复制成功");
                            }}>18626882775@wo.cn</Button>
                            <WhiteSpace size='lg'/>
                            <div className={style.sub}>三、微信号</div>
                            <Button type="ghost" onClick={()=>{
                                  copy('wxid_bjtz9sawzeyd22');
                                  Toast.success("复制成功");
                            }}>wxid_bjtz9sawzeyd22</Button>
                            <WhiteSpace size='lg'/>
                        </WingBlank>
                </div>
            </div>
        )
    }
}