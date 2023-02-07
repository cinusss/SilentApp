import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';

export default function PublishedFailureModal({
  navigation,
  modalFailureOpen,
  setModalFailureOpen,
}) {
  const actionHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ActionView'}],
    });
  };

  return (
    <Modal visible={modalFailureOpen} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalPartOne} />
        <View style={styles.modalPartTwo}>
          <View style={styles.modalSpaceText}>
            <Text style={styles.modalTextBig}>
              Twój post nie został opublikowany.
            </Text>
            <Text style={styles.modalTextSmall}>
              Aby Twój kolejny post mógł zostać opublikowany, musisz najpierw
              wykonać akcje przypisane do Twojego konta.
            </Text>
          </View>

          <View style={styles.modalSpaceButton}>
            <View style={styles.spaceButton}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalFailureOpen(false);
                  actionHandler();
                }}>
                <Text style={styles.modalTextButton}>Przejdź do akcji</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.modalPartThree} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  modalPartOne: {
    flex: 2,
  },
  modalPartTwo: {
    flex: 2.5,
    backgroundColor: 'rgba(250,250,250,0.97)',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
  },
  modalSpaceText: {
    flex: 2.5,
    justifyContent: 'center',
  },
  modalTextSmall: {
    flex: 1.5,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 14,
  },
  modalTextBig: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalSpaceButton: {
    flex: 1,
    flexDirection: 'row',
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
  modalButton: {
    width: '35%',
    height: '70%',
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
    flex: 2,
  },
});
