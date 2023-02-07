import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default function Header({navigation, title}) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openMenu} style={styles.icon}>
        <Image
          source={require('../images/small_icons/drawer/Menu_black.png')}
          size={28}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 0.5,
  },
  icon: {
    position: 'absolute',
    left: 2,
    width: 28,
    height: 28,
  },
});
