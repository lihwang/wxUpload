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
