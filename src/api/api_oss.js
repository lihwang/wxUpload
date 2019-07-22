import _fetch from "api/fetch";

/**
 * 云存储签名的获取
 */
export function sign(data) {
    return _fetch({
      url: "/api/oss/sign",
      method: "GET",
      data: data,
      headers: {}
    });
  }

/**
 * 对象存储数据保存 
 * 利用拍拍云上传后就通知服务器
 */
export function ossPost(data) {
  return _fetch({
    url: "/api/oss",
    method: "POST",
    data: data,
    headers: {}
  });
}


/**
 * 对象存储数据获取 
 */
export function ossGet(data) {
  return _fetch({
    url: "/api/oss",
    method: "GET",
    data: data,
    headers: {}
  });
}
