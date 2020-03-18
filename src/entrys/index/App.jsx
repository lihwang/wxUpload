/**
 * @description 首页
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import style from './styles/App.less';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Toast } from 'antd-mobile';

import util from "commons/util";
//api
import { infoList } from "api/api";
let openid = util.parseUrl(location.href).params.openid || '';
//image
import titleIcon from 'images/title_icon.png'
export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            hasUnfinished: false
        };
    }


    componentDidMount() {
        super.componentDidMount();
        setTimeout(() => {
            let param = {
                type: "1",
                status: 0,
                size: 10,
                offset: 0,
                tokenUser: sessionStorage.getItem('tokenUser'),
            }
            if (param.tokenUser) {
                infoList(param).then(data => {
                    if (data.records && data.records.length) {
                        this.setState({
                            hasUnfinished: true
                        })
                    }

                })
            }

        }, 1000)
    }

    render() {
        let { hasUnfinished } = this.state;
        return (
            <div className={style.container}>
                <h2 className={style.title}>天易智联<img src={titleIcon} />时光胶囊</h2>
                <div className={style.content}>
                    <div className={style.sendIcon} onClick={() => {
                        window.location.href = './send.html';
                    }}>我要发送</div>
                    <div className={style.reciveIcon} onClick={() => {
                        window.location.href = "./reciveList.html"
                    }}>我要接收</div>
                    <div className={style.unfinished} onClick={() => {
                        window.location.href = './history.html';
                    }}>未完成发送操作（仅保留两小时）
                    {hasUnfinished && <div className={style.dotTips}></div>}
                    </div>
                    <div className={style.saveInfo} onClick={() => {
                        window.location.href = './payList.html';
                    }}>保存信息</div>
                    <div className={style.cancelSend} onClick={() => {
                        window.location.href = './notSend.html';
                    }}>取消发送</div>
                    <div className={style.usage} onClick={() => {
                        location.href = "./usage.html"
                    }}>使用说明</div>
                    <div className={style.connect} onClick={() => {
                        location.href = "./connect.html"
                    }}>联系我们</div>
                </div>
            </div>
        )
    }
}