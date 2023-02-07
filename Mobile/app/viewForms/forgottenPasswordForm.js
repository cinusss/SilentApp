import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {globalStyles} from '../styles/global';
import {Formik} from 'formik';
import {TouchableHighlight} from 'react-native-gesture-handler';
import ForgottenModal from '../modals/forgottenModal';
import ForgottenSuccessModal from '../modals/forgottenSuccessModal';
import {forgottenSchema} from '../validators/registerDetailedValidators';
import {forgottenPassword} from '../consts/constans';
import {asyncEmptyPost} from '../services/repository';

export default function ForgottenPasswordForm({navigation}) {
  // eslint-disable-next-line no-unused-vars
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);

  const [indicatiorLoading, setIndicatiorLoading] = useState(false);

  async function handleSubmitForm(object) {
    setIndicatiorLoading(true);
    let result = JSON.parse(
      await asyncEmptyPost(
        JSON.stringify({
          email: object.email,
        }),
        forgottenPassword,
      ),
    );
    if (result.status) {
      setModalSuccessOpen(true);
      setIndicatiorLoading(false);
    }
  }
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{email: ''}}
        validationSchema={forgottenSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={initialvalues => handleSubmitForm(initialvalues)}>
        {props => (
          <View style={StyleSheet.container}>
            <ForgottenModal
              props={props}
              modalOpen={props.errors.email ? true : false}
              setModalOpen={setModalOpen}
            />
            <ForgottenSuccessModal
              navigation={navigation}
              modalSuccessOpen={modalSuccessOpen}
              setModalSuccessOpen={setModalSuccessOpen}
            />
            <TextInput
              selectedValue={props.values.email}
              mode="dialog"
              style={styles.input}
              placeholder="Wprowadź adres e-mail"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              placeholderTextColor="#bccdce"
            />
            {indicatiorLoading && (
              <ActivityIndicator size="large" color="#4eb8ce" />
            )}

            {!indicatiorLoading && (
              <View style={styles.button}>
                <TouchableHighlight>
                  <Text
                    style={globalStyles.textButton}
                    onPress={props.handleSubmit}>
                    WYŚLIJ
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '110%',
    backgroundColor: 'rgba(19,20,27,0.1)',
    textAlign: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 12,
    color: 'white',
    marginBottom: 5,
  },
  button: {
    width: '70%',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    borderColor: 'black',
    padding: 10,
    borderRadius: 12,
    color: 'white',
    marginTop: 15,
    alignSelf: 'center',
  },
});
