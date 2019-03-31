/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import { WingBlank, Button, WhiteSpace, DatePicker, List } from 'antd-mobile';


export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: new Date(),
        }
    }


    componentDidMount() {
      
    }

    componentDidUpdate() {
        
    }
    render() {
        return (<div className={style.container}>
                      <div className={style.tips}>您所需要保存的资料已确定，请设置保存时限</div>
                        <WhiteSpace size='lg' />
                        <div className={style.timeSet}>
                            <DatePicker
                                // minuteStep={4}
                                value={this.state.date}
                                onChange={date => this.setState({ date })}>
                                <List.Item arrow="horizontal">设定保存时间</List.Item>
                            </DatePicker>
                        </div>
                        <WhiteSpace size='lg' />
                        <div className={style.confirmTips}>
                            您所需要保存的资料abc，保存时长XX小时XX分，需要支付XX元
                            </div>
                        <WhiteSpace size='lg' />
                        <div className={style.payBox}>
                            <Button className="payButton" inline size="large" type="primary">微信支付</Button>
                        </div>
                        <WhiteSpace size='lg' />
                        <div className={style.callTips}>
                            <a href="">如有疑问拨打400XXXXXX</a>
                        </div>
                    {/* <div className="timeBox"> */}

                    {/* </div> */}
            </div>
        )
    }
}