import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Switch,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {globalStyles} from '../../styles/global';
import CookieManager from '@react-native-community/cookies';

import ActionModal from '../../modals/ActionModals/actionModal';
import ActionFinishedModal from '../../modals/ActionModals/actionFinishedModal';
import ActionNotLoggedModal from '../../modals/ActionModals/actionNotLoggedModal';
import ActionErrorModal from '../../modals/ActionModals/actionErrorModal';

import {
  asyncEmptyLoggedGet,
  asyncRefreshToken,
} from '../../services/repository';
import {getActionsInfo, getLinks} from '../../consts/constans';
import LoadingComponent from '../../components/loadingComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {clearAllData} from '../../services/extensions';
import NetInfo from '@react-native-community/netinfo';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function ActionView({navigation}) {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([
    {actionsNumber: '', groupName: '', numberOfUsers: ''},
  ]);
  const [linkList, setLinkList] = useState([{link: '', linkId: ''}]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalFinishedOpen, setModalFinishedOpen] = useState(false);
  const [modalNotLoggedOpen, setModalNotLoggedOpen] = useState(false);
  const [modalErrorOpen, setModalErrorOpen] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [numberOfLikes, setnumberOfLikes] = useState(0);
  const [downloadDate, setDownloadDate] = useState('');
  const [instagramName, setInstagramName] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [indicatiorLoading, setIndicatiorLoading] = useState(false);
  const [isNetwork, setIsNetwork] = useState(true);
  const logoutHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ChooseRT'}],
    });
  };

  useEffect(function effectFunction() {
    async function fetchData() {
      setInstagramName(await AsyncStorage.getItem('instagramName'));
      const result = await asyncEmptyLoggedGet(getActionsInfo);
      if (result != null) {
        const list = await result.actionDatas;
        await AsyncStorage.setItem(
          'numberofActions',
          list[0].actionsNumber.toString(),
        );
        await AsyncStorage.setItem(
          'numberOfLikes',
          result.numberOfLikes.toString(),
        );
        setData(list);
        setnumberOfLikes(result.numberOfLikes);
        setIsLoading(false);
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkIsWebViewLogged() {
    CookieManager.get('https://instagram.com', false).then(cookie => {
      if (cookie.sessionid == null) {
        setModalNotLoggedOpen(true);
      }
    });
  }

  async function handleActionClick() {
    setIndicatiorLoading(true);
    checkIsWebViewLogged();
    if (!modalNotLoggedOpen) {
      const result = await asyncEmptyLoggedGet(getLinks, '?groupId=1'); //TODO tu do zmiany kiedy grupa
      if (result != null) {
        const list = await result.linkDatas;
        await AsyncStorage.setItem(
          'downloadDate',
          result.downloadDate.toString(),
        );
        setDownloadDate(result.downloadDate.toString());
        await AsyncStorage.setItem(
          'linkList',
          JSON.stringify(result.linkDatas),
        );
        setLinkList(list);
        setModalOpen(true);
        setIndicatiorLoading(false);
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
            handleActionClick();
          }
        }
      }
    }
  }

  function isActionToDo() {
    if (data.some(x => x.actionsNumber !== 0) && isEnabled) {
      return true;
    } else {
      return false;
    }
  }

  function renderListOfAction() {
    return data.map((item, index) => {
      return (
        <View style={styles.middleRow} key={index}>
          <View style={styles.middleColumn}>
            <Text style={styles.textWhiteSmall}>{item.groupName}</Text>
          </View>
          <View style={styles.middleColumn}>
            <Text style={styles.textWhiteSmall}>{item.actionsNumber}</Text>
          </View>
          <View style={styles.middleColumn}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isEnabled ? '#4eb8ce' : 'white'}
              disabled={data[0].actionsNumber === 0 ? true : false}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      );
    });
  }

  if (!isLoading) {
    return (
      <ImageBackground
        source={require('../../images/register_details/BackgroundInside_SilentApp.png')}
        style={styles.container}>
        <View style={styles.middleTopOne}>
          <View style={styles.middleTopColumn}>
            <Text style={styles.textBlueNormal}>
              Liczba osób na grupie zaangażowania:
            </Text>
          </View>
          <View style={styles.middleTopColumn}>
            <Text style={styles.textBlueNormal}>{data[0].numberOfUsers}</Text>
          </View>
        </View>
        <View style={styles.middleTopTwo}>
          <View style={styles.middleTopColumn}>
            <Text style={styles.textBlueNormal}>
              Łączna liczba zdobytych polubień:
            </Text>
          </View>
          <View style={styles.middleTopColumn}>
            <Text style={styles.textBlueNormal}>{numberOfLikes}</Text>
          </View>
        </View>
        <View style={styles.top}>
          <View style={styles.topCenter}>
            <Text style={styles.textWhiteBig}>
              Musisz jeszcze wykonać akcje na następujących grupach
              zaangażowania, aby Twój post mógł zostać opublikowany:
            </Text>
          </View>
        </View>
        <View style={styles.middle}>
          <View style={styles.middleRow}>
            <View style={styles.middleColumn}>
              <Text style={styles.textWhiteNormal}>Nazwa grupy</Text>
            </View>
            <View style={styles.middleColumn}>
              <Text style={styles.textWhiteNormal}>Liczba akcji</Text>
            </View>
            <View style={styles.middleColumn}>
              <Text style={styles.textWhiteNormal}>Wybierz</Text>
            </View>
          </View>

          {renderListOfAction()}

          <ActionModal
            navigation={navigation}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            modalFinishedOpen={modalFinishedOpen}
            setModalFinishedOpen={setModalFinishedOpen}
            linkList={linkList}
            downloadDate={downloadDate}
            data={data}
            setData={setData}
            instagramName={instagramName}
            modalNotLoggedOpen={modalNotLoggedOpen}
            setModalNotLoggedOpen={setModalNotLoggedOpen}
            modalErrorOpen={modalErrorOpen}
            setModalErrorOpen={setModalErrorOpen}
            isNetwork={isNetwork}
            setIsNetwork={setIsNetwork}
            numberOfLikes={numberOfLikes}
            setnumberOfLikes={setnumberOfLikes}
          />

          <ActionFinishedModal
            navigation={navigation}
            modalFinishedOpen={modalFinishedOpen}
            setModalFinishedOpen={setModalFinishedOpen}
          />

          <ActionNotLoggedModal
            navigation={navigation}
            modalNotLoggedOpen={modalNotLoggedOpen}
            setModalNotLoggedOpen={setModalNotLoggedOpen}
          />

          <ActionErrorModal
            modalErrorOpen={modalErrorOpen}
            setModalErrorOpen={setModalErrorOpen}
          />

          <View style={styles.middleRowButton}>
            {indicatiorLoading && (
              <ActivityIndicator size="large" color="#4eb8ce" />
            )}

            {!indicatiorLoading && (
              <View
                style={
                  isActionToDo() ? styles.buttonActive : styles.buttonInActive
                }>
                <TouchableOpacity
                  disabled={!isActionToDo(data)}
                  onPress={handleActionClick}>
                  <Text style={globalStyles.textButton}>Wykonaj akcje</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.parentBottom}>
            <Text style={styles.textWhite}>Copyright © SpaceOfApps 2020</Text>
          </View>
        </View>
      </ImageBackground>
    );
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
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  topCenter: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 2,
    width: '100%',
  },
  middleRow: {
    flex: 1,
    flexDirection: 'row',
  },
  middleColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleTopOne: {
    paddingTop: '3%',
    paddingBottom: '2%',
    flex: 0.5,
    flexDirection: 'row',
    marginLeft: '5%',
    left: 20,
  },
  middleTopTwo: {
    paddingTop: '1%',
    paddingBottom: '3%',
    flex: 0.5,
    flexDirection: 'row',
    marginLeft: '5%',
    left: 20,
  },
  middleTopColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleRowButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonActive: {
    width: '45%',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    borderColor: 'black',
    padding: 10,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonInActive: {
    width: '45%',
    borderWidth: 1,
    backgroundColor: 'rgba(211,211,211,0.45)',
    borderColor: 'black',
    padding: 10,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: 'center',
  },
  bottom: {
    flex: 1,
    width: '100%',
  },
  parentBottom: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textWhiteBig: {
    color: '#ffffff',
    fontSize: 17,
    textAlign: 'center',
  },
  textWhiteNormal: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textBlueNormal: {
    color: '#4eb8ce',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textWhiteSmall: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  textWhite: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
});
