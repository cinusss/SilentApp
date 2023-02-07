import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {globalStyles} from '../../styles/global';

export default function BirthYearPicker({props}) {
  const [birthYear, setBirthYear] = useState('Rok urodzenia');
  const data = [
    {
      key: 0,
      section: true,
      component: (
        <Text style={globalStyles.headerPicker}>
          Wybierz rok swojego urodzenia
        </Text>
      ),
    },
  ];

  for (let i = 1970; i < 2008; i++) {
    data.push({
      key: i,
      label: i,
      component: <Text style={globalStyles.textPicker}>{i}</Text>,
    });
  }

  return (
    <View style={globalStyles.modalPicker}>
      <ModalSelector
        data={data}
        initValue={birthYear}
        initValueTextStyle={globalStyles.initValueTextStyle}
        selectStyle={globalStyles.selectStyle}
        selectTextStyle={globalStyles.selectTextStyle}
        cancelText="Anuluj"
        onChange={option => {
          props.setFieldValue('birthYear', option.label.toString());
          setBirthYear(option.label.toString());
        }}
      />
    </View>
  );
}
