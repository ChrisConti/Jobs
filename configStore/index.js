import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { AsyncStorage } from 'react-native';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['likedJobs'] // only navigation will be persisted
};

/*const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

export default store;*/

const persistedReducer = persistCombineReducers(persistConfig, reducers);

export default (initialState={}) => {

  let store = createStore(persistedReducer,initialState,applyMiddleware(thunk));
  let persistor = persistStore(store);

  return { store, persistor };
};
