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
  TouchableOpacity,
  Platform,
  Alert,
  WebView,Linking,
} from 'react-native';
import * as WeChat from 'react-native-wechat';
let appid = 'wx0159768xxxxxxxxxx';
let secretID = '7a9ebc6f2902f964xxxxxxxxx';
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
                         console.log(responseCode.code);
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
    })
    }}>
        <Text style={styles.welcome}>
         微信!
        </Text>
        </TouchableOpacity>
       
      </View>
    );
  }
  componentDidMount() {
    WeChat.registerApp(appid)
  }
  // 获取 access_token
  getAccessToken(responseCode){
    // ToastUtil.showShort(responseCode, true);
    var AccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+appid+'&secret='+secretID+'&code='+responseCode+'&grant_type=authorization_code';
    // console.log('AccessTokenUrl=',AccessTokenUrl);
    fetch(AccessTokenUrl,{
        method:'GET',
        timeout: 2000,
        headers:{
            'Content-Type':'application/json; charset=utf-8',
        },
        })
        .then((response)=>response.json())
        .then((responseData)=>{
            console.log('responseData.refresh_token=',responseData);
            this.getRefreshToken(responseData.refresh_token);
        })
        .catch((error)=>{
            if(error){
                console.log('error=',error);
            }
        })
     }
    //  获取 refresh_token
     getRefreshToken(refreshtoken){
      var getRefreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid='+appid+'&grant_type=refresh_token&refresh_token='+refreshtoken;
      // console.log('getRefreshTokenUrl=',getRefreshTokenUrl);
      fetch(getRefreshTokenUrl,{
          method:'GET',
          timeout: 2000,
          headers:{
              'Content-Type':'application/json; charset=utf-8',
          },
          })
          .then((response)=>response.json())
          .then((responseData)=>{
              console.log('responseData.accesstoken=',responseData);
              this.getUserInfo(responseData);
          })
          .catch((error)=>{
              if(error){
                  console.log('error=',error);
              }
          })
     }
     //获取用户信息
     getUserInfo(responseData){
       console.log(responseData);
      var getUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token='+responseData.access_token+'&openid='+responseData.openid;
      console.log('getUserInfoUrl=',getUserInfoUrl);
      fetch(getUserInfoUrl,{
          method:'GET',
          timeout: 2000,
          headers:{
              'Content-Type':'application/json; charset=utf-8',
          },
          })
          .then((response)=>response.json())
          .then((responseData)=>{
              console.log('getUserInfo=',responseData);
              ToastUtil.showLong([responseData.nickname,responseData.province,responseData.city,responseData.openid],true) 

          })
          .catch((error)=>{
              if(error){
                  console.log('error=',error);
              }
          })
     }
//安装微信
      installWechat(){
        var getWeChatUrl = 'itms-apps://itunes.apple.com/cn/app/%E5%BE%AE%E4%BF%A1/id414478124?mt=8';
        Linking.canOpenURL(getWeChatUrl)
        .then((supported)=>{  
          if (!supported){  
            console.log('Can\'t handle url: ' + url);  
            Alert.alert(  
              '提示',   
              'Can\'t handle url: ' + url,  
              [  
                {text: 'OK', onPress:()=>{}}  
              ]  
            );  
          }else{  
            return Linking.openURL(getWeChatUrl);  
          }  
        }) 
        .catch((err)=>{  
          console.log('An error occurred', err);  
          Alert.alert(  
            '提示',   
            'An error occurred: ' + err,  
            [  
              {text: 'OK', onPress:()=>{}}  
            ]  
          );  
        });   
       
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
