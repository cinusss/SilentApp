import {Alert} from 'react-native';
export function handleBackendError() {
  console.log('Ups.. wystąpił nieoczekiwany bląd: ');
}

export function showAlert() {
  return Alert.alert(
    'Problem z połączeniem.',
    'Upewnij się, że posiadasz dostęp Internetu i spróbuj ponownie.',
  );
}

export function showAlertBug() {
  return Alert.alert(
    'Problem z połączeniem.',
    'Pracujemy nad rozwiązaniem problemu. W przypadku, gdy problem pojawi się ponownie skontaktuj się z nami.',
  );
}

export function showAlertGeneric(title, copy) {
  return Alert.alert(title, copy);
}
