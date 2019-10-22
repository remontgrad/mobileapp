import { createSwitchNavigator } from 'react-navigation'

import AuthClientScreen from './AuthClientScreen'
const AuthClientNavigator = createSwitchNavigator({
  AuthClientScreen: {
    screen: AuthClientScreen
  }
})

import AuthPartnerScreen from './AuthPartnerScreen'
const AuthPartnerNavigator = createSwitchNavigator({
  AuthPartnerScreen: {
    screen: AuthPartnerScreen
  }
})

export { AuthClientNavigator, AuthPartnerNavigator }