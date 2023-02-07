import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string('Nazwa użytkownika jest wymagana')
    .required('Nazwa użytkownika jest wymagana'),
  password: yup
    .string('Hasło jest wymagane')
    .required('Hasło jest wymagane')
    .test('is-choosed', 'Hasło jest wymagane', val => {
      return parseInt(val, 10) !== 0;
    }),
});

export const forgottenSchema = yup.object({
  email: yup
    .string('Proszę o podanie adresu e-mail')
    .required('Proszę o podanie adresu e-mail')
    .email('Nieporawny format e-mail'),
});

export const createAccountSchema = yup.object({
  username: yup
    .string('Proszę o podanie nazwy użytkownika')
    .required('Proszę o podanie nazwy użytkownika')
    .min(4, 'Nazwa użytkownika musi składać się co najmniej z 4 znaków')
    .max(28, 'Nazwa użytkownika nie może przekraczać 28 znaków'),
  email: yup
    .string('Proszę o podanie adresu e-mail')
    .required('Proszę o podanie adresu e-mail')
    .email('Nieporawny format e-mail'),
  password: yup
    .string('Proszę o podanie hasła')
    .required('Proszę o podanie hasła')
    .min(6, 'Hasło powinno składać się z min. 6 znaków')
    .max(40, 'Hasło powinno składać się z max. 40 znaków')
    .test(
      'passwordCheck',
      'Hasło powinno składać się z co najmniej jednej dużej litery oraz jednej cyfry',
      function(value) {
        //TODO akceptacja tylko basicowych znaków
        if (/\d/.test(value)) {
          if (/[A-Z]/.test(value)) {
            return true;
          }
        }
        return false;
      },
    ),
  repeatpassword: yup
    .string('Potwierdź wprowadzone hasło')
    .required('Potwierdź wprowadzone hasło')
    .oneOf([yup.ref('password'), null], 'Hasła powinny być takie same'),
});

export const createAccountDetailedSchema = yup.object({
  instagramName: yup
    .string('Proszę o podanie nazwy użytkownika')
    .required('Proszę o podanie nazwy użytkownika')
    .max(30, 'Nazwa użytkownika nie może przekraczać 30 znaków'),
  nationality: yup
    .string('Proszę o wybranie narodowości')
    .required('Proszę o wybranie narodowości')
    .test('is-choosed', 'Proszę o wybranie narodowości', val => {
      return parseInt(val, 10) !== 0;
    }),
  gender: yup
    .string('Proszę o wybranie płci')
    .required('Proszę o wybranie płci')
    .test('is-choosed', 'Proszę o wybranie płci', val => {
      return parseInt(val, 10) !== 0;
    }),
  birthYear: yup
    .string('Proszę o wybranie roku urodzenia')
    .required('Proszę o wybranie roku urodzenia')
    .test('is-choosed', 'Proszę o wybranie roku urodzenia', val => {
      return parseInt(val, 10) !== 0;
    }),
});

export const deleteShema = yup.object({
  password: yup
    .string('Proszę o podanie nazwy użytkownika')
    .required('Proszę o podanie nazwy użytkownika')
    .min(6, 'Hasło nie jest poprawne')
    .max(40, 'Hasło nie jest poprawne')
    .test('passwordCheck', 'Hasło nie jest poprawne', function(value) {
      //TODO akceptacja tylko basicowych znaków
      if (/\d/.test(value)) {
        if (/[A-Z]/.test(value)) {
          return true;
        }
      }
      return false;
    }),
});

export const changePasswordShema = yup.object({
  oldPassword: yup
    .string('Proszę o podanie starego hasła')
    .required('Proszę o podanie starego hasła'),
  newPassword: yup
    .string('Proszę o podanie nowego hasła')
    .required('Proszę o podanie nowego hasła')
    .min(6, 'Hasło powinno składać się z min. 6 znaków')
    .max(40, 'Hasło powinno składać się z max. 40 znaków')
    .test(
      'passwordCheck',
      'Hasło powinno składać się z co najmniej jednej dużej litery oraz jednej cyfry',
      function(value) {
        //TODO akceptacja tylko basicowych znaków
        if (/\d/.test(value)) {
          if (/[A-Z]/.test(value)) {
            return true;
          }
        }
        return false;
      },
    ),
  newPasswordRepeat: yup
    .string('Potwierdź wprowadzone hasło')
    .required('Potwierdź wprowadzone hasło')
    .min(6, 'Hasło powinno składać się z min. 6 znaków')
    .max(40, 'Hasło powinno składać się z max. 40 znaków')
    .oneOf([yup.ref('newPassword'), null], 'Hasła powinny być takie same'),
});

export const contactSchema = yup.object({
  title: yup
    .string('Proszę o wybranie tematu wiadomości')
    .required('Proszę o wybranie tematu wiadomości'),
  message: yup
    .string('Proszę o sprecyzowanie problemu')
    .required('Proszę o sprecyzowanie problemu')
    .min(10, 'Prosimy o bardziej szczegółowe opisanie problemu')
    .max(
      300,
      'Maksymalna długość wiadomości nie powinna przekroczyć 300 znaków',
    ),
});
