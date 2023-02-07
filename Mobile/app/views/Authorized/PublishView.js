import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import CookieManager from '@react-native-community/cookies';
import {WebView} from 'react-native-webview';
import PublishedModal from '../../modals/publishedModal';
import PublishedSuccessModal from '../../modals/publishedSuccessModal';
import PublishFailureModal from '../../modals/publishFailureModal';
import {
  asyncEmptyLoggedPost,
  asyncRefreshToken,
} from '../../services/repository';
import {addLink} from '../../consts/constans';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingComponent from '../../components/loadingComponent';
import {showAlert, showAlertGeneric} from '../../services/errorHandler';
import NetInfo from '@react-native-community/netinfo';
import {clearAllData} from '../../services/extensions';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function PublishView({navigation}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPublishedOpen, setModalPublishedOpen] = useState(false);
  const [modalFailureOpen, setModalFailureOpen] = useState(false);
  const [accountName, setAccountName] = useState('.....*****');
  const [isLoading, setIsLoading] = useState(false);
  const [instagramUrl, setInstagramUrl] = useState('');
  const [previousUrl, setPreviousUrl] = useState('');
  const [lastWebViewUrl, setLastWebViewUrl] = useState('');
  const [webViewLogged, setWebViewLogged] = useState(false);

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
      setAccountName(
        (await AsyncStorage.getItem('instagramName')).toLowerCase(),
      );
      const lastUrl = await AsyncStorage.getItem('lastWebViewUrl');
      setLastWebViewUrl(lastUrl != null ? lastUrl : '');
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function onNavigationStateChange(webViewState) {
    if (instagramUrl !== webViewState.url) {
      setPreviousUrl(instagramUrl);
      setInstagramUrl(webViewState.url);
      AsyncStorage.setItem('lastWebViewUrl', webViewState.url);
    }
  }
  //To nam przecież wystarczy do sprawdzenia czy ktoś jest zalogowany
  function checkIsWebViewLogged() {
    CookieManager.get('https://instagram.com', false).then(cookie => {
      if (cookie.sessionid != null) {
        setWebViewLogged(true);
      } else {
        setWebViewLogged(false);
      }
    });
  }

  function buttonActive() {
    if (
      instagramUrl.includes('https://www.instagram.com/p/') &&
      previousUrl.toLowerCase() ===
        'https://www.instagram.com/' + accountName + '/'
    ) {
      return true;
    } else {
      return false;
    }
  }

  function webViewUrl() {
    if (lastWebViewUrl.includes('https://www.instagram.com/p/')) {
      return 'https://www.instagram.com/' + accountName + '/';
    }
    return lastWebViewUrl.includes('instagram.com')
      ? lastWebViewUrl
      : 'https://www.instagram.com/';
  }

  async function handleAdd(url) {
    setIndicatiorLoading(true);
    if (previousUrl === 'https://www.instagram.com/') {
      showAlertGeneric(
        'Wskazówka',
        'Przejdź na główny widok profilu na Instagram, a następnie wybierz ponownie zdjęcie do opublikowania.',
      );
      setIndicatiorLoading(false);
    } else {
      if (
        previousUrl.toLowerCase() ===
        'https://www.instagram.com/' + accountName + '/'
      ) {
        if (url.includes('https://www.instagram.com/p/')) {
          const shortUrl = url.substring(26);
          await addLinkAsync(shortUrl);
        } else {
          showAlertGeneric(
            'Niepoprawny link',
            'Wybrany post nie należy do Twojego konta.',
          );
          setIndicatiorLoading(false);
        }
      } else {
        showAlertGeneric(
          'Niepoprawny link',
          'Wybrany post nie należy do Twojego konta.',
        );
        setIndicatiorLoading(false);
      }
    }
  }

  async function addLinkAsync(shortUrl) {
    let result = JSON.parse(
      await asyncEmptyLoggedPost(
        JSON.stringify({
          link: shortUrl,
          groupId: 1, //TODO do zmiany bardzo poxno
        }),
        addLink,
        navigation,
      ),
    );
    if (result != null) {
      if (result.status) {
        if (result.data.statusCode === 100) {
          setModalOpen(true);
          setIndicatiorLoading(false);
        } else {
          setModalPublishedOpen(true);
          setIndicatiorLoading(false);
        }
      } else {
        setModalFailureOpen(true);
        setIndicatiorLoading(false);
      }
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
          addLink(shortUrl);
        }
      }
    }
  }

  if (!isLoading) {
    return (
      <ImageBackground
        source={require('../../images/register_details/BackgroundInside_SilentApp.png')}
        style={styles.container}>
        <PublishedModal
          navigation={navigation}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        <PublishedSuccessModal
          modalPublishedOpen={modalPublishedOpen}
          setModalPublishedOpen={setModalPublishedOpen}
        />
        <PublishFailureModal
          navigation={navigation}
          modalFailureOpen={modalFailureOpen}
          setModalFailureOpen={setModalFailureOpen}
        />
        <View style={styles.top}>
          {checkIsWebViewLogged()}
          {webViewLogged &&
            instagramUrl.toLowerCase() !==
              'https://www.instagram.com/' + accountName + '/' &&
            !instagramUrl.includes('https://www.instagram.com/p/') && (
              <View style={styles.parentCenter}>
                <Text style={styles.textWhiteBigger}>
                  Przejdź na swój profil!
                </Text>
                <Text style={styles.textWhiteSmaller}>
                  Następnie wybierz post do opublikowania.
                </Text>
              </View>
            )}
          {webViewLogged &&
            instagramUrl.toLowerCase() ===
              'https://www.instagram.com/' + accountName + '/' && (
              <View style={styles.parentCenter}>
                <Text style={styles.textWhiteBigger}>Wybierz post</Text>
                <Text style={styles.textWhiteSmaller}>
                  do opublikowania na grupie zaangażowania!
                </Text>
              </View>
            )}
          {webViewLogged &&
            previousUrl.toLowerCase() ===
              'https://www.instagram.com/' + accountName + '/' &&
            instagramUrl.includes('https://www.instagram.com/p/') && (
              <View style={styles.parentCenter}>
                <Text style={styles.textWhiteBigger}>
                  Potwierdź wybrany post!
                </Text>
                <Text style={styles.textWhiteSmaller}>
                  Następnie wykonaj zaległe polubienia.
                </Text>
              </View>
            )}
          {webViewLogged &&
            previousUrl.toLowerCase() !==
              'https://www.instagram.com/' + accountName + '/' &&
            instagramUrl.includes('https://www.instagram.com/p/') && (
              <View style={styles.parentCenter}>
                <Text style={styles.textWhiteBigger}>
                  Przejdź na swój profil!
                </Text>
                <Text style={styles.textWhiteSmaller}>
                  Następnie wybierz post do opublikowania.
                </Text>
              </View>
            )}
          {!webViewLogged && (
            <View style={styles.parentCenter}>
              <Text style={styles.textWhiteBigger}>
                Zaloguj się na Instagram
              </Text>
              <Text style={styles.textWhiteSmaller}>
                i wybierz post do opublikowania na grupie zaangażowania!
              </Text>
            </View>
          )}
        </View>
        <View style={styles.middle}>
          <View style={styles.parentWebView}>
            <WebView
              source={{uri: webViewUrl()}}
              style={styles.webView}
              onNavigationStateChange={onNavigationStateChange.bind(this)}
              onError={() => {
                showAlert();
              }}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          {indicatiorLoading && (
            <ActivityIndicator size="large" color="#4eb8ce" />
          )}

          {!indicatiorLoading && (
            <View style={styles.parentBottomButton}>
              <TouchableOpacity
                style={
                  buttonActive()
                    ? styles.modalButtonActive
                    : styles.modalButtonInActive
                }
                disabled={buttonActive() ? false : true}
                onPress={() => handleAdd(instagramUrl)}>
                <Text style={styles.modalTextButton}>Potwierdź post</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.parentBottomText}>
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
    backgroundColor: 'rgba(19,20,27,0.95)',
  },
  top: {
    flex: 1,
    width: '100%',
  },
  parentCenter: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWhiteBigger: {
    color: '#ffffff',
    fontSize: 19,
    textAlign: 'center',
  },
  textWhiteSmaller: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
  },
  middle: {
    flex: 5,
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
  parentWebView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  webView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  bottom: {
    flex: 1,
    width: '100%',
  },
  parentBottomButton: {
    flex: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalButtonInActive: {
    width: '40%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(211,211,211,0.45)',
    borderColor: 'black',
    borderRadius: 12,
    color: 'white',
  },
  modalButtonActive: {
    width: '40%',
    height: '80%',
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
  parentBottomText: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  textWhite: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
});
