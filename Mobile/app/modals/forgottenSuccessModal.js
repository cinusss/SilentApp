import React from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import {TouchableHighlight, ScrollView} from 'react-native-gesture-handler';

export default function ForgottenSuccessModal({
  navigation,
  modalSuccessOpen,
  setModalSuccessOpen,
}) {
  return (
    <ScrollView style={styles.modal}>
      <Modal
        visible={modalSuccessOpen}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalPartOne} />
          <View style={styles.modalPartTwo}>
            <View style={styles.modalSpaceText}>
              <Text style={styles.modalTextBig}>Dziękujemy</Text>
              <Text style={styles.modalTextSmall}>
                Jeśli dane są poprawne na podany adres e-mail zostanie wysłany
                link do zmiany hasła.
              </Text>
            </View>
            <View style={styles.modalSpaceButton}>
              <TouchableHighlight style={styles.modalButton}>
                <Text
                  onPress={() => {
                    setModalSuccessOpen(false);
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'LoginRT'}],
                    });
                  }}
                  style={styles.modalTextButton}>
                  Potwierdź
                </Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.modalPartThree} />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  modalPartOne: {
    flex: 1,
  },
  modalPartTwo: {
    flex: 1,
    backgroundColor: 'rgba(250,250,250,0.97)',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  modalSpaceText: {
    flex: 2,
    justifyContent: 'center',
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
  modalSpaceButton: {
    flex: 1,
  },
  modalButton: {
    width: '35%',
    height: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
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
  modalPartThree: {
    flex: 1,
  },
});
