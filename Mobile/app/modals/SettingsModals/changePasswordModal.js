import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ChangePasswordForm from '../../viewForms/changePasswordForm';

export default function ChangePasswordModal({
  modalChangeOpen,
  setModalChangeOpen,
  modalChangedOpen,
  setModalChangedOpen,
}) {
  return (
    <Modal visible={modalChangeOpen} transparent={true} animationType="slide">
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.modalPartOne} />
          <ChangePasswordForm
            modalChangeOpen={modalChangeOpen}
            setModalChangeOpen={setModalChangeOpen}
            modalChangedOpen={modalChangedOpen}
            setModalChangedOpen={setModalChangedOpen}
          />
          <View style={styles.modalPartThree} />
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: '45%',
    flexDirection: 'column',
  },
  modalPartOne: {
    flex: 1,
    backgroundColor: 'green',
  },
  modalPartTwo: {
    flex: 3,
    backgroundColor: 'rgba(250,250,250,0.97)',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  modalPartThree: {
    flex: 1,
    backgroundColor: 'green',
  },
});
