import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {globalStyles} from '../../styles/global';

export default function MessageSubjectPicker({props}) {
  const [title, setTitle] = useState('Wybierz temat wiadomości 👈');
  let index = 0;
  const data = [
    {
      key: index++,
      section: true,
      label: 'Wybierz temat wiadomości:',
      component: (
        <Text style={globalStyles.headerPicker}>
          Wybierz temat wiadomości 👇
        </Text>
      ),
    },
    {
      key: index++,
      label: 'Problem z dodawaniem linków',
      component: (
        <Text style={globalStyles.textPicker}>Problem z dodawaniem linków</Text>
      ),
    },
    {
      key: index++,
      label: 'Problem z wykonywaniem polubień',
      component: (
        <Text style={globalStyles.textPicker}>
          Problem z wykonywaniem polubień
        </Text>
      ),
    },
    {
      key: index++,
      label: 'Inny problem z działaniem aplikacji',
      component: (
        <Text style={globalStyles.textPicker}>
          Inny problem z działaniem aplikacji
        </Text>
      ),
    },
    {
      key: index++,
      label: 'Pytanie indywidualne',
      component: (
        <Text style={globalStyles.textPicker}>Pytanie indywidualne</Text>
      ),
    },
  ];

  return (
    <View style={globalStyles.modalPicker}>
      <ModalSelector
        data={data}
        initValue={title}
        initValueTextStyle={styles.initValueTextStyle}
        selectStyle={styles.selectStyle}
        selectTextStyle={styles.selectTextStyle}
        style={styles.style}
        cancelText="Anuluj"
        onChange={option => {
          props.setFieldValue('title', option.label.toString());
          setTitle(option.label);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  initValueTextStyle: {
    color: 'black',
    fontSize: 15,
    fontStyle: 'italic',
  },
  selectStyle: {
    borderColor: 'black',
    backgroundColor: 'rgba(78,184,206,0.81)',
    borderRadius: 7,
    height: 40,
  },
  selectTextStyle: {
    color: 'black',
    fontSize: 15,
  },
  style: {
    marginTop: '7%',
    width: '85%',
    marginHorizontal: '7.5%',
  },
});
