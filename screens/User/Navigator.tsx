import { createSwitchNavigator } from 'react-navigation'

import UserClientProfileScreen from './UserClientProfileScreen'
import UserPartnerProfileScreen from './UserPartnerProfileScreen'
const UserNavigator = createSwitchNavigator({
  UserClientProfileScreen: {
    screen: UserClientProfileScreen
  },

  UserPartnerProfileScreen: {
    screen: UserPartnerProfileScreen
  }
})

export { UserNavigator }