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
import CreateAccountForm from '../../viewForms/createAccountForm';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function CreateAccountView({navigation}) {
  const loginHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginRT'}],
    });
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../images/register_details/Background_SilentApp.png')}
        style={styles.container}>
        <View style={styles.top} />
        <View style={styles.middle}>
          <ScrollView>
            <CreateAccountForm navigation={navigation} style={styles.partOne} />
            <View style={styles.partTwo}>
              <TouchableOpacity
                onPress={loginHandler}
                style={styles.touchableOpacity}>
                <Text style={styles.buttonText}>Mam już konto</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.partThree}>
              <Text style={styles.text}>Copyright © SpaceOfApps 2020</Text>
            </View>
          </ScrollView>
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
    flex: 5.2,
    width: '72%',
    resizeMode: 'contain',
    backgroundColor: 'rgba(19,20,27,0.85)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  partOne: {
    flex: 5,
    width: '90%',
    height: '100%',
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  partTwo: {
    flex: 1,
    marginTop: '-15%',
    marginBottom: '2%',
  },
  touchableOpacity: {
    alignSelf: 'center',
    marginVertical: '1%',
    justifyContent: 'center',
    fontSize: 14,
  },
  buttonText: {
    color: '#3fc9ff',
    fontSize: 12,
  },
  partThree: {
    flex: 1.4,
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
