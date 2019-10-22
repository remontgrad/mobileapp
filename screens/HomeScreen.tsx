import React from 'react'
import { StyleSheet, View, Image, Text, TextInput, Button } from 'react-native'
import Dialog from 'react-native-dialog';

import SharedStyles from '../styles/SharedStyles'
import { AlertError, AlertSuccess } from '../components/Alerts'
import { StorageSet } from '../core/Storage'

const styles = StyleSheet.create({
  container: {
    paddingTop: 64
  },

  inputSupport: {
    textAlign: 'left'
  },

  logo: {
    height: 300,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  
  partnerLink: {
    marginTop: 12,

    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000'
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

class HomeScreen extends React.Component {
  state = {
    phoneNumber: '79994650895',
    supportModal: false,
    supportMessage: ''
  }

  setPhone = (phone: string) => {
    phone = phone.replace(/\D/g, '')
    this.setState({phoneNumber: phone})
  }

  checkPhone = () => {
    const phone = this.state.phoneNumber 
    if(phone.length < 9 || phone.length > 11) {
      AlertError('Вы ошиблись при вводе номера телефона!')
    } else {
      fetch('http://84.201.137.79:8080/api/v1/register/customer', {
        method: 'POST',
        body: JSON.stringify(
          {
            phone: `+${phone}`
          }
        )
      })
      .then((response) => response.json())
      .then((response) => {
        if(response.success) {
          const verificationData = {
            phone: phone,
            code: response.data.code
          }

          if(response.data.registed) {
            StorageSet('verification', JSON.stringify(verificationData)) ? this.props.navigation.navigate('AuthClientScreen', {title: 'Авторизация'}) : false
          } else {
            StorageSet('verification', JSON.stringify(verificationData)) ? this.props.navigation.navigate('AuthClientScreen', {title: 'Регистрация'}) : false
          }
        } else {
          AlertError('Вы ошиблись при вводе номера телефона')
        }
      })
      .catch((error) => {
        AlertError(error.message)
      })
    }
  }

  supportSend() {
    this.setState({supportModal: false})

    fetch('http://84.201.137.79:8080/api/v1/partner/support', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          message: this.state.supportMessage
        }
      )
    })
    .then((response) => response.json())
    .then((response) => {
      AlertSuccess(response.success)

        // if(response.data.registed) {
        //   StorageSet('verification', JSON.stringify(verificationData)) ? this.props.navigation.navigate('AuthClientScreen', {title: 'Авторизация'}) : false
        // } else {
        //   StorageSet('verification', JSON.stringify(verificationData)) ? this.props.navigation.navigate('AuthClientScreen', {title: 'Регистрация'}) : false
        // }
      // } else {
      //   AlertError('Вы ошиблись при вводе номера телефона')
      // }
    })
    .catch((error) => {
      AlertError(error.message)
    })

    AlertSuccess('Отправлено') 
  }
  
  render() {
    const { navigate } = this.props.navigation
    const { phoneNumber, supportModal, supportMessage } = this.state


    return(
      <View style={[SharedStyles.container, styles.container]}>
        <Dialog.Container visible={supportModal}>
          <Dialog.Title>
            Техническая поддержка
          </Dialog.Title>

          <Dialog.Description>
            Напишите ваше обращение в техническую поддержку
          </Dialog.Description>

          <Dialog.Input
            style={[SharedStyles.input, styles.inputSupport]}
            value={supportMessage}
            placeholder="Обращение"
            onChangeText={(message: string) => this.setState({supportMessage: message})}
          />
          
          <Dialog.Button
            label="Выход"
            onPress={() => this.setState({supportModal: false})}
          />
          <Dialog.Button
            label="Готово"
            onPress={() => this.supportSend()}
          />
        </Dialog.Container>
        
        <View>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo-rg-p-500.png')}
          />
          
          <Text style={SharedStyles.description}>
            Для авторизации или регистрации введите номер телефона
          </Text>

          <TextInput
            style={SharedStyles.input}
            placeholder="Введите номер телефона"
            autoCompleteType="tel"
            keyboardType="phone-pad"
            value={phoneNumber}
            maxLength={12}
            textContentType="telephoneNumber"
            onChangeText={(phone: string) => this.setPhone(phone)}
          />

          <View style={SharedStyles.button}>
            <Button
              title="Продолжить"
              onPress={() => this.checkPhone()}
            />
          </View>

          <Text
            style={styles.partnerLink}
            onPress={() => navigate('AuthPartnerScreen')}
          >Войти как партнер</Text>
        </View>

        <View>
          <View style={styles.bottomNav}>
            <Text
              style={styles.bottomNavItem}
              onPress={() => this.setState({supportModal: true})}
            >
              Обратная связь
            </Text>

            <Text
              style={styles.bottomNavItem}
              onPress={() => navigate('Doc1Screen', {title: 'Политика обработки персональных данных'})}
            >
              Политика обработки персональных данных
            </Text>

            <Text
              style={styles.bottomNavItem}
              onPress={() => navigate('Doc2Screen', {title: 'Публичная оферта'})}
            >
              Публичная оферта
            </Text>
            
            <Text
              style={styles.bottomNavItem}
              onPress={() => navigate('Doc3Screen', {title: 'Правила участия в программе'})}
            >
              Правила участия в программе
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default HomeScreen