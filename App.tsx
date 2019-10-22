import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

import { DocsNavigator } from './screens/Docs/Navigator';
import { AuthClientNavigator, AuthPartnerNavigator } from './screens/Auth/Navigator';
import { UserNavigator } from './screens/User/Navigator';

const AuthedNavigator = createStackNavigator({
  UserScreen: {
    screen: UserNavigator,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
})

const PagesNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },

  DocsScreen: {
    screen: DocsNavigator,
    navigationOptions:({ navigation }) => {
      return {
        title: navigation.state.routes[navigation.state.index].params.title
      }
    }
  },

  AuthClientScreen: {
    screen: AuthClientNavigator,
    navigationOptions:({ navigation }) => {
      return {
        title: navigation.state.routes[navigation.state.index].params.title
      }
    }
  },

  AuthPartnerScreen: {
    screen: AuthPartnerNavigator
  }
});

const LoadingNavigator = createSwitchNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },

  HomeScreen: {
    screen: PagesNavigator
  },

  UserScreen: {
    screen: AuthedNavigator
  }
});

const App = createAppContainer(LoadingNavigator);

export default App;