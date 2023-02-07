import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {BackHandler, StatusBar} from 'react-native';
import PublishView from './app/views/Authorized/PublishView';
import ActionView from './app/views/Authorized/ActionView';
import SettingsView from './app/views/Authorized/SettingsView';
import ContactView from './app/views/Authorized/ContactView';
import NavigatorView from './app/views/Unauthorized/NavigatorView';
import ChooseView from './app/views/Unauthorized/ChooseView';
import CreateAccountView from './app/views/Unauthorized/CreateAccountView';
import LoginView from './app/views/Unauthorized/LoginView';
import ForgottenPasswordView from './app/views/Unauthorized/ForgottenPasswordView';
import CreateAccountDetailedView from './app/views/Unauthorized/CreateAccountDetailedView';
import LogoutView from './app/views/Authorized/LogoutView';
import Header from './app/shared/header';

import {DrawerContent} from './app/shared/DrawerContent';

const Drawer = createDrawerNavigator();

const PreLoadingStack = createStackNavigator();
const PublishStack = createStackNavigator();
const ActionStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const ContactStack = createStackNavigator();
const HomeStack = createStackNavigator();

const PreLoadingStackScreen = ({navigation}) => (
  <PreLoadingStack.Navigator screenOptions={{}}>
    <PreLoadingStack.Screen
      name="NavigatorView"
      component={NavigatorView}
      options={{
        headerShown: false,
      }}
    />
  </PreLoadingStack.Navigator>
);

const PublishStackScreen = ({navigation}) => (
  <PublishStack.Navigator screenOptions={{}}>
    <PublishStack.Screen
      name="PublishView"
      component={PublishView}
      options={{
        headerTitle: () => (
          <Header navigation={navigation} title="Opublikuj post" />
        ),
      }}
    />
  </PublishStack.Navigator>
);

const ActionStackScreen = ({navigation}) => (
  <ActionStack.Navigator screenOptions={{}}>
    <ActionStack.Screen
      name="ActionView"
      component={ActionView}
      options={{
        headerTitle: () => (
          <Header navigation={navigation} title="Wykonaj akcje" />
        ),
      }}
    />
  </ActionStack.Navigator>
);

const SettingsStackScreen = ({navigation}) => (
  <SettingsStack.Navigator screenOptions={{}}>
    <SettingsStack.Screen
      name="SettingsView"
      component={SettingsView}
      options={{
        headerTitle: () => (
          <Header navigation={navigation} title="Ustawienia konta" />
        ),
      }}
    />
  </SettingsStack.Navigator>
);

const ContactStackScreen = ({navigation}) => (
  <ContactStack.Navigator screenOptions={{}}>
    <ContactStack.Screen
      name="ContactView"
      component={ContactView}
      options={{
        headerTitle: () => (
          <Header navigation={navigation} title="Skontaktuj się z nami" />
        ),
      }}
    />
  </ContactStack.Navigator>
);

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{}}>
    <HomeStack.Screen
      name="ChooseRT"
      component={ChooseView}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="LoginRT"
      component={LoginView}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="RegisterRT"
      component={CreateAccountView}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="ForgottenRT"
      component={ForgottenPasswordView}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen
      name="CreateAccountDetailedView"
      component={CreateAccountDetailedView}
      options={{
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);

// const LogoutStackScreen = ({navigation}) => (
//   <ContactStack.Navigator screenOptions={{}}>
//     <ContactStack.Screen
//       name="LogoutView"
//       component={LogoutView}
//       options={{
//         headerShown: false,
//       }}
//     />
//   </ContactStack.Navigator>
// );

function App() {
  const [isInitialRender, setIsInitialRender] = useState(false);

  function initRender() {
    if (!isInitialRender) {
      setTimeout(() => setIsInitialRender(true), 1);
      return true;
    }
    return false;
  }

  BackHandler.addEventListener('hardwareBackPress', function() {
    return true;
  });
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Drawer.Navigator
        // eslint-disable-next-line react-native/no-inline-styles
        drawerStyle={{width: initRender() ? 0 : 260}}
        drawerType={'slide'}
        drawerContent={props => <DrawerContent {...props} />}
        initialRouteName="NavigatorView">
        <Drawer.Screen name="NavigatorView" component={PreLoadingStackScreen} />
        <Drawer.Screen name="PublishView" component={PublishStackScreen} />
        <Drawer.Screen name="ActionView" component={ActionStackScreen} />
        <Drawer.Screen name="SettingsView" component={SettingsStackScreen} />
        <Drawer.Screen name="ContactView" component={ContactStackScreen} />
        <Drawer.Screen
          name="ChooseRT"
          component={HomeStackScreen}
          options={{gestureEnabled: false}}
        />
        <Drawer.Screen
          name="CreateAccountDetailedView"
          component={HomeStackScreen}
          options={{gestureEnabled: false}}
        />
        {/* <Drawer.Screen name="LogoutView" component={LogoutStackScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;
