import React from 'react'
import { View, Text } from 'react-native'

import { StorageGet } from '../core/Storage'

class SplashScreen extends React.Component {
  render() {
    // setTimeout(
    //   function() {
        StorageGet('user')
          .then((response) => {
            if(response) {
              console.log(response)
              response = JSON.parse(response);
              if(response.type === 'client') {
                this.props.navigation.navigate('UserClientProfileScreen')
              } else if(response.type === 'partner') {
                this.props.navigation.navigate('UserPartnerProfileScreen')
              } else {
                this.props.navigation.navigate('HomeScreen')
              }
            } else {
              this.props.navigation.navigate('HomeScreen')
            }
          })
    //   }.bind(this),

    //   3000
    // )
    
    return(
      <View>
        <Text>Экран прогрузки</Text>
      </View>
    )
  }
}

export default SplashScreen