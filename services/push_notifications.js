import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';
export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken);
  if (previousToken) {
    return;
  } else {
    // ask if user wants push notificaations
    let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    let retu = await axios.post(PUSH_ENDPOINT, { token: { token } });
    console.log(retu);
    AsyncStorage.setItem('pushtoken', token);
  }
};
