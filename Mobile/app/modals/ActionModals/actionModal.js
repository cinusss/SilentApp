import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Animated,
} from 'react-native';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import {addAction, getActionsInfo} from '../../consts/constans';
import {
  asyncEmptyLoggedPost,
  asyncEmptyLoggedGet,
  asyncRefreshToken,
} from '../../services/repository';
import {showAlert} from '../../services/errorHandler';
import LottieView from 'lottie-react-native';

import {clearAllData} from '../../services/extensions';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import {createJsLink} from '../../services/linkService';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function ActionModal({
  navigation,
  modalOpen,
  setModalOpen,
  modalFinishedOpen,
  setModalFinishedOpen,
  linkList,
  downloadDate,
  data,
  setData,
  instagramName,
  modalNotLoggedOpen,
  setModalNotLoggedOpen,
  errorModalOpen,
  setErrorModalOpen,
  isNetwork,
  setIsNetwork,
  numberOfLikes,
  setnumberOfLikes,
}) {
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(new Animated.Value(0));
  const LottieRef = useRef(null);

  const logoutHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'ChooseRT'}],
    });
  };

  Animated.loop(
    Animated.sequence([
      Animated.timing(progress, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: false,
      }),
    ]),
    {
      iterations: -1,
    },
  ).start();

  async function addLinks() {
    let result = JSON.parse(
      await asyncEmptyLoggedPost(
        JSON.stringify({
          linkIdList: linkList.map(link => link.linkId),
          actionDate: downloadDate,
          active: false,
        }),
        addAction,
        navigation,
      ),
    );
    if (result != null) {
      await fetchActionsInfo(navigation);
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
          addLinks();
        }
      }
    }
  }

  async function fetchActionsInfo() {
    const resultData = await asyncEmptyLoggedGet(getActionsInfo);
    if (resultData != null) {
      const list = await resultData.actionDatas;
      await AsyncStorage.setItem(
        'numberofActions',
        list[0].actionsNumber.toString(),
      );
      await AsyncStorage.setItem(
        'numberOfLikes',
        resultData.numberOfLikes.toString(),
      );
      setData(list);
      setnumberOfLikes(resultData.numberOfLikes);
    } else {
      NetInfo.fetch().then(state => {
        setIsNetwork(state.isConnected);
      });
      if (isNetwork) {
        const refreshResult = await asyncRefreshToken();
        if (!refreshResult) {
          clearAllData();
          navigation.reset({
            index: 0,
            routes: [{name: 'ChooseRT'}],
          });
        } else {
          logoutHandler();
        }
      }
    }
  }

  //TODO Wysyłać tylko id paczki (tworzyć paczki, a później je kasować)

  function onNavigationStateChange(webViewState) {
    if (webViewState.url === 'https://www.google.com/') {
      addLinks(linkList, downloadDate, setData, navigation);
      setModalOpen(false);
      setModalFinishedOpen(true);
    } else if (webViewState.url === 'http://silentapp.pl/') {
      setModalOpen(false);
      setErrorModalOpen(true);
    } else if (webViewState.url === 'http://www.spaceofapps.com/') {
      setModalOpen(false);
      setModalNotLoggedOpen(true);
    }
  }

  return (
    <View style={styles.modal}>
      <Modal isVisible={modalOpen}>
        <View style={styles.container}>
          <View style={styles.top} />
          <View style={styles.middle}>
            <View style={styles.partOne}>
              <LottieView
                ref={LottieRef}
                source={require('../../images/animations/loader.json')}
                progress={progress}
              />
              <View style={styles.webView}>
                <WebView
                  source={{
                    uri:
                      'https://www.instagram.com/' +
                      instagramName.toLowerCase() +
                      '/',
                  }}
                  javaScriptEnabled={true}
                  injectedJavaScript={createJsLink(
                    linkList,
                    modalOpen,
                    instagramName,
                  )}
                  onNavigationStateChange={onNavigationStateChange.bind(this)}
                  onError={() => {
                    setModalOpen(false);
                    showAlert();
                  }}
                />
              </View>
            </View>
            <View style={styles.partTwo}>
              <Text style={styles.textBig}>
                Twoje polubienia są właśnie wykonywane!
              </Text>
              <Text style={styles.textSmall}>
                W przypadku większej liczby akcji do wykonania
              </Text>
              <Text style={styles.textSmall}>
                może potrwać to chwilę dłużej. Nie przerywaj procesu.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.partThree}
              onPress={() => {
                setModalOpen(false);
              }}>
              <Text style={styles.button}>Anuluj</Text>
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
    flex: 0.2,
  },
  middle: {
    width: deviceWidth * 0.9,
    flex: 0.7,
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
    flex: 1.8,
    justifyContent: 'flex-end',
  },
  webView: {
    height: 0,
  },
  partTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBig: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textSmall: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  partThree: {
    flex: 1,
    justifyContent: 'center',
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
    flex: 0.2,
  },
});
