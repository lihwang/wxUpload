import React from 'react';
import { ImagePicker,Modal } from 'antd-mobile';
import BMF from 'browser-md5-file';
import util from 'commons/util'

//api
import {sign,ossPost} from "api/api_oss";

const bmf = new BMF();

export default class ImagePickerExample extends React.Component {
    constructor(props){
        super(props);
        this.state={
            files: props.currentPic?[{url:props.currentPic}]:[],
            modal1:false,
            currentPic:props.currentPic||'',
            ossId:''
        }
        this.onChange=this.onChange.bind(this);
    }

    componentDidMount() {
      
    }
    

    componentWillReceiveProps(nextProps){
      if(nextProps.currentPic&&this.state.currentPic!=nextProps.currentPic){
        this.setState({
          files:[{url:nextProps.currentPic}]
        })
      }
    }
    

    onChange(files, type, index){
      if(type=='add'){
        let file=files[files.length-1].file;
        bmf.md5(
          file,
          (err, md5) => {
            var date = new Date();
            var saveKey=`/${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${md5}${file.name}`;
       
            let signData={
              type:'policyAndAuthorization',
              method:'POST',
              path:saveKey,
              contentMd5:md5,
              date:date.toUTCString(),
              tokenUser: sessionStorage.getItem('tokenUser'),
            }
            sign(signData).then(res=>{
              var n = new FormData;
              n.append("file", file);
              n.append("policy", decodeURIComponent(res.policy));
              n.append("authorization", decodeURIComponent(res.value));
              n.append("notify-url", "http://msg-upyun.linkmsg.net");
              n.append("content-md5", md5);
              n.append("date", decodeURIComponent(res.date))
              $.ajax({
                url: "http://v0.api.upyun.com/msg-upyun",
                  type: "POST",
                  data: n,
                  contentType: false,
                  processData: false,
                  success:(data)=>{
                    ossPost({
                      type: "1",
                      path: saveKey,
                      filename: file.name,
                      contentMd5: md5,
                      contentLength: file.size,
                      userId: this.props.userId,
                      secret: "",
                      tokenUser: sessionStorage.getItem('tokenUser'),
                    }).then(data=>{
                      this.props.getPicId&&this.props.getPicId(data.ossId),
                      this.setState({
                          ossId: data.ossId,
                          currentPic: "http://msg-upyun.linkmsg.net" + data.url
                      })
                    })
                  }
              })
            })
          }
        );
      }
      this.setState({
        files: files
      })
    }

    onClose(key){
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
          onImageClick={(index, fs) =>{
            this.setState({
              currentPic:fs[0].url,
              modal1:true
            })
          }
          }
          selectable={files.length < 1}
          // accept="image/gif,image/jpeg,image/jpg,image/png"
        />
         <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={true}
          onClose={()=>{this.onClose('modal1')}}
        >
          <img src={this.state.currentPic} style={{maxHeight:'600px',maxWidth:'600px'}} alt=""/>
        </Modal>
      </div>
    );
  }
}


