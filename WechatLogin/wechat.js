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
  TouchableOpacity
} from 'react-native';
import * as WeChat from 'react-native-wechat';
export default class LiCaiApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
            WeChat.isWXAppInstalled().then((isInstalled) => {
                    if (isInstalled) {
                      WeChat.shareToTimeline({
                        title: formatStringWithHtml(
                          `[@iReading]${params.article.title}`
                        ),
                        thumbImage: params.article.contentImg,
                        type: 'news',
                        webpageUrl: params.article.url
                      }).catch((error) => {
                        ToastUtil.showShort(error.message, true);
                      });
                    } else {
                      ToastUtil.showShort('没有安装微信软件，请您安装微信之后再试', true);
                    }
                  });
            }}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
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
