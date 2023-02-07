import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {TouchableHighlight} from 'react-native-gesture-handler';
import ContactModal from '../modals/contactModal';
import {contactSchema} from '../validators/registerDetailedValidators';
import {addMessage} from '../consts/constans';
import {asyncEmptyLoggedPost, asyncRefreshToken} from '../services/repository';
import NetInfo from '@react-native-community/netinfo';
import {clearAllData} from '../services/extensions';

import MessageSubjectPicker from '../pickers/contact/messageSubjectPicker';

export default function ContactForm({
  navigation,
  modalSuccessOpen,
  setModalSuccessOpen,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const [indicatiorLoading, setIndicatiorLoading] = useState(false);

  const [isNetwork, setIsNetwork] = useState(true);
  const logoutHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ChooseRT'}],
    });
  };

  async function handleSubmitForm(object) {
    setIndicatiorLoading(true);
    let result = JSON.parse(
      await asyncEmptyLoggedPost(
        JSON.stringify({
          title: object.title,
          messageText: object.message,
          email: null,
          sourceId: 1,
        }),
        addMessage,
        navigation,
      ),
    );
    if (result != null) {
      if (result.status) {
        setModalSuccessOpen(true);
        object.message = '';
        setIndicatiorLoading(false);
      }
    } else {
      NetInfo.fetch().then(state => {
        setIsNetwork(state.isConnected);
      });
      if (isNetwork) {
        const refreshResult = await asyncRefreshToken();
        if (!refreshResult) {
          clearAllData();
          logoutHandler();
        } else {
          handleSubmitForm(object);
        }
      }
    }
  }
  return (
    <Formik
      initialValues={{title: '', message: ''}}
      onSubmit={initialValues => handleSubmitForm(initialValues)}
      validationSchema={contactSchema}
      validateOnBlur={false}
      validateOnChange={false}>
      {props => (
        <View style={styles.container}>
          {props.errors.title && setModalOpen(true)}
          {props.errors.message && setModalOpen(true)}
          <ContactModal
            props={props}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            animationType="slide"
          />
          <View style={styles.spaceTop}>
            <MessageSubjectPicker props={props} />
          </View>
          <View style={styles.spaceMiddle}>
            <ImageBackground
              source={require('../images/ContactMessageBox_1200x1200.png')}
              style={styles.imageInputMultiline}
              resizeMode="contain">
              <TextInput
                style={styles.inputMultiline}
                placeholder="Wprowadź tekst wiadomości :)"
                onChangeText={props.handleChange('message')}
                value={props.values.message}
                placeholderTextColor="black"
                maxLength={300}
                multiline={true}
              />
            </ImageBackground>
          </View>
          {indicatiorLoading && (
            <ActivityIndicator size="large" color="#4eb8ce" />
          )}
          {!indicatiorLoading && (
            <View style={styles.spaceBottom}>
              <TouchableHighlight style={styles.button}>
                <Text
                  style={styles.textButton}
                  onPress={() => props.handleSubmit()}>
                  WYŚLIJ
                </Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '-20%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  spaceTop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  picker: {
    width: '70%',
    height: '50%',
    backgroundColor: '#eef4f4',
    alignSelf: 'center',
    color: 'black',
  },
  spaceMiddle: {
    flex: 4.6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  imageInputMultiline: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputMultiline: {
    width: '72%',
    height: '40%',
    borderWidth: 0,
    backgroundColor: 'white',
    marginTop: '12%',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    borderRadius: 12,
    color: 'black',
  },
  spaceBottom: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  button: {
    width: '45%',
    height: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    borderColor: 'black',
    borderRadius: 12,
    color: 'white',
  },
  textButton: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
});
