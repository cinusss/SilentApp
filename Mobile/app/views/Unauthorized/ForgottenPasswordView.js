import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ForgottenPasswordForm from '../../viewForms/forgottenPasswordForm';
import {globalStyles} from '../../styles/global';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function ForgottenPasswordView({navigation}) {
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
          <View style={styles.partOne}>
            <Text style={styles.textBig}>
              Wprowadź poniżej adres e-mail podany podczas rejestracji!
            </Text>
            <Text style={styles.text}>
              Następnie postępuj zgodnie z instrukcją otrzymaną na swojej
              poczcie
            </Text>
          </View>
          <View style={styles.partTwo}>
            <ForgottenPasswordForm navigation={navigation} />
          </View>
          <View style={styles.partThree}>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={loginHandler}
                style={styles.touchableOpacity}>
                <Text style={styles.buttonText}>
                  Powrót do poprzedniej strony
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={globalStyles.footer}>
                Copyright © SpaceOfApps 2020
              </Text>
            </View>
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
    flex: 2.2,
  },
  middle: {
    flex: 3.5,
    width: '70%',
    resizeMode: 'contain',
    backgroundColor: 'rgba(19,20,27,0.85)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  partOne: {
    flex: 1.5,
    width: '80%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginTop: '-5%',
  },
  textBig: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    marginBottom: '5%',
  },
  partTwo: {
    flex: 1.5,
    width: '80%',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  partThree: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
  },
  touchableOpacity: {
    alignSelf: 'center',
    marginTop: '7%',
  },
  buttonText: {
    color: '#3fc9ff',
    fontSize: 12,
  },
  bottom: {
    flex: 1.4,
  },
});
