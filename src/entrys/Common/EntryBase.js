import 'babel-polyfill';// 全局垫片
import React from 'react';
// window.Promise = Promise;// 全局Promise
import util from "commons/util";
import {oauth2,queryUser } from "api/api";

/**
 * ES6 有一个特别规定，就是通过super调用父类的方法时，super会绑定子类的this。
 * http://es6.ruanyifeng.com/#docs/class#super-关键字
 */
class EntryBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {}
		this.userId='';
	}

	componentWillMount() {

	}

	componentDidMount(){
		let dataList={
            caller:'apiUser@wxapp.linkmsg.net',
            orderNo:util.randomString(),
            sign:'abc'
		}
		let params=util.parseUrl(location.href).params;
		let openId=util.getCookie('openId');
		if(!openId){
			util.setCookie('openId',params.openid);
			util.setCookie('token',params.token);
		}
		if(!util.getCookie('openId')||!util.isWeixin()){
			window.location.href='http://weixin.linkmsg.net/web/oauth2/openId'+`?${util.formatQuery(util.sort_ASCII(dataList))}`;
		}else{
			let queryData={
				openid:util.getCookie('openId'),
			}
			queryUser(queryData).then(res=>{
				if(!res.userId){
				  util.setCookie('token',null);
				 location.href='login.html';
				}else{
				 this.userId=res.userId;
				 util.setCookie('userId',res.userId);
				 location.href.includes("login.html") && (location.href = "index.html");
				}
			})
		}
		
	}
}

export default EntryBase;