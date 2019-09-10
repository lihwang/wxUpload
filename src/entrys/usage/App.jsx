/**
 * @description 首页
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import style from './styles/App.less';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Toast } from 'antd-mobile';
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
                <h2 className={style.title}>使用说明</h2>
                <div className={style.cont}>
                    <div className={style.main}>本公众号通过“定时发送，密码取消”的模式来保护隐私信息的传递。</div>
                    <p>发送方法：把需要传达的信息，通过公众号里的“我要发送”输入，再输入接收方手机号，定时好发送时间，然后设置好取消密码。（注意！这个密码是用于取消发送的。如果在发送之前，不想发送了，就输入密码取消）。
                    密码必须一次输入正确，否则之前输入的信息会立刻发送。比如：上飞机前，输入信息，预设发送时间，下飞机安全了，可以在发送时间到达之前，取消发送</p>
                    <p>接收方法：接收人在收到【天易智联】官方短信通知后，上微信搜索“天易智联时光胶囊”公众号，关注并进入时间胶囊，点击“我要接收”，输入序列号查收。</p>
                </div>
            </div>
        )
    }
}