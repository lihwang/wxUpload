import 'babel-polyfill';// 全局垫片
import React from 'react';
// window.Promise = Promise;// 全局Promise

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

	componentDidMount() {
	}
}

export default EntryBase;