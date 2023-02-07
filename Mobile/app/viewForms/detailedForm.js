import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {createAccountDetailedSchema} from '../validators/registerDetailedValidators';
import {createAccountDetailed} from '../consts/constans';
import {asyncEmptyLoggedPost, asyncRefreshToken} from '../services/repository';
import GenericModal from '../modals/genericModal';
import DetailedModal from '../modals/detailedModal';
import AsyncStorage from '@react-native-community/async-storage';

import NationalityPicker from '../pickers/createAccountDetailed/nationalityPicker';
import GenderPicker from '../pickers/createAccountDetailed/genderPicker';
import BirthYearPicker from '../pickers/createAccountDetailed/birthYearPicker';

import NetInfo from '@react-native-community/netinfo';
import {clearAllData} from '../services/extensions';

const deviceWidth = Dimensions.get('window').width;

export default function DetailedForm({navigation}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [genericModalOpen, setGenericModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

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
          instagramName: object.instagramName,
          nationality: object.nationality,
          gender: object.gender,
          birthYear: parseInt(object.birthYear, 10),
        }),
        createAccountDetailed,
        navigation,
      ),
    );
    if (result != null) {
      if (result.status) {
        await AsyncStorage.setItem('editedProfile', '1');
        await AsyncStorage.setItem('instagramName', object.instagramName);
        navigation.reset({
          index: 0,
          routes: [{name: 'PublishView'}],
        });
      } else {
        setValidationMessage(result.message);
        setGenericModalOpen(true);
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
    //TODO Zabezpiecznie, aby użytkownicy nie mogli sprawdzać czy dane konto instagram jest użyte w
    <Formik
      initialValues={{
        instagramName: '',
        nationality: '',
        gender: '',
        birthYear: '',
      }}
      onSubmit={initialValues => handleSubmitForm(initialValues)}
      validationSchema={createAccountDetailedSchema}
      validateOnChange={false}
      validateOnBlur={false}>
      {props => (
        <View style={styles.container}>
          {genericModalOpen && (
            <GenericModal
              message={validationMessage}
              genericModalOpen={
                props.errors.instagramName ||
                props.errors.nationality ||
                props.errors.gender ||
                props.errors.birthYear
                  ? true
                  : false
              }
              setGenericModalOpen={setGenericModalOpen}
            />
          )}
          <View style={styles.modal}>
            <DetailedModal
              props={props}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          </View>

          <Text style={styles.textInformation}>Wprowadź</Text>
          <View style={styles.spaceInput}>
            <TextInput
              style={styles.textInput}
              placeholder="Nazwa profilu na Instagram"
              onChangeText={props.handleChange('instagramName')}
              value={props.values.instagramName}
              placeholderTextColor="black"
              maxLength={31}
            />
          </View>
          <Text style={styles.textInformation}>Wybierz</Text>

          <View style={styles.spacePicker}>
            <NationalityPicker props={props} />
          </View>
          <View style={styles.spacePicker}>
            <GenderPicker props={props} />
          </View>
          <View style={styles.spacePicker}>
            <BirthYearPicker props={props} />
          </View>
          {indicatiorLoading && (
            <ActivityIndicator size="large" color="#4eb8ce" />
          )}

          {!indicatiorLoading && (
            <View style={styles.spaceButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
                <Text style={styles.textButton}>Potwierdź</Text>
              </TouchableOpacity>
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modal: {
    height: 0,
  },
  textInformation: {
    color: '#4eb8ce',
    textAlignVertical: 'bottom',
    paddingLeft: '2%',
    fontSize: 12,
  },
  spaceInput: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#eef4f4',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75%',
    width: '90%',
    fontSize: 12,
  },
  spacePicker: {
    flex: 1,
    width: deviceWidth * 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  picker: {
    width: '95%',
    height: '55%',
    backgroundColor: '#eef4f4',
    color: 'black',
  },
  spaceButton: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    marginTop: 5,
  },
  button: {
    width: '55%',
    height: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    borderColor: 'black',
    borderRadius: 12,
    color: 'white',
  },
  textButton: {
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
