/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/Agreement.less';
import util from "commons/util";
import { Button } from 'antd-mobile';
//api
export default class Agreement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        util.setPageTitle('服务协议');
    }




    render() {
        return (<div className={style.container}>
            <div className={style.title}>服务协议</div>
            <div className={style.content}>
                <div>本服务协议，由天易智联网络科技有限公司（以下简称本公司），针对本公司开发的公众号《天易智联时光胶囊》设置。凡用户使用本公众号，必须同意本协议。否则恕不提供服务！本协议会因为客观原因，不断修改，并且重新发布。恳请用户不定期光顾本页面，以确保对本公司最新版本的了解。</div>
                <div>本协议分六个部分。一隐私政策。二，用户权力。三，用户义务。四，使用方法。五，免责条款。六，联系我们。</div>
                <div className={style.sub}>一，隐私政策。出于为用户完成服务的需要，本公司需要收集用户基本信息。（否则无法提供服务）</div>
                <p>（1.1）本公司收集哪些用户信息：用户手机号码，用户微信号，用户联系对象的手机号，微信号。</p>
                <p>（1.2）本公司如何使用信息：只局限于帮助用户完成指定的隐私信息传递。除此之外绝对保密。</p>
                <p>（1.3）用户需要传递的隐私信息，本公司不过问，不查看。只在用户指定时间内帮助保存。并且在用户以及用户指定对象的操作下，执行相关操作。比如查看，留档保存，或者删除等等。用户以及用户指定对象操作删除的情况下，本公司会将相应信息删除，并且不留档。</p>
                <div className={style.sub}>二，用户权力。</div>
                <p>（2.1）当用户确认本协议以后，用户可以使用《天易智联时光胶囊》公众号所有功能。当遇到操作困难时，可以电联联系本公司400电话（暂未开通），请求帮助。</p>
                <p>（2.2）当由于本公司原因，因非不可抗力，无法按照用户要求完成信息传递，用户可以要求索赔，具体赔偿金额由本公司所在地法院裁定。并且退还公众号收取的费用。（不含利息）。</p>
                <p>（2.3）由于本公司的原因，因非不可抗力，造成隐私内容泄密，本公司承担赔偿责任，具体赔偿金额，由本公司所在地法院裁定。并且退还公众号收取的费用。（不含利息）</p>
                <div className={style.sub}>三，用户义务。</div>
                <p>（3.1）用户必须遵守中华人民共和国法律。禁止使用本公众号发送违反法律和公序良俗的内容。包括（并且不限于）反动，反国家政策，不利于民族团结，黄色，宣扬暴力，宣扬封建迷信，对个人和团体的造谣诬陷，等等。如发送对象所处国度（地区）处于中国以外的地方，所发送内容也要符合所发送对象所处地的法律和民俗。任何违反法律的后果，由客户自行负责。</p>
                <p>（3.2）用户必须保护好自己的隐私。所需要传递的隐私信息，序列号，验证码，都在保密范围。用户和用户指定的接收对象，都必须保护好以上关键信息。</p>
                <p>（3.3）本公司和任何第三方，包括（并且不限于）电信公司和腾讯公司都不会对用户以及用户指定接收对象索要隐私内容，序列号，验证码。所有索要隐私内容，序列号，验证码的都是诈骗。由此造成的损失，由用户以及用户指定对接收象自己承担。</p>
                <div className={style.sub}>四，使用方法</div>
                <p>（4.1）我要发送：关注公众号～注册～点击时间胶囊～我要发送～输入接收人电话号码～输入文案 / 图片 / 视频～设定发送时间～设定取消密码～再次输入密码～点击“所有资料准备完毕，确认上传”～进入微信支付页面完成支付。</p>
                <p>（4.2）我要接收：系统会按照发送方用户的时间设定给接收人发送短信。接收人收到短信之后，登录微信，搜索《天易智联时光胶囊》公众号～关注～注册～点击时间胶囊～进入“我要接收”，输入短信里附带的序列号查看。</p>
                <p>（4.3）“未完成发送”。发送人在操作“我要发送”过程中，因意外导致未完成支付，系统保留2小时的待续时长。2小时内可以继续操作，发送内容和接收人手机号不可更改。</p>
                <p>（4.4）保存信息：接收人在“我要接收”里查看信息以后，可以申请本公司的公众号后台系统帮助保存信息。只要点击“保存”，设置好需要保存的时长，就可以完成支付。每条信息都有48小时免费保存时长。超过48小时才会收费。保存时长到期，还可以续费，继续保存。到期不续费的本公司的公众号系统自动将信息删除。接收人可以将历史保留信息删除。所有信息由序列号和时间记录区别。</p>
                <p>（4.5）取消发送：发送人用户可以点击进入“取消发送”页面，找到之前发送的列表，确认哪一条列表不想发送了，输入当时操作“我要发送”时设置好的密码，取消发送命令。密码必须一次性输入正确。重点提示！！如果输入错误密码，系统自动判断发送人失去人身自由，会立刻发送短信给接收人，并且不做任何提示。只有一次机会！</p>
                <div className={style.sub}>五，收费和退费规则</div>
                <p>（5.1）收费：收费标准为流量x时间x¥+0.2=费用。流量计量标准以上传内容的某个阶段产生的流量为标准。时间以支付完毕时间为标准。</p>
                <p>（5.2）设置起步价。1M X 3天之内的，起步价0.3元。超出部分按照每个单位0.05元计算收费。</p>
                <p>（5.3）保存费 接收到的资讯，接收人可以选择保存。保存费按照1M1天0.05元计算。不设起步价。续保同样。</p>
                <p>（5.4）退费规则：为保证发送人安全，发送人主动输入正确密码取消的，不退费。</p>
                <p>（5.5）发送人用“未完成发送”操作发送任务，有可能在完成支付的时候，已经超出2小时的保留时长，或者超出发送人自己设置好的发送时间，导致系统无法执行发送任务，又或者发送人通过微信绑定银行卡完成支付，系统以收到支付为标准确定时长，当系统收到支付款项，已经超出合理时长，系统均会原路退款，不承接本次发送任务。</p>
                <div className={style.sub}>六，免责条款</div>
                <p>本公司在此声明，遭遇不可抗力，包括：火灾，洪水，地震，陨石降落，海啸，公共电网（国家电网）故障，基础电信设施故障（包含移动/联通/电信/网通），战争，疫情，以上原因造成的信息无法按照发送方用户要求完成传递，以及用户信息泄密，本公司不承担赔偿责任。另：由于用户没有认真阅读并且理解本协议所指导的使用方法，未能正确操作，所造成的信息传递不成功，本公司不承担赔偿责任。</p>
                <div className={style.sub}>七，联系方式</div>
                <div className={style.connect}>本公众号联系电话：暂未开通</div>
                <div className={style.connect}>邮箱：18626882775@wo.cn</div>
                <div className={style.connect}>24小时服务官方微信：暂未开通</div>
                <div className={style.btn} onClick={() => { location.href = './login.html#/Login' }}>同意协议</div>
            </div>

        </div>
        )
    }
}