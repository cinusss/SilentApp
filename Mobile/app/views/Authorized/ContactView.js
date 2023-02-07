import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ContactForm from '../../viewForms/contactForm';
import ContactSuccessModal from '../../modals/contactSuccessModal';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function ContactView({navigation}) {
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../images/register_details/BackgroundInside_SilentApp.png')}
        style={styles.container}>
        <View style={styles.top}>
          <View style={styles.parentCenter}>
            <Text style={styles.textWhite16}>
              Masz pytania lub wątpliwości związane
            </Text>
            <View style={styles.directionRow}>
              <Text style={styles.textWhite16}>z działaniem aplikacji?</Text>
              <Text> 🤔</Text>
            </View>
          </View>
          <View style={styles.modals}>
            <ContactSuccessModal
              modalSuccessOpen={modalSuccessOpen}
              setModalSuccessOpen={setModalSuccessOpen}
              animationType="slide"
            />
          </View>
        </View>
        <View style={styles.middle}>
          <ContactForm
            navigation={navigation}
            modalSuccessOpen={modalSuccessOpen}
            setModalSuccessOpen={setModalSuccessOpen}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.parentBottom}>
            <Text style={styles.textWhite}>Copyright © SpaceOfApps 2020</Text>
          </View>
        </View>
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
    backgroundColor: 'rgba(19,20,27,0.85)',
  },
  top: {
    flex: 1.4,
    width: '100%',
  },
  modals: {
    flex: 0.05,
  },
  middle: {
    flex: 7.5,
    width: '100%',
  },
  bottom: {
    flex: 0.7,
    width: '100%',
  },
  parentCenter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  parentBottom: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textWhite16: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textWhite15: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },
  textWhite: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
  directionRow: {
    flexDirection: 'row',
  },
});
