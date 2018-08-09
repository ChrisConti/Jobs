import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { PersistGate } from 'redux-persist/integration/react'

import { Notifications } from 'expo';
import registerForNotifications from './services/push_notifications';
import configStore  from './configStore';
const { store, persistor } = configStore();
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';
import DeckScreen from './screens/DeckScreen';
import { Provider } from 'react-redux'; //access to all the application to reducers

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notifications) => {
      const { data: { text }, origin } = notifications;
      console.log(origin);
      if(origin === 'received' && text) {

        Alert.alert(
          'New Push Notifications',
          text,
          [{ text: 'ok.'}]
        );
      }
    });
  }

  render() {
    //AsyncStorage.removeItem('fb_token');
    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator({
              review: { screen: ReviewScreen},
              settings: { screen: SettingsScreen }
            }),
            navigationOptions: {
              title: 'Lists',
              tabBarIcon: ({tintColor}) => (
                  <Icon
                      name='favorite'
                      size={30}
                      color={tintColor}
                  />
              )
            }
          }
        }, {
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true //createBottomTabNavigator not charge auth at the same time than welcome just when need it
    });


    return (
      <Provider store={store} >
        <View style={styles.container}>
          <PersistGate loading={null} persistor={persistor}>
            <MainNavigator />
          </PersistGate>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
});
