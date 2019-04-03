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
	}

	componentWillMount() {

	}

	componentDidMount(){
		// let params=util.parseUrl(location.href).params;
		// let dataList={
        //     caller:'apiUser@wxapp.linkmsg.net',
        //     orderNo:util.randomString(),
        //     sign:'abc'
		// }

		// if(!params.openid){
		// 	window.location.href='http://weixin.linkmsg.net/web/oauth2/openId'+`?${util.formatQuery(util.sort_ASCII(dataList))}`
		// }else{
		// 	util.setCookie('openId',params.openid);
		// }
			util.setCookie('openId','o3dEH0kw4l379YMS5VQXVUXCLM4Y');

		// let openid=util.getCookie('openid');
		// if(!openid){
			
		// 	util.setCookie(openid,)
		// }
	}
}

export default EntryBase;