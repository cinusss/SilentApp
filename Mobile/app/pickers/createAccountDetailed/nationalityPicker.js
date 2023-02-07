import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {globalStyles} from '../../styles/global';

export default function NationalityPicker({props}) {
  const [nationality, setNationality] = useState('Narodowość');

  let index = 0;
  const data = [
    {
      key: index++,
      section: true,
      component: (
        <Text style={globalStyles.headerPicker}>
          Wybierz narodowość odbiorców profilu
        </Text>
      ),
    },
    {
      key: index++,
      label: 'Polska',
      component: <Text style={globalStyles.textPicker}>Polska</Text>,
    },
    {
      key: index++,
      label: 'Inna',
      component: <Text style={globalStyles.textPicker}>Inna</Text>,
    },
  ];

  return (
    <View style={globalStyles.modalPicker}>
      <ModalSelector
        data={data}
        initValue={nationality}
        initValueTextStyle={globalStyles.initValueTextStyle}
        selectStyle={globalStyles.selectStyle}
        selectTextStyle={globalStyles.selectTextStyle}
        cancelText="Anuluj"
        onChange={option => {
          props.setFieldValue('nationality', option.label);
          setNationality(option.label);
        }}
      />
    </View>
  );
}
