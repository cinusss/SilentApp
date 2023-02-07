import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DeleteAccountForm from '../../viewForms/deleteAccountForm';

export default function DeleteAccountModal({
  navigation,
  modalDeleteOpen,
  setModalDeleteOpen,
  modalDeletedOpen,
  setModalDeletedOpen,
}) {
  return (
    <Modal visible={modalDeleteOpen} transparent={true} animationType="slide">
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.modalPartOne} />
          <DeleteAccountForm
            navigation={navigation}
            modalDeleteOpen={modalDeleteOpen}
            setModalDeleteOpen={setModalDeleteOpen}
            modalDeletedOpen={modalDeletedOpen}
            setModalDeletedOpen={setModalDeletedOpen}
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
  modalPartThree: {
    flex: 1,
    backgroundColor: 'green',
  },
});
