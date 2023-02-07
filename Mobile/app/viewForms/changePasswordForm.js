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
import {changePasswordShema} from '../validators/registerDetailedValidators';
import {changePassword} from '../consts/constans';
import {asyncEmptyLoggedPost, asyncRefreshToken} from '../services/repository';
import AsyncStorage from '@react-native-community/async-storage';
import {globalStyles} from '../styles/global';
import NetInfo from '@react-native-community/netinfo';
import {clearAllData} from '../services/extensions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function ChangePasswordForm({
  navigation,
  modalChangeOpen,
  setModalChangeOpen,
  modalChangedOpen,
  setModalChangedOpen,
}) {
  const [invalidPassword, setInvalidPassword] = useState(false);

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
          oldPassword: object.oldPassword,
          newPassword: object.newPassword,
        }),
        changePassword,
        navigation,
      ),
    );
    if (result != null) {
      if (result.status) {
        await AsyncStorage.setItem('token', result.data.token.toString());
        await AsyncStorage.setItem('refresh', result.data.refresh.toString());
        setModalChangeOpen(false);
        setModalChangedOpen(true);
      } else {
        setInvalidPassword(true);
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
      initialValues={{oldPassword: '', newPassword: '', newPasswordRepeat: ''}}
      onSubmit={initialValues => handleSubmitForm(initialValues)}
      validationSchema={changePasswordShema}
      validateOnChange={true}
      validateOnBlur={true}>
      {props => (
        <View style={styles.modalPartTwo}>
          <View style={styles.modalSpaceText}>
            <Text style={styles.modalTextBig}>Zmiana hasła dostępu</Text>
            <Text style={styles.modalTextSmall}>
              W znajdujące się poniżej pola wprowadź nowe hasło i ciesz się
              bezpiecznym dostępem do konta.
            </Text>
          </View>
          <View style={styles.modalSpaceInput}>
            {props.errors.newPassword && (
              <Text style={globalStyles.modalTextError}>
                {props.errors.newPassword}
              </Text>
            )}
            {!props.errors.newPassword &&
              (props.errors.newPasswordRepeat && (
                <Text style={globalStyles.modalTextError}>
                  {props.errors.newPasswordRepeat}
                </Text>
              ))}
            {!props.errors.newPassword &&
              (!props.errors.newPasswordRepeat &&
                (props.errors.oldPassword && (
                  <Text style={globalStyles.modalTextError}>
                    {props.errors.oldPassword}
                  </Text>
                )))}
            {invalidPassword && (
              <Text style={globalStyles.modalTextError}>
                Wprowadzone stare hasło jest nieprawidłowe
              </Text>
            )}
            <TextInput
              style={
                props.errors.newPassword != null
                  ? styles.modalTextInputError
                  : styles.modalTextInput
              }
              placeholder="Nowe hasło"
              onChangeText={props.handleChange('newPassword')}
              value={props.values.newPassword}
              placeholderTextColor="#bccdce"
              secureTextEntry={true}
            />
            <TextInput
              style={
                props.errors.newPasswordRepeat != null
                  ? styles.modalTextInputError
                  : styles.modalTextInput
              }
              placeholder="Powtórz nowe hasło"
              onChangeText={props.handleChange('newPasswordRepeat')}
              value={props.values.newPasswordRepeat}
              placeholderTextColor="#bccdce"
              secureTextEntry={true}
            />
            <TextInput
              style={
                props.errors.oldPassword != null
                  ? styles.modalTextInputError
                  : styles.modalTextInput
              }
              placeholder="Wprowadź stare hasło"
              onChangeText={props.handleChange('oldPassword')}
              value={props.values.oldPassword}
              placeholderTextColor="#bccdce"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.modalSpaceButton}>
            <View style={styles.spaceButton}>
              <TouchableOpacity
                style={styles.modalButtonBack}
                onPress={() => setModalChangeOpen(false)}>
                <Text style={styles.modalTextButton}>Wróć do aplikacji</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.spaceButton}>
              {indicatiorLoading && (
                <ActivityIndicator size="large" color="#4eb8ce" />
              )}
              {!indicatiorLoading && (
                <TouchableOpacity
                  style={styles.modalButtonChange}
                  onPress={props.handleSubmit}>
                  <Text style={styles.modalTextButton}>Zmień hasło</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  modalPartTwo: {
    flex: 3,
    backgroundColor: 'rgba(250,250,250,0.97)',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  modalSpaceText: {
    flex: 1,
    height: deviceHeight * 0.15,
    justifyContent: 'center',
  },
  modalTextBig: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTextSmall: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
    fontSize: 14,
  },
  modalSpaceInput: {
    flex: 2.5,
    justifyContent: 'center',
  },
  modalTextInput: {
    width: '70%',
    height: '21%',
    textAlign: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 12,
    color: 'black',
    marginVertical: 10,
  },
  modalTextInputError: {
    width: '70%',
    height: '21%',
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
    fontSize: 14,
    color: 'black',
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'crimson',
  },
  modalSpaceButton: {
    flex: 1,
    flexDirection: 'row',
    height: deviceHeight * 0.1,
    justifyContent: 'flex-end',
    marginBottom: '2%',
  },
  spaceButton: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  modalButtonChange: {
    width: deviceWidth * 0.25,
    height: '75%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    borderColor: 'black',
    borderRadius: 12,
    color: 'white',
  },
  modalButtonBack: {
    width: deviceWidth * 0.25,
    height: '75%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderRadius: 12,
    color: 'white',
  },
  modalTextButton: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
});
