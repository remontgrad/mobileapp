import React from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'

import SharedStyles from '../../styles/SharedStyles'

import { AlertError } from '../../components/Alerts'
import { StorageSet } from '../../core/Storage'

const styles = StyleSheet.create({
  partnersTitle: {
    fontSize: 22,
    textAlign: 'center'
  },

  parentDescription: {
    marginTop: 32,

    fontSize: 18,
    textAlign: 'center'
  },

  parentDescriptionBold: {
    fontWeight: 'bold'
  }
})

class AuthPartnerScreen extends React.Component {
  state = {
    code: ''
  }

  setCode = (code: string) => {
    code = code.replace(/\D/g, '')
    this.setState({code: code})
  }

  checkCode = () => {
    const code = this.state.code
    
    fetch('http://84.201.137.79:8080/api/v1/auth/partner', {
      method: 'POST',
      body: JSON.stringify(
        {
          uniqueCode: code
        }
      )
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.success) {
          const userData = {
            type: 'partner',
            partnerId: response.data.partnerId,
            token: response.data.token
          }

          StorageSet('user', JSON.stringify(userData)) ? this.props.navigation.navigate('UserPartnerProfileScreen') : false
        } else {
          AlertError('Вы ошиблись при вводе специального кода партнера')
        }
      })
      .catch((error) => {
        AlertError(error.message)
      })
  }

  render() {
    const { code } = this.state

    return(
      <View style={SharedStyles.container}>
        <View>
          <Text style={styles.partnersTitle}>
            Кто такой партнер?
          </Text>

          <Text style={styles.parentDescription}>
            <Text style={styles.parentDescriptionBold}>
              Партнёр
            </Text>
            {` – это компания, предоставляющая товары или услуги в сфере строительства, отделки и декора`}
          </Text>

          <TextInput
            style={SharedStyles.input}
            placeholder="Специальный код партнера"
            keyboardType="phone-pad"
            value={code}
            onChangeText={(code: string) => this.setCode(code)}
          />

          <View style={SharedStyles.button}>
            <Button
              title="Войти"
              onPress={() => this.checkCode()}
              />
          </View>
        </View>
      </View>
    )
  }
}

export default AuthPartnerScreen