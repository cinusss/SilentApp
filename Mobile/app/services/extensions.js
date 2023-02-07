import React from 'react';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import CookieManager from '@react-native-community/cookies';

export function renderPickerItems(object) {
  return object.map((item, index) => {
    if (index === 0) {
      return (
        <Picker.Item key={index} label={item} value={index} color={'#888888'} />
      );
    } else {
      return <Picker.Item key={index} label={item} value={index} />;
    }
  });
}

export function renderPickerItemsWithValue(object) {
  return object.map((item, index) => {
    if (index === 0) {
      return (
        <Picker.Item key={index} label={item} value={index} color={'#888888'} />
      );
    } else {
      return <Picker.Item key={index} label={item} value={item} />;
    }
  });
}

export function clearAllData() {
  AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
  CookieManager.clearAll(true);
}

export function clearData() {
  AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
}
