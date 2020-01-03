import _fetch from "api/fetch";

/**
 * 用户认证短信发送
 */
export function sms(data) {
  return _fetch({
    url: "/api/sms",
    method: "POST",
    data: data,
    headers: {}
  });
}

/**
 * 用户查询存在
 */
export function queryUser(data) {
  return _fetch({
    url: "/api/user",
    method: "GET",
    data: data,
    headers: {}
  });
}

/**
 * 用户注册
 */
export function register(data) {
  return _fetch({
    url: "/api/user",
    method: "POST",
    data: data,
    headers: {}
  });
}

/**
 * 登陆查询
 * @param {String} tokenUser openid 用户的token
 * 
 */
export function checkLogin(data) {
  return _fetch({
    url: "/api/user/login",
    method: "GET",
    data: data,
    headers: {}
  });
}

/**
 * 登陆请求
 * @param {String} openid openid 用户授权后返回openId
 */
export function login(data) {
  return _fetch({
    url: "/api/user/login",
    method: "PUT",
    data: data,
    headers: {}
  });
}




/**
 * 用户oauth2授权验证（获取授权页面）
 */
export function oauth2(data) {
  return _fetch({
    url: "/web/oauth2/openId",
    method: "GET",
    data: data,
    headers: {}
  });
}


/**
 * 上报发送信息
 */
export function info(data) {
  return _fetch({
    url: "/api/info",
    method: "POST",
    data: data,
    headers: {}
  });
}

//我要了解的列表
export function infoGet(data) {
  return _fetch({
    url: "api/info",
    method: "GET",
    data: data,
    headers: {}
  });
}

//我要删除列表
export function infoPut(data) {
  return _fetch({
    url: "api/info",
    method: "PUT",
    data: data,
    headers: {}
  });
}

//我要接收的历史记录
export function infoList(data) {
  return _fetch({
    url: "api/infoList",
    method: "GET",
    data: data,
    headers: {}
  });
}

//保存资料
export function infoDeposit(data) {
  return _fetch({
    url: "/api/deposit",
    method: "POST",
    data: data,
    headers: {}
  });
}

//支付列表查询
export function depositGet(data) {
  return _fetch({
    url: "/api/deposit",
    method: "GET",
    data: data,
    headers: {}
  });
}




//资料价格查询
export function depositExtend(data) {
  return _fetch({
    url: "/api/deposit/extend",
    method: "GET",
    data: data,
    headers: {}
  });
}

//未支付查询支付参数
export function payGet(data) {
  return _fetch({
    url: "/api/pay",
    method: "GET",
    data: data,
    headers: {}
  });
}

//未支付查询支付参数
export function payUpdate(data) {
  return _fetch({
    url: "/api/deposit",
    method: "PUT",
    data: data,
    headers: {}
  });
}



