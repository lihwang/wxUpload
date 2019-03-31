/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import { Button, WhiteSpace, DatePicker, List, Checkbox, Flex } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;

export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: new Date(),
        }
    }

    onChange=(val)=>{
        console.log(val)
    }


    componentDidMount() {
      
    }

    componentDidUpdate() {
        
    }
    render() {
        const data = [
            { value: 0, label: 'Ph.D.' },
            { value: 1, label: 'Bachelor' },
            { value: 2, label: 'College diploma' },
        ];
        return (<div className={style.container}>
                    {/* <Header/> */}
            <div className="tips">取消发送选择 按时间</div>
            <WhiteSpace size='lg' />
            <div className="timeSet">
                <DatePicker
                    // minuteStep={4}
                    value={this.state.date}
                    onChange={date => this.setState({ date })}>
                    <List.Item arrow="horizontal">设定取消时间</List.Item>
                </DatePicker>
            </div>
            <List renderHeader={() => 'CheckboxItem demo'}>
                {data.map(i => (
                    <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                        {i.label}
                    </CheckboxItem>
                ))}
                {/* <CheckboxItem key="disabled" data-seed="logId" disabled defaultChecked multipleLine>
                    Undergraduate<List.Item.Brief>Auxiliary text</List.Item.Brief>
                </CheckboxItem> */}
            </List>
            </div>
        )
    }
}