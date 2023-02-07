import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function ContactModal({props, modalOpen, setModalOpen}) {
  return (
    <View style={styles.modal}>
      <Modal isVisible={modalOpen}>
        <View style={styles.container}>
          <View style={styles.top} />
          <View style={styles.middle}>
            <View style={styles.partOne}>
              {props.errors.title && (
                <Text style={styles.text}>{props.errors.title}</Text>
              )}
              {props.errors.message && (
                <Text style={styles.text}>{props.errors.message}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.partTwo}
              onPress={() => {
                setModalOpen(false);
                props.setErrors({});
              }}>
              <Text style={styles.button}>OK</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom} />
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    height: deviceHeight,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    width: deviceWidth,
    flex: 3.5,
  },
  middle: {
    width: deviceWidth * 0.9,
    flex: 4,
    backgroundColor: 'rgba(250,250,250,0.97)',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  partOne: {
    height: deviceHeight * 0.25,
    justifyContent: 'center',
  },
  text: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  partTwo: {
    height: deviceHeight * 0.1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: '35%',
    backgroundColor: '#4eb8ce',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    padding: 10,
  },
  bottom: {
    width: deviceWidth,
    flex: 3,
  },
});
