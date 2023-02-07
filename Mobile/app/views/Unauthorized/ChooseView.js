import React, {useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function ChooseView({navigation}) {
  useEffect(
    function effectFunction() {
      async function setNavigation() {
        navigation.setOptions({gestureEnabled: false});
      }
      setNavigation();
    },
    [navigation],
  );

  const loginHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginRT'}],
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
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../../images/register_details/Background_SilentApp.png')}
        style={styles.container}>
        <View style={styles.top} />
        <View style={styles.middle}>
          <View style={styles.partTwo}>
            {/* <Button title="pol" style={styles.buttonHorizontal}></Button>
            <Button title="eng" style={styles.buttonHorizontal}></Button> */}
            <Text style={styles.partTwoTextLineOne}>Rozpocznij budowę</Text>
            <Text style={styles.partTwoTextLineTwo}>
              swojego profilu już teraz!
            </Text>
          </View>
          <View style={styles.partOne}>
            <TouchableOpacity
              onPress={loginHandler}
              style={styles.touchableOpacity}>
              <Text>ZALOGUJ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={registerHandler}
              style={styles.touchableOpacity}>
              <Text>UTWÓRZ KONTO</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.partThree}>
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
  partOne: {
    flex: 5,
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '8%',
  },
  touchableOpacity: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#4eb8ce',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%',
    marginVertical: 10,
  },
  partTwo: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHorizontal: {
    marginHorizontal: 10,
  },
  partTwoTextLineOne: {
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: '10%',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: '18%',
  },
  partTwoTextLineTwo: {
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: '10%',
    fontSize: 16,
    fontStyle: 'italic',
  },
  partThree: {
    flex: 1,
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
