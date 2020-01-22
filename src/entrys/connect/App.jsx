/**
 * @description 首页
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import style from './styles/App.less';
import { Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
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
                <div className={style.title}>联系方式</div>
                <div className={style.mainInfo}>
                    <div className={style.sub}>一、400电话</div>
                    <div className={style.connect}>
                        <div>400 866 543</div>
                        <div className={style.operate} onClick={() => {
                            window.location.href = "tel://400866543";
                        }}>拨打</div>
                    </div>
                    <div className={style.sub}>二、电子邮箱</div>
                    <div className={style.connect}>
                        <div>18626882775@wo.cn</div>
                        <div className={style.operate} onClick={() => {
                            copy('18626882775@wo.cn');
                            Toast.success("复制成功");
                        }}>复制</div>
                    </div>
                    <div className={style.sub}>三、微信号</div>
                    <div className={style.connect}>
                        <div>18626882775@wo.cn</div>
                        <div className={style.operate} onClick={() => {
                            copy('wxid_bjtz9sawzeyd22');
                            Toast.success("复制成功");
                        }}>复制</div>
                    </div>
                </div>
            </div>
        )
    }
}