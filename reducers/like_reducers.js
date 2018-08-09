import _ from 'lodash';
//import { REHYDRATE } from 'redux-persist/constants';
import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants';
import {
  LIKE_JOB,
  CLEAR_LIKE_JOBS
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.likedJobs || [];
    case CLEAR_LIKE_JOBS:
      return [];
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ],'id');
    default:
      return state;
  }
}
