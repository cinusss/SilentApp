import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LoginForm from '../../viewForms/loginForm';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function LoginView({navigation}) {
  const forgottenHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ForgottenRT'}],
    });
  };
  const registerHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'RegisterRT'}],
    });
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../images/register_details/Background_SilentApp.png')}
        style={styles.container}>
        <View style={styles.top} />
        <View style={styles.middle}>
          <LoginForm navigation={navigation} style={styles.partForm} />
          <View style={styles.partTouchableText}>
            <TouchableOpacity
              onPress={forgottenHandler}
              style={styles.touchableOpacity}>
              <Text style={styles.buttonText}>Zapomniałem hasła</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={registerHandler}
              style={styles.touchableOpacity}>
              <Text style={styles.buttonText}>Nie posiadam konta</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.partCopyright}>
            <Text style={styles.text}>Copyright © SpaceOfApps 2020</Text>
          </View>
        </View>
        <View style={styles.bottom} />
      </ImageBackground>
    </ScrollView>
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
  },
  top: {
    flex: 2.5,
  },
  middle: {
    flex: 4,
    width: '65%',
    resizeMode: 'contain',
    backgroundColor: 'rgba(19,20,27,0.85)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  partForm: {
    flex: 4,
  },
  partTouchableText: {
    flex: 1,
    justifyContent: 'center',
  },
  touchableOpacity: {
    alignSelf: 'center',
    marginVertical: '1%',
  },
  buttonText: {
    color: '#3fc9ff',
    fontSize: 12,
  },
  partCopyright: {
    flex: 0.5,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 10,
  },
  bottom: {
    flex: 1.5,
  },
});
