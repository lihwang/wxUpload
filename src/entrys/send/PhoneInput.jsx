import React, { Component } from 'react'
import {
    InputItem,WhiteSpace
} from 'antd-mobile';
import style from './styles/PhoneInput.less';
import classnames from 'classnames'

export default class PhoneInput extends Component {
    constructor(props){
        super(props);
        this.state={
            hasError:false,  //手机号错误
            phone:''
        }
    }


    onChange = (phone) => {
        if (phone.replace(/\s/g, '').length < 11) {
          this.setState({
            hasError: true,
          });
        } else {
          this.setState({
            hasError: false,
          });
        }
        this.setState({
          phone
        });
        this.props.changePhone&&this.props.changePhone(phone);
    }

    componentDidMount() {
        console.log(this.props)
    }
    

    render() {
        let {index}=this.props;
        return (
            <div className={style.phoneInput}>
                <div className={classnames(style.del,{[style.noshow]:index==0})}>
                    <div className={style.icon} onClick={()=>{
                      this.props.delIndex&&this.props.delIndex();
                    }}>删除</div>
                </div>
                <InputItem type="phone"
                  className={classnames(style.phone,{[style.noshow]:index==0})}
                    onChange={this.onChange}
                    error={this.state.hasError}
                    value={this.state.phone}
                    clear placeholder="1** **** ****">手机号：</InputItem>
                <WhiteSpace size='lg'/>
            </div>
        )
    }
}
