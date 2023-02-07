import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {globalStyles} from '../../styles/global';

export default function GenderPicker({props}) {
  const [gender, setGender] = useState('Płeć');

  let index = 0;
  const data = [
    {
      key: index++,
      section: true,
      component: (
        <Text style={globalStyles.headerPicker}>Wybierz swoją płeć</Text>
      ),
    },
    {
      key: index++,
      label: 'Kobieta',
      component: <Text style={globalStyles.textPicker}>Kobieta</Text>,
    },
    {
      key: index++,
      label: 'Mężczyzna',
      component: <Text style={globalStyles.textPicker}>Mężczyzna</Text>,
    },
    {
      key: index++,
      label: 'Inna',
      component: <Text style={globalStyles.textPicker}>Inna</Text>,
    },
  ];
  //TODO ZROBIĆ scroll do 1998
  return (
    <View style={globalStyles.modalPicker}>
      <ModalSelector
        data={data}
        initValue={gender}
        initValueTextStyle={globalStyles.initValueTextStyle}
        selectStyle={globalStyles.selectStyle}
        selectTextStyle={globalStyles.selectTextStyle}
        cancelText="Anuluj"
        onChange={option => {
          props.setFieldValue('gender', option.label);
          setGender(option.label);
        }}
      />
    </View>
  );
}
