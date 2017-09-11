# ReactNative-WeChatLogin
基于react-native-wechat 实现的微信登录.只需 CV 大法就可以.(自发现教程,没有发现现成 demo 所以我就简单搞了一下按照网上的教程写的 demo)
**需要真机 run**
## 已经判断是否安装微信.如果没有安装将会跳转到 App Store 微信安装页面进行安装.
实现的关键代码:
```
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

```
## 第一步：请求CODE
 ### 移动应用微信授权登录
 关键代码:
 ```
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
 ```
