import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  //PICKER
  headerPicker: {
    color: 'rgba(19,20,27,0.85)',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textPicker: {
    color: '#1A77BB',
    textAlign: 'center',
    fontSize: 15,
  },
  modalPicker: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  initValueTextStyle: {
    color: 'black',
    fontSize: 13,
  },
  selectStyle: {
    borderColor: 'black',
    backgroundColor: '#eef4f4',
    borderRadius: 5,
    height: 30,
  },
  selectTextStyle: {
    color: 'black',
    fontSize: 13,
  },
  //POZOSTAŁE
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 12,
    color: 'white',
    marginVertical: 10,
  },
  button: {
    width: '70%',
    borderWidth: 1,
    backgroundColor: '#4eb8ce',
    borderColor: 'black',
    padding: 10,
    borderRadius: 12,
    color: 'white',
    alignSelf: 'center',
  },
  textButton: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: 'crimson',
    fontSize: 12,
  },
  errorBigText: {
    color: '#A52104',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  inputRegister: {
    width: '85%',
    height: '12%',
    textAlign: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    borderRadius: 12,
    color: 'white',
    marginVertical: 10,
  },
  footer: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  genericModalText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: '14%',
    fontSize: 15,
  },
  genericModalTextThin: {
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: '8%',
    fontSize: 15,
  },
  modalTextError: {
    color: 'crimson',
    textAlign: 'center',
  },
});
