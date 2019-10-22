import { StyleSheet } from 'react-native';

const SharedStyles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 32,
    paddingRight: 16,
    paddingBottom: 32,
    paddingLeft: 16,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  description: {
    textAlign: 'center'
  },

  input: {
    height: 32,
    marginTop: 16,
    paddingRight: 16,
    paddingLeft: 16,

    textAlign: 'center',
    
    backgroundColor: 'rgba(0, 0, 0, .05)'
  },

  button: {
    marginTop: 32
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
});

export default SharedStyles;