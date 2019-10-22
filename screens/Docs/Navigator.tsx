import { createSwitchNavigator } from 'react-navigation'

import Doc1Screen from './Doc1'
import Doc2Screen from './Doc2'
import Doc3Screen from './Doc3'

const DocsNavigator = createSwitchNavigator({
  Doc1Screen: {
    screen: Doc1Screen
  },

  Doc2Screen: {
    screen: Doc2Screen
  },

  Doc3Screen: {
    screen: Doc3Screen
  }
})

export { DocsNavigator }