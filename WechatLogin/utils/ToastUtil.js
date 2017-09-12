/**
 *
 * Copyright 2017-present ZPengs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Alert, ToastAndroid, Platform } from 'react-native';

const showShort = (content, isAlert) => {
  if (!content) {
    return;
  }
  if (isAlert || Platform.OS === 'ios') {
    Alert.alert('提示', content.toString());
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
  }
};

const showLong = (content, isAlert) => {
  if (isAlert || Platform.OS === 'ios') {
    Alert.alert('提示', content.toString());
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.LONG);
  }
};
export default {
  showShort,
  showLong
};
