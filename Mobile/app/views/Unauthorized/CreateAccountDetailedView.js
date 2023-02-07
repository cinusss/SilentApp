import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DetailedForm from '../../viewForms/detailedForm';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function CreateAccountDetailedView({navigation}) {
  return (
    <ScrollView>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('../../images/register_details/Background_SilentApp.png')}
        style={styles.container}>
        <View style={styles.top} />
        <View style={styles.middle}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Uzupełnij poniższe pola</Text>
          </View>

          <View style={styles.partOne}>
            <DetailedForm navigation={navigation} />
          </View>
          <View style={styles.partTwo}>
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
    flex: 2,
  },
  middle: {
    flex: 4,
    width: '68%',
    resizeMode: 'contain',
    backgroundColor: 'rgba(19,20,27,0.85)',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
    paddingTop: 10,
  },
  partOne: {
    flex: 6,
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  partTwo: {
    flex: 0.8,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    paddingBottom: '1%',
    color: 'white',
    fontSize: 10,
  },
  bottom: {
    flex: 1.5,
  },
});
