import { combineReducers } from 'redux';
import auth_reducers from './auth_reducers';
import job_reducers from './job_reducers';
import like_reducers from './like_reducers';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AsyncStorage } from 'react-native';


export default ({
  auth: auth_reducers,
  jobs: job_reducers,
  likedJobs: like_reducers
});
