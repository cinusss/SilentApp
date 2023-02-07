import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {globalStyles} from '../styles/global';
import CreateAccountValidationModal from '../modals/createAccountValidationModal';
import {createAccountSchema} from '../validators/registerDetailedValidators';
import {asyncEmptyPost} from '../services/repository';
import {createAccount} from '../consts/constans';
import GenericModal from '../modals/genericModal';
import AsyncStorage from '@react-native-community/async-storage';

const deviceWidth = Dimensions.get('window').width;

export default function CreateAccountForm({navigation}) {
  // eslint-disable-next-line no-unused-vars
  const [modalOpen, setModalOpen] = useState(false);
  const [genericModalOpen, setGenericModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const [indicatiorLoading, setIndicatiorLoading] = useState(false);

  async function handleSubmitForm(object) {
    setIndicatiorLoading(true);
    let result = JSON.parse(
      await asyncEmptyPost(
        JSON.stringify({
          accountName: object.username,
          password: object.password,
          email: object.email,
        }),
        createAccount,
      ),
    );
    if (result.status) {
      await AsyncStorage.setItem('isLogged', '1');
      await AsyncStorage.setItem('userId', result.data.userId.toString());
      await AsyncStorage.setItem('token', result.data.token.toString());
      await AsyncStorage.setItem('refresh', result.data.refresh.toString());
      navigation.reset({
        index: 0,
        routes: [{name: 'CreateAccountDetailedView'}],
      });
    } else {
      setValidationMessage(result.message);
      setGenericModalOpen(true);
      setIndicatiorLoading(false);
    }
  }

  return (
    <View style={globalStyles.container}>
      {genericModalOpen && (
        <GenericModal
          message={validationMessage}
          genericModalOpen={genericModalOpen}
          setGenericModalOpen={setGenericModalOpen}
        />
      )}
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          repeatpassword: '',
        }}
        validationSchema={createAccountSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={initialValues => handleSubmitForm(initialValues)}>
        {props => (
          <View>
            <CreateAccountValidationModal
              props={props}
              modalOpen={
                props.errors.username ||
                props.errors.email ||
                props.errors.password ||
                props.errors.repeatpassword
                  ? true
                  : false
              }
              setModalOpen={setModalOpen}
            />
            <View style={styles.container}>
              <TextInput
                selectedValue={props.values.username}
                maxLength={29}
                style={styles.input}
                placeholder="Nazwa użytkownika"
                onChangeText={props.handleChange('username')}
                value={props.values.username}
                placeholderTextColor="#bccdce"
              />
              <TextInput
                selectedValue={props.values.email}
                mode="dialog"
                style={styles.input}
                placeholder="Adres e-mail"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                placeholderTextColor="#bccdce"
              />
              <TextInput
                selectedValue={props.values.password}
                mode="dialog"
                maxLength={45}
                style={styles.input}
                placeholder="Hasło"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                placeholderTextColor="#bccdce"
                secureTextEntry={true}
              />
              <TextInput
                selectedValue={props.values.repeatpassword}
                mode="dialog"
                maxLength={45}
                style={styles.input}
                placeholder="Potwierdź hasło"
                onChangeText={props.handleChange('repeatpassword')}
                value={props.values.repeatpassword}
                placeholderTextColor="#bccdce"
                secureTextEntry={true}
              />
              {indicatiorLoading && (
                <ActivityIndicator size="large" color="#4eb8ce" />
              )}

              {!indicatiorLoading && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={props.handleSubmit}>
                  <Text style={styles.textButton}>Utwórz konto</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '85%',
    height: '12%',
    backgroundColor: 'rgba(19,20,27,0.1)',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    textAlign: 'center',
    alignSelf: 'center',
    marginVertical: 8,
    fontSize: 14,
    color: 'white',
  },
  button: {
    width: deviceWidth * 0.4,
    height: '15%',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    justifyContent: 'center',
    borderColor: 'black',
    padding: 10,
    borderRadius: 12,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 17,
  },
  textButton: {
    fontSize: 15,
    textAlign: 'center',
  },
});
