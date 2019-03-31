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
 * 用户oauth2授权验证（获取授权页面）
 */
export function oauth2(data) {
  return _fetch({
    url: "/api/oauth2/url",
    method: "GET",
    data: data,
    headers: {}
  });
}

/**
 * 用户oauth2授权验证（获取授权页面）
 */
export function grant(data) {
  return _fetch({
    url: "/api/oauth2/grant",
    method: "POST",
    data: data,
    headers: {}
  });
}


