import React from 'react'
import { View, Text } from 'react-native'

import SharedStyles from '../../styles/SharedStyles'

class Doc2Screen extends React.Component {
  render() {
    return(
      <View style={SharedStyles.container}>
        <Text>
          Публичная оферта
        </Text>
      </View>
    )
  }
}

export default Doc2Screen