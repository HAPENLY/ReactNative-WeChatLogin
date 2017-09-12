/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,Platform
} from 'react-native';
import * as WeChat from 'react-native-wechat';
let appid = 'wxd930ea5d5a258f4f';
import ToastUtil from './utils/ToastUtil';
export default class LiCaiApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          let scope = 'snsapi_userinfo';
         let state = 'wechat_sdk_demo';
  
               //判断微信是否安装
              WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                   if (isInstalled) {
                    //发送授权请求
                    WeChat.sendAuthRequest(scope, state)
                    .then(responseCode => {
                   //返回code码，通过code获取access_token
                    this.getAccessToken(responseCode.code);
                    })
                  .catch(err => {
                       Alert.alert('登录授权发生错误：', err.message, [
                       {text: '确定'}
                 ]);
                 })
               } else {
                  Platform.OS == 'ios' ?
                   Alert.alert('没有安装微信', '是否安装微信？', [
                     {text: '取消'},
                      {text: '确定', onPress: () => this.installWechat()}
                     ]) :
                 Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
                  {text: '确定'}
                ])
      }
    })}}>
        <Text style={styles.welcome}>
         微信!
        </Text>
        </TouchableOpacity>
       
      </View>
    );
  }
  componentDidMount() {
    WeChat.registerApp('wxd930ea5d5a258f4f')
  }
  getAccessToken(responseCode){
 ToastUtil.showShort(responseCode, true);


  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LiCaiApp', () => LiCaiApp);
