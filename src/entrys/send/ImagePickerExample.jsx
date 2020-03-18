import React from 'react';
import { ImagePicker, Modal, Toast } from 'antd-mobile';
import BMF from 'browser-md5-file';
import util from 'commons/util'

//api
import { sign, ossPost } from "api/api_oss";
import { json } from 'body-parser';

const bmf = new BMF();

export default class ImagePickerExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: props.imgList && props.imgList.length ? props.imgList.map((item, i) => {
        return {
          url: "http://msg-upyun.linkmsg.net" + item.path
        }
      }) : [],
      modal1: false,
      currentPic: '',
      ossId: '',
      fileList: [],
      allowUpload: props.allowUpload || false
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.imgList && this.state.imgList != nextProps.imgList) {
      this.setState({
        files: nextProps.imgList.map((item, i) => {
          return {
            url: "http://msg-upyun.linkmsg.net" + item.path
          }
        })
      })
    }
  }


  onChange(files, type, index) {
    if (type == 'add') {
      Toast.loading('正在上传...', 0);
      let file = files[files.length - 1].file;
      bmf.md5(
        file,
        (err, md5) => {
          var date = new Date();
          var saveKey = `/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/${md5}${file.name}`;
          let fileList = this.state.fileList;
          let newFileList = [...fileList, {
            method: 'POST',
            path: saveKey,
            contentMd5: md5,
            id: fileList[fileList.length - 1] ? fileList[fileList.length - 1].id + 1 : 0,
            contentLength: file.size,
          }];
          let signData = {
            type: 'policyAndAuthorization',
            list: JSON.stringify(newFileList),
            tokenUser: sessionStorage.getItem('tokenUser'),
          }
          sign(signData).then(res => {
            let signData = res.data[res.data.length - 1];
            var n = new FormData;
            n.append("file", file);
            n.append("policy", decodeURIComponent(signData.policy));
            n.append("authorization", decodeURIComponent(signData.value));
            n.append("notify-url", "http://msg-upyun.linkmsg.net");
            n.append("content-md5", md5);
            n.append("date", decodeURIComponent(signData.date))
            $.ajax({
              url: "http://v0.api.upyun.com/msg-upyun",
              type: "POST",
              data: n,
              contentType: false,
              processData: false,
              success: (datas) => {
                ossPost({
                  type: "1",
                  path: saveKey,
                  filename: file.name,
                  contentMd5: md5,
                  list: JSON.stringify(newFileList),
                  secret: "",
                  tokenUser: sessionStorage.getItem('tokenUser'),
                }).then(data => {
                  let newDatas = JSON.parse(datas);
                  let ossId = data.ossId;
                  this.props.getPicId && this.props.getPicId(ossId);
                  this.setState({
                    ossId: ossId,
                    currentPic: "http://msg-upyun.linkmsg.net" + newDatas.url,
                    fileList: newFileList,
                    files
                  })
                  Toast.hide();
                })
              }
            })
          })
        }
      );

    }
    if (type == 'remove') {
      let ossId = this.state.ossId;
      let fileList = this.state.fileList;
      let newOssId = ossId.split(',');
      newOssId.splice(index, 1);
      fileList.splice(index, 1);
      this.props.getPicId && this.props.getPicId(newOssId.join(','));
      this.setState({
        ossId: newOssId.join(','),
        fileList: fileList,
        files
      })
    }
  }

  onClose(key) {
    this.setState({
      [key]: false,
    });
  }

  render() {
    const { files } = this.state;
    return (
      <div>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          length={3}
          onImageClick={(index, fs) => {
            this.setState({
              currentPic: fs[index].url,
              modal1: true
            })
          }
          }
          selectable={files.length < (!this.state.allowUpload ? 1 : 9)}
        />
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={true}
          onClose={() => { this.onClose('modal1') }}
        >
          <img src={this.state.currentPic} style={{ maxHeight: '600px', maxWidth: '600px' }} alt="" />
        </Modal>
      </div>
    );
  }
}


