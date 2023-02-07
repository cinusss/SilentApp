import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {TouchableHighlight} from 'react-native-gesture-handler';
import LoginModal from '../modals/loginModal';
import {loginSchema} from '../validators/registerDetailedValidators';
import {asyncEmptyPost} from '../services/repository';
import {login} from '../consts/constans';
import GenericModal from '../modals/genericModal';
import AsyncStorage from '@react-native-community/async-storage';

const deviceWidth = Dimensions.get('window').width;

export default function LoginForm({navigation}) {
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
        }),
        login,
      ),
    );
    if (result.status) {
      if (result.data.editedProfile) {
        await AsyncStorage.setItem('isLogged', '1');
        await AsyncStorage.setItem('userId', result.data.userId.toString());
        await AsyncStorage.setItem('editedProfile', '1');
        await AsyncStorage.setItem('instagramName', result.data.instagramName);
        await AsyncStorage.setItem('token', result.data.token.toString());
        await AsyncStorage.setItem('refresh', result.data.refresh.toString());
        navigation.reset({
          index: 0,
          routes: [{name: 'PublishView'}],
        });
      } else {
        await AsyncStorage.setItem('isLogged', '1');
        await AsyncStorage.setItem('userId', result.data.userId.toString());
        await AsyncStorage.setItem('editedProfile', '0');
        await AsyncStorage.setItem('token', result.data.token.toString());
        await AsyncStorage.setItem('refresh', result.data.refresh.toString());
        navigation.reset({
          index: 0,
          routes: [{name: 'CreateAccountDetailedView'}],
        });
      }
    } else {
      setValidationMessage(result.message);
      setGenericModalOpen(true);
      setIndicatiorLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {genericModalOpen && (
        <GenericModal
          message={validationMessage}
          genericModalOpen={genericModalOpen}
          setGenericModalOpen={setGenericModalOpen}
        />
      )}
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={loginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={initialvalues => handleSubmitForm(initialvalues)}>
        {props => (
          <View style={styles.containerInside}>
            <LoginModal
              props={props}
              modalOpen={
                props.errors.username || props.errors.password ? true : false
              }
              setModalOpen={setModalOpen}
            />
            <View style={styles.spaceTextInput}>
              <TextInput
                selectedValue={props.values.username}
                mode="dialog"
                maxLength={29}
                style={styles.input}
                placeholder="Nazwa użytkownika"
                onChangeText={props.handleChange('username')}
                value={props.values.username}
                placeholderTextColor="#bccdce"
              />

              <TextInput
                selectedValue={props.values.password}
                mode="dialog"
                style={styles.input}
                placeholder="Hasło"
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                placeholderTextColor="#bccdce"
                secureTextEntry={true}
              />
            </View>
            {indicatiorLoading && (
              <ActivityIndicator size="large" color="#4eb8ce" />
            )}

            {!indicatiorLoading && (
              <View style={styles.spaceButton}>
                <TouchableHighlight style={styles.button}>
                  <Text style={styles.textButton} onPress={props.handleSubmit}>
                    ZALOGUJ
                  </Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  containerInside: {
    flex: 1,
    justifyContent: 'center',
  },
  spaceTextInput: {
    flex: 2,
    marginTop: '-20%',
  },
  input: {
    flex: 1,
    marginVertical: 10,
    width: '85%',
    height: '100%',
    backgroundColor: 'rgba(19,20,27,0.1)',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    color: 'white',
  },
  spaceButton: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    height: '80%',
    width: deviceWidth * 0.35,
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    justifyContent: 'center',
    borderColor: 'black',
    borderRadius: 12,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textButton: {
    fontSize: 14,
    textAlign: 'center',
  },
});
