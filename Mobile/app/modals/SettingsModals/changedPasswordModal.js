import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function ChangedPasswordModal({
  modalChangedOpen,
  setModalChangedOpen,
}) {
  return (
    <Modal visible={modalChangedOpen} transparent={true} animationType="slide">
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.modalPartOne} />
          <View style={styles.modalPartTwo}>
            <View style={styles.modalSpaceText}>
              <Text style={styles.modalTextBig}>
                Twoje hasło zostało pomyślnie zmienione.
              </Text>
              <Text style={styles.modalTextSmall}>
                Kliknij poniższy przycisk, aby wrócić do aplikacji.
              </Text>
            </View>

            <View style={styles.modalSpaceButton}>
              <View style={styles.spaceButton}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalChangedOpen(false)}>
                  <Text style={styles.modalTextButton}>OK </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    borderRadius: 15,
    marginTop: '18%',
  },
  modalSpaceText: {
    flex: 1,
    height: deviceHeight * 0.15,
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
  modalButton: {
    width: deviceWidth * 0.25,
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
    flex: 1,
    backgroundColor: 'green',
  },
});
