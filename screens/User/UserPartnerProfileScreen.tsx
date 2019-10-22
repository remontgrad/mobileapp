import React from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'

import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

import { BarCodeScanner } from 'expo-barcode-scanner'
import { AlertError, AlertSuccess } from '../../components/Alerts'

import SharedStyles from '../../styles/SharedStyles'
import { StorageSet } from '../../core/Storage'

const styles = StyleSheet.create({
  container: {
    paddingTop: 128
  },

  qrCode: {
    height: 200,
    width: 200,
    marginRight: 'auto',
    marginLeft: 'auto',

    borderRadius: 20,
  },

  qrCodeFake: {
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },

  qrPush: {
    marginTop: 32,
    textAlign: 'center'
  },

  input: {
    width: 200,
    marginRight: 'auto',
    marginLeft: 'auto'
  },

  bottomNav: {
    marginTop: 28,
    marginBottom: -4
  },
  
  bottomNavItem: {
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center'
  }
})

class UserPartnerProfileScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: true,
    code: '1'
  }

  async componentDidMount() {
    this.getPermissionsAsync()
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  handleBarCodeScanned = ({ data }) => {
    this.setState({ scanned: true })
    if(data === 'grad-app') {
      this.checkCode()
    } else {
      AlertError('QR код недействительный')
    }
  }

  setCode = (code: string) => {
    code = code.replace(/\D/g, '')
    this.setState({code: code})
  }

  checkCode = () => {
    const code = this.state.code

    fetch('http://84.201.137.79:8080/api/v1/partner/order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          customerId: code
        }
      )
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log(response)
      if(response.success) {
        AlertSuccess('Покупка зафиксирована')
      } else {
        AlertError('Покупатель не найден')
      }
    })
    .catch((error) => {
      AlertError(error.message)
    })
  }

  render() {
    this.checkCode()
    const { hasCameraPermission, scanned, code } = this.state

    if (hasCameraPermission === null) {
      // return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      AlertError('Нет доступа к камере')
    }
    return (
      <View style={[SharedStyles.container, styles.container]}>
        <View>

          <View>
            {scanned && (
              <View style={[styles.qrCode, styles.qrCodeFake]}></View>
            )}

            {!scanned && (
              <BarCodeScanner
                style={styles.qrCode}
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              />
            )}
          </View>

          <TextInput
            style={[SharedStyles.input, styles.input]}
            placeholder="ID покупателя"
            keyboardType="phone-pad"
            value={code}
            onChangeText={(code: string) => this.setCode(code)}
          />

          <Text
            style={styles.qrPush}
            onPress={() => this.setState({ scanned: false })}
          >
            Считать QR код
          </Text>
        </View>

        <View style={styles.bottomNav}>
          <Text style={styles.bottomNavItem}>
            Техническая поддержка
          </Text>

          <Text
            style={styles.bottomNavItem}
            onPress={() => StorageSet('user', JSON.stringify({type: 'ghost'})) ? this.props.navigation.navigate('HomeScreen') : false}
          >
            Выйти из аккаунта
          </Text>
        </View>
      </View>
    )
  }
}

export default UserPartnerProfileScreen