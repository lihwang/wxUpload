/**
 * @description 首页
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import style from './styles/App.less';

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
                <div className={style.content}>
                    <div className={style.main}>本公众号通过“定时发送，密码取消”的模式来保护隐私信息的传递。</div>
                    <div className={style.subTitle} style={{ marginTop: '32px' }}>发送方法：</div>
                    <div className={style.cont}>把需要传达的信息，通过公众号里的“我要发送”输入，再输入接收方手机号，定时好发送时间，然后设置好取消密码。<span>（注意！这个密码是用于取消发送的。如果在发送之前，不想发送了，就输入密码取消）。</span> 密码必须一次输入正确，否则之前输入的信息会立刻发送。</div>
                    <div className={style.subTitle} style={{ marginTop: '18px' }}>比如：</div>
                    <div className={style.cont}>上飞机前，输入信息，预设发送时间，下飞机安全了，可以在发送时间到达之前，取消发送</div>
                    <div className={style.subTitle} style={{ marginTop: '32px' }}>接收方法：</div>
                    <div className={style.cont}>接收人在收到【天易智联】官方短信通知后，上微信搜索“天易智联时光胶囊”公众号，关注并进入时间胶囊，点击“我要接收”，输入序列号查收。</div>
                    <div className={style.subTitle} style={{ marginTop: '32px' }}>我要发送：</div>
                    <div className={style.cont}>关注公众号～注册～点击时间胶囊～我要发送～输入接收人电话号码～输入文案 / 图片 / 视频～设定发送时间～设定取消密码～再次输入密码～点击“所有资料准备完毕，确认上传”～进入微信支付页面完成支付。</div>
                    <div className={style.subTitle} style={{ marginTop: '32px' }}>我要接收：</div>
                    <div className={style.cont}>系统会按照发送方用户的时间设定给接收人发送短信。接收人收到短信之后，登录微信，搜索《天易智联时光胶囊》公众号～关注～注册～点击时间胶囊～进入“我要接收”，输入短信里附带的序列号查看。</div>
                    <div className={style.subTitle} style={{ marginTop: '32px' }}>未完成发送：</div>
                    <div className={style.cont}>发送人在操作“我要发送”过程中，因意外导致未完成支付，系统保留2小时的待续时长。2小时内可以继续操作，发送内容和接收人手机号不可更改。</div>
                    <div className={style.subTitle} style={{ marginTop: '32px' }}>保存信息：</div>
                    <div className={style.cont}>接收人在“我要接收”里查看信息以后，可以申请本公司的公众号后台系统帮助保存信息。只要点击“保存”，设置好需要保存的时长，就可以完成支付。每条信息都有48小时免费保存时长。超过48小时才会收费。保存时长到期，还可以续费，继续保存。到期不续费的本公司的公众号系统自动将信息删除。接收人可以将历史保留信息删除。所有信息由序列号和时间记录区别。</div>
                    <div className={style.subTitle} style={{ marginTop: '32px' }}>取消发送：</div>
                    <div className={style.cont}>发送人用户可以点击进入“取消发送”页面，找到之前发送的列表，确认哪一条列表不想发送了，输入当时操作“我要发送”时设置好的密码，取消发送命令。密码必须一次性输入正确。重点提示！！如果输入错误密码，系统自动判断发送人失去人身自由，会立刻发送短信给接收人，并且不做任何提示。只有一次机会！。</div>
                </div>
            </div>
        )
    }
}