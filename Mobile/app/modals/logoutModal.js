import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {clearAllData, clearData} from '../services/extensions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function LogoutModal({
  navigation,
  modalLogoutOpen,
  setModalLogoutOpen,
}) {
  const [indicatiorLoading, setIndicatiorLoading] = useState(false);

  return (
    <Modal visible={modalLogoutOpen} transparent={true} animationType="slide">
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.modalPartOne} />
          <View style={styles.modalPartTwo}>
            <View style={styles.modalSpaceText}>
              <Text style={styles.modalTextBig}>Wyloguj</Text>
              <Text style={styles.modalTextSmall}>
                Czy na pewno chcesz się wylogować?
              </Text>
            </View>
            <View style={styles.modalSpaceButton}>
              <View style={styles.spaceButtonOne}>
                <TouchableOpacity style={styles.modalButtonBack}>
                  <Text
                    onPress={() => setModalLogoutOpen(false)}
                    style={styles.modalTextButtonBack}>
                    Powrót
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spaceButtonTwo}>
                <TouchableOpacity
                  style={styles.modalButtonDelete}
                  onPress={() => {
                    clearData();
                    setModalLogoutOpen(false);
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'ChooseRT'}],
                    });
                  }}>
                  <Text style={styles.modalTextButtonLogout}>
                    Wyloguj z aplikacji
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spaceButtonThree}>
                <TouchableOpacity
                  style={styles.modalButtonDelete}
                  onPress={() => {
                    clearAllData();
                    setModalLogoutOpen(false);
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'ChooseRT'}],
                    });
                  }}>
                  <Text style={styles.modalTextButtonFullLogout}>
                    Wyloguj z aplikacji i Instagrama
                  </Text>
                </TouchableOpacity>
                {indicatiorLoading && (
                  <ActivityIndicator size="large" color="#4eb8ce" />
                )}
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
    width: '90%',
    alignSelf: 'center',
  },
  modalPartOne: {
    flex: 1,
    backgroundColor: 'green',
  },
  modalPartTwo: {
    flex: 6,
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
    fontSize: 16,
  },
  modalTextBig: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    fontSize: 19,
    fontWeight: 'bold',
  },
  modalSpaceButton: {
    flex: 1,
    flexDirection: 'row',
    height: deviceHeight * 0.15,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  spaceButtonOne: {
    flex: 0.8,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  spaceButtonTwo: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  spaceButtonThree: {
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
  modalTextButtonBack: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
  },
  modalTextButtonLogout: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: '#4eb8ce',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  modalTextButtonFullLogout: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: '#08080a',
  },
  modalPartThree: {
    flex: 1,
    backgroundColor: 'green',
  },
});
