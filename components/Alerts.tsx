import { Alert } from 'react-native';

function AlertError(body: string) {
  Alert.alert(
    'Ошибка!',
    body,

    [
      {
        text: 'OK'
      },
    ]
  )
}

function AlertSuccess(body: string) {
  Alert.alert(
    'Успех!',
    body,

    [
      {
        text: 'OK'
      },
    ]
  )
}

export { AlertError, AlertSuccess };