import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ChangePasswordModal from '../../modals/SettingsModals/changePasswordModal';
import ChangedPasswordModal from '../../modals/SettingsModals/changedPasswordModal';
import DeleteAccountModal from '../../modals/SettingsModals/deleteAccountModal';
import DeletedAccountModal from '../../modals/SettingsModals/deletedAccountModal';

import {
  asyncEmptyLoggedGet,
  asyncRefreshToken,
} from '../../services/repository';
import {getUserInformation} from '../../consts/constans';
import LoadingComponent from '../../components/loadingComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {clearAllData} from '../../services/extensions';
import NetInfo from '@react-native-community/netinfo';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function SettingsView({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    {
      accountName: '',
      instagramName: '',
      instagramNameUpgrade: '',
      accountTypeName: '',
      expireNormal: '',
      expireUpgrade: '',
      expirePremium: '',
    },
  ]);
  const [modalChangeOpen, setModalChangeOpen] = useState(false);
  const [modalChangedOpen, setModalChangedOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalDeletedOpen, setModalDeletedOpen] = useState(false);

  const [isNetwork, setIsNetwork] = useState(true);
  const logoutHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ChooseRT'}],
    });
  };

  useEffect(function effectFunction() {
    async function fetchData() {
      const settingsData = JSON.parse(
        await AsyncStorage.getItem('settingsUserData'),
      );
      if (settingsData) {
        setData(settingsData);
        setIsLoading(false);
      } else {
        const result = await asyncEmptyLoggedGet(getUserInformation);
        if (result != null) {
          const list = await result.userInformationDatas;
          setData(list);
          setIsLoading(false);
          await AsyncStorage.setItem('settingsUserData', JSON.stringify(list));
        } else {
          NetInfo.fetch().then(state => {
            setIsNetwork(state.isConnected);
          });
          if (isNetwork) {
            const refreshResult = await asyncRefreshToken();
            if (!refreshResult) {
              clearAllData();
              logoutHandler();
            } else {
              fetchData();
            }
          }
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderSettingsInfo(object) {
    return object.map((item, key) => {
      return (
        <ImageBackground
          source={require('../../images/register_details/BackgroundInside_SilentApp.png')}
          style={styles.container}
          key={key}>
          <ChangePasswordModal
            navigation={navigation}
            modalChangeOpen={modalChangeOpen}
            setModalChangeOpen={setModalChangeOpen}
            modalChangedOpen={modalChangedOpen}
            setModalChangedOpen={setModalChangedOpen}
          />
          <ChangedPasswordModal
            modalChangedOpen={modalChangedOpen}
            setModalChangedOpen={setModalChangedOpen}
          />

          <DeleteAccountModal
            navigation={navigation}
            modalDeleteOpen={modalDeleteOpen}
            setModalDeleteOpen={setModalDeleteOpen}
            modalDeletedOpen={modalDeletedOpen}
            setModalDeletedOpen={setModalDeletedOpen}
          />
          <DeletedAccountModal
            navigation={navigation}
            modalDeletedOpen={modalDeletedOpen}
            setModalDeletedOpen={setModalDeletedOpen}
          />
          <View style={styles.top}>
            <View style={styles.rowOne}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/Profile_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textBlue}>Nazwa użytkownika</Text>
              </View>
              <View style={styles.columnThree}>
                <Text style={styles.textWhiteBig}>{item.accountName}</Text>
              </View>
              <View style={styles.columnFour}>
                <Text />
              </View>
            </View>
            <View style={styles.rowTwo}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/In-m_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textBlue}>Konto Instagram</Text>
              </View>
              <View style={styles.columnThree}>
                <Text style={styles.textWhiteBig}>{item.instagramName}</Text>
              </View>
              <View style={styles.columnFour}>
                <Text />
              </View>
            </View>
            <View style={styles.rowThree}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/Upgrade_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textBlue}>Konto SilentApp+</Text>
              </View>
              <View style={styles.columnThree}>
                <Text style={styles.textWhiteBig}>
                  {item.instagramNameUpgrade}
                </Text>
              </View>
              <View style={styles.columnFour}>
                <View style={styles.touchableOpacitySpace}>
                  <TouchableOpacity
                    disabled={true}
                    style={styles.touchableOpacityInactive}>
                    <Text>Dodaj</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.middleUp}>
            <View style={styles.rowOne}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/Licence_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textBlue}>Typ licencji</Text>
              </View>
              <View style={styles.columnThree}>
                <Text style={styles.textWhiteBig}>{item.accountTypeName}</Text>
              </View>
              <View style={styles.columnFour}>
                <View style={styles.touchableOpacitySpace}>
                  <TouchableOpacity
                    disabled={true}
                    style={styles.touchableOpacityInactive}>
                    <Text>Zmień plan</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.rowTwo}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/Calendar_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textBlue}>Data wygaśnięcia</Text>
              </View>
              <View style={styles.columnThree}>
                <Text style={styles.textWhiteBig}>
                  {item.expireNormal == null
                    ? 'Nie przypisano'
                    : item.expireNormal}
                </Text>
              </View>
              <View style={styles.columnFour}>
                <View style={styles.touchableOpacitySpace}>
                  <TouchableOpacity
                    disabled={true}
                    style={styles.touchableOpacityInactive}>
                    <Text>Przedłuż</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.rowThree}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/Password_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textBlue}>Zmiana hasła</Text>
              </View>
              <View style={styles.columnThree}>
                <Text />
              </View>
              <View style={styles.columnFour}>
                <View style={styles.touchableOpacitySpace}>
                  <TouchableOpacity style={styles.touchableOpacityActive}>
                    <Text onPress={() => setModalChangeOpen(true)}>Zmień</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.middleDown}>
            <View style={styles.row}>
              <Text style={styles.textWhiteSettings}>Informacje prawne</Text>
            </View>
            <View style={styles.rowTwo}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/Document_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textBlue}>Regulamin</Text>
              </View>
              <View style={styles.columnThree}>
                <Text style={styles.textFile}>Plik do pobrania wkrótce</Text>
              </View>
              <View style={styles.columnFour}>
                <Text />
              </View>
            </View>
            <View style={styles.rowThree}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/Calendar_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textBlue}>Polityka prywatności</Text>
              </View>
              <View style={styles.columnThree}>
                <Text style={styles.textFile}>Plik do pobrania wkrótce</Text>
              </View>
              <View style={styles.columnFour}>
                <Text />
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.rowOne}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Image
                    source={require('../../images/small_icons/Settings/Trash_white.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.columnTwo}>
                <Text style={styles.textWhiteSettings}>Usuń konto</Text>
              </View>
              <View style={styles.columnThree}>
                <Text />
              </View>
              <View style={styles.columnFour}>
                <View style={styles.touchableOpacitySpace}>
                  <TouchableOpacity style={styles.touchableOpacityActive}>
                    <Text onPress={() => setModalDeleteOpen(true)}>
                      Usuń konto
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.rowTwo}>
              <View style={styles.columnOne}>
                <View style={styles.parentImage}>
                  <Text style={styles.textWhite}>
                    Copyright © SpaceOfApps 2020
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      );
    });
  }

  if (!isLoading) {
    return <ScrollView>{renderSettingsInfo(data)}</ScrollView>;
  } else {
    return <LoadingComponent />;
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(19,20,27,0.85)',
  },
  top: {
    flex: 4,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
  },
  rowOne: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnOne: {
    flex: 1,
  },
  columnTwo: {
    flex: 2,
  },
  columnThree: {
    flex: 2,
  },
  columnFour: {
    flex: 2,
  },
  rowTwo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowThree: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleUp: {
    flex: 4,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
  },
  middleOne: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  middleDown: {
    flex: 3,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
  },
  bottom: {
    flex: 3,
    width: '100%',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  parentImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
  textBlue: {
    color: '#4eb8ce',
    fontSize: 14,
  },
  textWhiteSettings: {
    color: '#ffffff',
    fontSize: 14,
  },
  touchableOpacitySpace: {
    alignItems: 'center',
  },
  touchableOpacityActive: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#4eb8ce',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '80%',
    marginVertical: 10,
  },
  touchableOpacityInactive: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(211,211,211,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '80%',
    marginVertical: 10,
  },
  textWhiteBig: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  textWhite: {
    color: '#ffffff',
    fontSize: 12,
  },
  textFile: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
  },
});
