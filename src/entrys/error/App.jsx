/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import { Button, WhiteSpace,InputItem,List,Toast} from 'antd-mobile';
import { Icon, Grid } from 'antd-mobile';


//api
import { sms,queryUser,register } from "api/api";

export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
       
        }
    }

    componentDidMount() {
     
    }

    componentDidUpdate() {
        
    }

   
    render() {
        return (<div className={style.container}>
                <div><Icon type='cross-circle-o' size='lg'/></div>
                <div className={style.tips}>页面错误</div>
            </div>
        )
    }
}