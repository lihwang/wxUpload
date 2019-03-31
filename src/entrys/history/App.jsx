/**
 * @description 历史记录
 */
import React from 'react';
import EntryBase from '../Common/EntryBase';
import { Button,Modal,List} from 'antd-mobile';
import style from './styles/App.less';

const alert = Modal.alert;

export default class App extends EntryBase {
    constructor(props) {
        super(props);
        this.state = {
            modal1:false
        }
    }

    onClose(key){
        this.setState({
        [key]: false,
        });
    }

    componentDidMount() {
      
    }
    componentDidUpdate() {
        
    }
  
    render() {
        return (
            <div className={style.container}>
              <h2 className={style.title}>保存资料目录（按时间顺序）</h2>
              <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
                <List.Item
                extra={<Button type="warning" size="small" inline onClick={()=>{
                    alert('提示', '是否确认删除该数据？', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确认', onPress: () => console.log('ok') },
                      ])
                }}>删除</Button>}
                multipleLine
                >
                <Button style={{verticalAlign: 'middle',marginRight:'10px'}} onClick={()=>{
                    window.location.href='recive.html'
                }} className={style.x_left} type="ghost" size="small" inline>查看</Button>
                Regional manager
                </List.Item>

                <List.Item
                extra={<Button type="warning" size="small" inline>删除</Button>}
                multipleLine
                >
                <Button style={{verticalAlign: 'middle',marginRight:'10px'}} className={style.x_left} type="ghost" size="small" inline>查看</Button>
                Regional manager
                </List.Item>
            </List>
            {/* <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={()=>{this.onClose('modal1')}}
                title="提示"
                footer={[{ text: 'Ok', onPress: () => { this.onClose('modal1')} }]}
                >
                <div>
                您的资料已接收<br/>
                时间：**年**月**日**点**分<br/>
                将按照您设定的时间发送
                </div>
            </Modal> */}
            </div>
        )
    }
}