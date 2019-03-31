/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import { Button, WhiteSpace, WingBlank} from 'antd-mobile';

export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            modal1:false
        }
    }

    componentDidMount() {
      
    }
    componentDidUpdate() {
        
    }
  
    render() {
        return (<div className={style.container}>
               <h2 className={style.title}>产品介绍</h2>
                <div className={style.cont}>
                        <WingBlank>
                            <Button onClick={()=>{
                                
                            }} type="primary">本公众号用途</Button><WhiteSpace size='lg'/>
                            <Button type="ghost" className='am-button-borderfix'>公司框架 本软件框架</Button><WhiteSpace size='lg'/>
                            <Button>服务协议</Button><WhiteSpace size='lg'/>
                            <Button>操作指南</Button><WhiteSpace size='lg'/>
                            <Button>关于发票</Button><WhiteSpace size='lg'/>
                            <div>在线联系</div>
                        </WingBlank>
                </div>
            </div>
        )
    }
}