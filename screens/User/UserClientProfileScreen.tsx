import React from 'react'
import { StyleSheet, View, Image, Text, Button } from 'react-native'

import SharedStyles from '../../styles/SharedStyles'
import { StorageSet } from '../../core/Storage'

const styles = StyleSheet.create({
  QRcode: {
    height: 300,
    width: 300,
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  description: {
    fontSize: 18,
    textAlign: 'center'
  },

  bottomNavItem: {
    marginTop: 64,

    textAlign: 'center'
  }
})

class UserClientProfileScreen extends React.Component {
  render() {
    return(
      <View style={SharedStyles.container}>
        <View>
          <Image
            style={styles.QRcode}
            source={require('../../assets/images/frame.png')}
          />

          <Text style={styles.description}>
            Для получения скидки — покажите продавцу
          </Text>

          <Text style={styles.bottomNavItem}>
            Посмотреть всех партнеров (?)
          </Text>
        </View>

        <View>
          <Button
            title="Выход"
            onPress={() => StorageSet('user', JSON.stringify({type: 'ghost'})) ? this.props.navigation.navigate('HomeScreen') : false}
          />
        </View>
      </View>
    )
  }
}

export default UserClientProfileScreen