import { AsyncStorage } from 'react-native';

import { AlertError } from '../components/Alerts';

async function StorageSet(key: string, object: any) {
  try {
    await AsyncStorage.setItem(key, object);
      
    return true;
  } catch(error) {
    AlertError(error.message);
  }
}

async function StorageGet(key: string) {
  try {
    return await AsyncStorage.getItem(key)
  } catch(error) {
    AlertError(error.message);
  }
}

export { StorageSet, StorageGet };