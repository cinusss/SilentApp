import React, {useEffect} from 'react';
import PreLoadingComponent from '../../components/preLoadingComponent';
import AsyncStorage from '@react-native-community/async-storage';

export default function NavigatorView({navigation}) {
  useEffect(
    function effectFunction() {
      async function fetchData() {
        try {
          const isLogged = await AsyncStorage.getItem('isLogged');
          const editedProfile = await AsyncStorage.getItem('editedProfile');
          if (isLogged === '1') {
            if (editedProfile === '1') {
              navigation.reset({
                index: 0,
                routes: [{name: 'PublishView'}],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{name: 'CreateAccountDetailedView'}],
              });
            }
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'ChooseRT'}],
            });
          }
        } catch (error) {}
      }
      fetchData();
    },
    [navigation],
  );

  return <PreLoadingComponent />;
}
