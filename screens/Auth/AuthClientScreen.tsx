import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import SharedStyles from '../../styles/SharedStyles'

import { StorageSet, StorageGet } from '../../core/Storage'
import { AlertError } from '../../components/Alerts'

class AuthClientScreen extends React.Component {
  state = {
    code: ''
  }

  setCode = (code: string) => {
    code = code.replace(/\D/g, '')
    this.setState({code: code})
  }

  checkCode = () => {
    const code = this.state.code

    const verificationData: any = StorageGet('verification')
      .then((response: any) => {
        response = JSON.parse(response)

        if(response.code === code) {
          fetch('http://84.201.137.79:8080/api/v1/register/customer/confirm', {
            method: 'POST',
            body: JSON.stringify(
              {
                phone: `+${response.phone}`,
                code: code
              }
            )
          })
            .then((response) => response.json())
            .then((response) => {
              if(response.success) {
                const userData = {
                  type: 'client',
                  partnerId: response.data.partnerId,
                  token: response.data.token
                }
      
                StorageSet('verification', 'null')
                StorageSet('user', JSON.stringify(userData)) ? this.props.navigation.navigate('UserClientProfileScreen') : false
              }
            })
            .catch((error) => {
              AlertError(error.message)
            })
        } else {
          AlertError('Вы ввели неверный код!' + response.code)
        }
      })
  }
  
  render() {
    const { code } = this.state

    return(
      <View style={SharedStyles.container}>
        <View>
          <Text style={SharedStyles.description}>
            {`На ваш номер телефона было отправленно СМС с кодом подтверждения\nВведите этот код`}
          </Text>

          <TextInput
            style={SharedStyles.input}
            placeholder="Введите код из СМС"
            keyboardType="phone-pad"
            value={code}
            maxLength={4}
            onChangeText={(code: string) => this.setCode(code)}
          />

          <View style={SharedStyles.button}>
            <Button
              title="Готово"
              onPress={() => this.checkCode()}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default AuthClientScreen