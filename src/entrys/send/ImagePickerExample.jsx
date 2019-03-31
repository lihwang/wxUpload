import React from 'react';
import { ImagePicker,Modal } from 'antd-mobile';
import BMF from 'browser-md5-file';
import util from 'commons/util'
//api
import {sign} from "api/api_oss";

const bmf = new BMF();

const data = [];

export default class ImagePickerExample extends React.Component {
    constructor(){
        super();
        this.state={
            files: data,
            modal1:false,
            currentPic:''
        }
        this.onChange=this.onChange.bind(this);
    }

    componentDidMount(){
      
    }
    
    onChange(files, type, index){
      console.log(files, type, index);
      if(type=='add'){
        let file=files[files.length-1].file;
        bmf.md5(
          file,
          (err, md5) => {

            var options = {
              'bucket': 'msg-upyun',
              'save-key': `/${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()}/${md5}${file.name}`,
              'expiration': Math.floor(new Date().getTime() / 1000) + 86400
            };
       
            let signData={
              caller:'apiUser@wxapp.linkmsg.net',
              orderNo:'KxK7f3yaSfOXVwvuYJDozvQ7Mt1JnqRX',
              type:'1',
              method:'post',
              'x-date':new Date(),
              contentMd5:md5,
              Policy: window.btoa(JSON.stringify(options)),
              sign:'abc'
            }
            sign(signData).then(res=>{
                var xhr = new XMLHttpRequest();
                xhr.open("PUT", "http://v0.api.upyun.com/msg-upyun/path/to/file",true);
                xhr.onreadystatechange = function(){
                            if (xhr.readyState==4 && xhr.status==200){
                                alert(xhr.responseText);
                            }
                    };
                xhr.setRequestHeader("Authorization",res.sign);
                xhr.setRequestHeader("Content-Length",file.size);       
                xhr.send(file);
            })
          }
        );
      }
      // this.setState({
      //   files
      // });
      

      
      


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
            console.log(fs)
            this.setState({
              currentPic:fs[0].url,modal1:true
            })
          }
          }
          selectable={files.length < 10}
          accept="image/gif,image/jpeg,image/jpg,image/png"
        />
         <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={true}
          onClose={()=>{this.onClose('modal1')}}
        >
          <img src={this.state.currentPic} alt=""/>
        </Modal>
      </div>
    );
  }
}


