import axios from 'axios';
import config from 'commons/config';
import qs from "qs";
import {Toast} from 'antd-mobile';
import util from "commons/util";
import Jsrsasign from "jsrsasign";

// 实例化rsa
var rsa=new Jsrsasign.RSAKey();
// 选择哪种hash算法（散列生成一个报文摘要，目的是防篡改）
var hashAlg="sha1";


// 请求超时
const TIMEOUT = 10000;
// 请求队列
let fetchQueue = {};
// 是否开启请求锁。
let fetchLock = true;

// 创建axios实例
const _fetch = axios.create({
    //TODO:修改
    // baseURL: config.public.rpcPath.h5, 
    baseURL: `http://weixin.linkmsg.net`, 

    // 超时
    timeout: TIMEOUT,

    // 是否跨域携带cookie
    // withCredentials: true,

    headers: {
      
    }
})

let privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDSxwGtpKB7iKb3AY3bvKMN0AzBKu7WFDFzUurtBsJSUyBfj5+U
Lo19WqJ620leBd52U1UpbaD0kc0Ppy8NVb9TvQjSOS2Shu9UMAs57IuGyPpZ7v3M
BkIIhtGoXQQa0YKBaPehtdtZ5G/B3h5qr6toktgcwYudlWuSwuVRJLMsKQIDAQAB
AoGAEZrxtvFDPk5Bs+v7T1lIPUUda50MafEx2DIa0UV5QasTzyeN6rCgvNGvNJfQ
XvwagsOfH2C6yvLKr/4E3hZFbrAx7zq0chrqSH54GVRA6ATFNbIOj4xfvaJzk5oR
PFG/fUc01sgDIdj3tGSH23L3SSn1asH1gaidnYSkSrfsyKECQQDWAY6RyqRPB9Ve
vHfeqYpeVRRS7bVHXc2MsJpWajmkx5Km/vUtpfWj0SAsbowLhwIu26l+tn4lWVzu
4YwtrlPlAkEA/CNB8LtICj3yk4xP7WpwIdHFmN7orwYutxpRYuEKSIS6oJMY/Zi6
8/GIJgfKrh2o1ZoFG7ksnscww++Ynr869QJBAK+GvWH03El5+lbmrEaztirjC3Vt
RMdRN7uSSjRgkgEGM9HGwl/7g/smFoZ68WCvDmpSfrXQhqypnCDOXARHvMUCQEk4
k/Ws7YbL5p4iqTNxLY8ktBVo5nmtefOCmQ/1+l6E7Q2kqiU7LU+aXMdui9V0l4sw
Zztd0y9o+ShtdAzly+ECQBM5CzKWPfKTqcwZ2el72LjVVFxVN3WdrnrkyGCXiTLq
At9mgUC0H+2UdNPfNAfhfVrlF5kfqj/LKTbKtbwgy14=
-----END RSA PRIVATE KEY-----`;


// 请求拦截器
_fetch.interceptors.request.use(function (config) {
    // REST风格接口
    for (let key in config.data) {
        if (key.indexOf("{") == 0) {
            config.url = config.url.replace(key, config.data[key]);
            delete config.data[key];
        }
    }
    
    config.data = Object.assign({ timestamp: Date.parse(new Date())/1000,caller:'apiUser@wxapp.linkmsg.net',orderNo:util.randomString()}, config.data);
    rsa=Jsrsasign.KEYUTIL.getKey(privateKey);
    let sign=rsa.signString(util.sort_ASCII(config.data),hashAlg);
    sign=Jsrsasign.hex2b64(sign);
    // get传参
    if (config.method == "get" && config.data) {
        config.url += `?${util.formatQuery({...config.data,sign})}`
    }

    config.data ={...config.data,sign};


    // 请求锁, 
    let lock = config.fetchLock != undefined && config.fetchLock != null ? config.fetchLock : fetchLock;

    if (lock) {
        // 如果有同个请求在队列中，则取消即将发送的请求
        if (fetchQueue[config.url]) {
            let cancel;
            config.cancelToken = new axios.CancelToken(c => {
                cancel = c;
            })
            cancel("cancel");
        } else {
            // 添加入请求队列
            fetchQueue[config.baseURL + config.url] = 1
        }
    }

    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加请求返回拦截器
_fetch.interceptors.response.use(function (res) {
    // 是否有请求锁
    let lock = res.config.fetchLock != undefined && res.config.fetchLock != null ? res.config.fetchLock : fetchLock;
    if (lock) {
        // 移除出请求队列
        delete fetchQueue[res.config.url];
    }
    // 处理异常
    const data = res.data
    const code = +data.code
    // 约定code=0即为成功
    if (code === 0) {
        return data;
    } else {
        // 打印错误信息
        let showToast = true;


        showToast = false;
        //如果是请求用户信息
        if (res.config.url.indexOf("/api/user") >= 0&&code == 10020) {
            // 不提示错误信息
            location.href='login.html';
        }

        // 结束上一个toast
        Toast.hide();

        // 打印错误信息
        !!showToast && Toast.info(data.message, 2);
        console.log('error',data)
        return Promise.reject(data);
    }
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})


export default _fetch;