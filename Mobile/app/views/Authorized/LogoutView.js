import React from 'react';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import LogoutModal from '../../modals/logoutModal';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function LogoutView({navigation}) {
  return (
    <ImageBackground
      source={require('../../images/register_details/BackgroundInside_SilentApp.png')}
      style={styles.container}>
      <LogoutModal navigation={navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(19,20,27,0.85)',
  },
});
