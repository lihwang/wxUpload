import _fetch from "api/fetch";
/**
 * 文件上传接口
 */
export function upload_pic(data) {
  return _fetch({
    url: "file_upload/upload_pic",
    method: "POST",
    data: data,
    headers: {}
  });
}