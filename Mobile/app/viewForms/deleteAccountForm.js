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
import {deleteShema} from '../validators/registerDetailedValidators';
import {deleteAccount} from '../consts/constans';
import {
  asyncEmptyLoggedDelete,
  asyncRefreshToken,
} from '../services/repository';
import {globalStyles} from '../styles/global';
import NetInfo from '@react-native-community/netinfo';
import {clearAllData} from '../services/extensions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function DeleteAccountForm({
  navigation,
  modalDeleteOpen,
  setModalDeleteOpen,
  modalDeletedOpen,
  setModalDeletedOpen,
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
      await asyncEmptyLoggedDelete(
        JSON.stringify({
          password: object.password,
        }),
        deleteAccount,
        navigation,
      ),
    );
    if (result != null) {
      if (result.status) {
        setModalDeleteOpen(false);
        setModalDeletedOpen(true);
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
  //TODO oGARNĄĆ WYŚWIETLENIE HASŁA NIEPRAWIDŁOWEGO GDY WPISUJEMY LIVE
  return (
    <Formik
      initialValues={{password: ''}}
      onSubmit={initialValues => handleSubmitForm(initialValues)}
      validationSchema={deleteShema}
      validateOnChange={true}
      validateOnBlur={true}>
      {props => (
        <View style={styles.modalPartTwo}>
          <View style={styles.modalSpaceText}>
            <Text style={styles.modalTextBig}>Usuwanie konta</Text>
            <Text style={styles.modalTextSmall}>
              W celu potwierdzenia usunięcia konta wprowadź poniżej swoje hasło
              do aplikacji.
            </Text>
          </View>
          <View style={styles.modalSpaceInput}>
            <TextInput
              style={
                props.errors.password != null
                  ? styles.modalTextInputError
                  : styles.modalTextInput
              }
              placeholder="Hasło dostępu do aplikacji"
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              placeholderTextColor="#bccdce"
              secureTextEntry={true}
            />

            {invalidPassword && (
              <Text style={globalStyles.modalTextError}>
                Hasło nie jest poprawne
              </Text>
            )}
            <View style={styles.modalSpaceText}>
              <Text style={styles.modalSpaceTextPadding}>
                Czy na pewno chcesz usunąć konto?
              </Text>
              <Text style={styles.modalSpaceTextPadding}>
                Usunięcie konta uniemożliwi korzystanie z aplikacji.
              </Text>
            </View>
          </View>
          <View style={styles.modalSpaceButton}>
            <View style={styles.spaceButton}>
              <TouchableOpacity style={styles.modalButtonBack}>
                <Text
                  onPress={() => setModalDeleteOpen(false)}
                  style={styles.modalTextButton}>
                  Wróć do aplikacji
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.spaceButton}>
              {indicatiorLoading && (
                <ActivityIndicator size="large" color="#4eb8ce" />
              )}
              {!indicatiorLoading && (
                <TouchableOpacity
                  style={styles.modalButtonDelete}
                  onPress={props.handleSubmit}>
                  <Text style={styles.modalTextButton}>Usuń konto</Text>
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
    borderRadius: 15,
  },
  modalSpaceText: {
    flex: 1,
    height: deviceHeight * 0.15,
    justifyContent: 'center',
  },
  modalSpaceTextPadding: {
    paddingLeft: 10,
  },
  modalTextSmall: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 14,
  },
  modalTextBig: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalSpaceInput: {
    flex: 1,
    height: deviceHeight * 0.2,
    justifyContent: 'flex-start',
  },
  modalTextInput: {
    width: '70%',
    height: '35%',
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
    height: '35%',
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
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  spaceButton: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  modalButtonBack: {
    width: deviceWidth * 0.25,
    height: '80%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    borderColor: 'black',
    borderRadius: 12,
    color: 'white',
  },
  modalButtonDelete: {
    width: deviceWidth * 0.25,
    height: '80%',
    alignSelf: 'flex-start',
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
