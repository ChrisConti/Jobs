import { AsyncStorage } from 'react-native';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';
import { Facebook } from 'expo';

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if(token){
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

doFacebookLogin = async (dispatch) => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('246914739426093', {
    permissions: ['public_profile']
  });
  if(type === 'cancel'){
    dispatch({ type: FACEBOOK_LOGIN_FAIL });
  } else {
    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  }
}
