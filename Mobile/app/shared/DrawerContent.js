import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import LogoutModal from '../modals/logoutModal';

export function DrawerContent(props) {
  const [initialRender, setInitialRender] = useState(true);
  const [modalLogoutOpen, setModalLogoutOpen] = useState(false);
  if (initialRender) {
    setInitialRender(false);
  }

  // const [numberOfLikes, setNumberOfLikes] = useState(0);
  // const [numberOfAction, setNumberOfAction] = useState(0);

  // useEffect(function effectFunctionMenu(){
  //     async function fetchDataMenu() {
  //         const numberOfLikes = await AsyncStorage.getItem('numberOfLikes');
  //         if(numberOfLikes){
  //             setNumberOfLikes(await AsyncStorage.getItem('numberOfLikes'));
  //             setNumberOfAction(await AsyncStorage.getItem('numberofActions'));
  //         }else{
  //             const result = await asyncEmptyLoggedGet(getActionsInfo);
  //             const list = await result.actionDatas;
  //             await AsyncStorage.setItem('numberofActions', list[0].actionsNumber.toString());
  //             await AsyncStorage.setItem('numberOfLikes', result.numberOfLikes.toString());
  //             setNumberOfLikes(await AsyncStorage.getItem('numberOfLikes'));
  //             setNumberOfAction(await AsyncStorage.getItem('numberofActions'));
  //         }
  //     }
  //     fetchDataMenu();
  // }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View styles={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={require('../images/small_icons/drawer/logo_rounded_icon.png')}
                size={48}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>SilentApp</Title>
                <Caption style={styles.caption}>
                  Boost your profile now!
                </Caption>
              </View>
            </View>

            {/* <View style={styles.row}>
                            <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>{numberOfLikes}</Paragraph>
                                <Caption style={styles.caption}>Zdobyte ♥</Caption>
                            </View>
                            <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>{numberOfAction}</Paragraph>
                                <Caption style={styles.caption}>Do wykonania</Caption>
                            </View>
                        </View> */}
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../images/small_icons/drawer/Publish_black.png')}
                />
              )}
              label="Opublikuj post"
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'PublishView'}],
                });
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../images/small_icons/drawer/Action_black.png')}
                />
              )}
              label="Wykonaj akcje"
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'ActionView'}],
                });
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../images/small_icons/drawer/Settings_black.png')}
                />
              )}
              label="Ustawienia konta"
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'SettingsView'}],
                });
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../images/small_icons/drawer/Envelope_black.png')}
                />
              )}
              label="Kontakt"
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'ContactView'}],
                });
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <Image
              style={{width: 25, height: 25}}
              source={require('../images/small_icons/drawer/Logout_black.png')}
            />
          )}
          label="Wyloguj"
          onPress={() => {
            setModalLogoutOpen(true);
          }}
        />
      </Drawer.Section>
      {modalLogoutOpen && (
        <LogoutModal
          navigation={props.navigation}
          modalLogoutOpen={modalLogoutOpen}
          setModalLogoutOpen={setModalLogoutOpen}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    paddingLeft: 2,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderTopWidth: 0.5,
    borderStyle: 'dashed',
    borderTopColor: '#4eb8ce',
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
