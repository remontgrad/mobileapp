import React from 'react'
import { View, Text } from 'react-native'

import SharedStyles from '../../styles/SharedStyles'

class Doc1Screen extends React.Component {
  render() {
    return(
      <View style={SharedStyles.container}>
        <Text>
          Политика обработки персональных данных
        </Text>
      </View>
    )
  }
}

export default Doc1Screen