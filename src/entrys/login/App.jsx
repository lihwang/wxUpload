/**
 * @description 产品介绍
 */
import React from 'react';
import style from './styles/App.less';
import EntryBase from '../Common/EntryBase';
import { Button, WhiteSpace,InputItem,List,Toast} from 'antd-mobile';


//api
import { sms,queryUser,register } from "api/api";

export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            msg:'发送验证码',
            noClick:false,
            phone:'',
            msgCode:'',
            hasError:true
        }
    }

    componentDidMount() {
     
    }

    componentDidUpdate() {
        
    }

    calSecond=()=>{
        if(this.state.hasError){
            Toast.fail('手机号码不正确');
            return false;
        }
        // //用户验证
        // let datauser={
        //     caller:'apiUser@wxapp.linkmsg.net',
        //     orderNo:'123456',
        //     openId:'123456',
        // }
        // queryUser


        //请求短信
        let dataList={
            mobile:this.state.phone.replace(/\s+/g,""),
            caller:'apiUser@wxapp.linkmsg.net',
            orderNo:'KxK7f3yaSfOXVwvuYJDozvQ7Mt1JnqRX',
            mode:'1',
            sign:'abc'
        }
        sms(dataList).then(res=>{
            Toast.success('短信发送成功，请查收短信！');
            let second=60;
            let timer=setInterval(()=>{
                   second--;
                   if(second){
                       this.setState({
                           msg: second+' S',
                           noClick:true
                       })
                   }else{
                       this.setState({
                           msg: '发送验证码',
                           noClick:false
                       }) 
                       clearInterval(timer);
                   }
               },1000)
        })
    }
    
        onErrorClick = () => {
            if (this.state.hasError) {
              Toast.info('请输入正确手机号');
            }
        }
    
        //手机号输入
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
                phone,
            });
        }
    
        //验证码输入
        onChangeCode=(msgCode)=>{
            this.setState({
                msgCode
            })
        }
    
        //注册
        regist(){
            if (this.state.hasError) {
                Toast.info('请输入正确手机号');
                return false;
            }
            if(!this.state.msgCode){
                Toast.info('请输入验证码');
                return false;  
            }
            let registerData={
                mobile:this.state.phone.replace(/\s+/g,""),
                caller:'apiUser@wxapp.linkmsg.net',
                orderNo:'KxK7f3yaSfOXVwvuYJDozvQ7Mt1JnqRX',
                openId:'wxaa716c50bce7516b',
                smsCode:this.state.msgCode,
                password:'',
                sign:'abc'
            }
            register(registerData).then(res=>{
                console.log(res)
            })

        }
  
    render() {
        return (<div className={style.container}>
                    <h2 className={style.title}>欢迎来到时光胶囊</h2>
                    <WhiteSpace size='lg'/>
                    <div style={{textAlign:'center'}}>
                        <Button type='ghost' inline>首次登录请授权微信号关联手机认证</Button>
                    </div>
                    <WhiteSpace size='lg'/>
                    <List style={{ margin: '5px 0'}}>
                    <List.Item>
                        <InputItem type="phone" 
                        onChange={this.onChange}
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        value={this.state.phone}
                        clear placeholder="1** **** ****">手机号：</InputItem>
                    </List.Item>
                    <WhiteSpace size='lg'/>
                    <List.Item
                    extra={<Button type="ghost" disabled={this.state.noClick} size="small" onClick={this.calSecond} inline>{this.state.msg}</Button>}
                    multipleLine>
                    <InputItem maxLength='6' placeholder='****' value={this.state.msgCode} onChange={this.onChangeCode}>验证码：</InputItem>
                    </List.Item>
                    </List>
                    <WhiteSpace size='lg'/>
                    <Button onClick={()=>this.regist()} type="primary">确认</Button>
            </div>
        )
    }
}