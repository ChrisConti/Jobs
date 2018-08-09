import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKE_JOBS
} from './types';

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?';//'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript' //query has to b make here in case of a user input
}

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  console.log(`${JOB_ROOT_URL}${JOB_QUERY_PARAMS}`)
  return `${JOB_ROOT_URL}${JOB_QUERY_PARAMS}`;
}

export const fetchjobs = (region, callback) =>  async dispatch => {
    try {
      let zip = await reverseGeocode(region); //get the zip code with lat and long
      const url = buildJobsUrl(zip);
      let { data } = await axios.get(url);
      dispatch({ type: FETCH_JOBS, payload: data });
      console.log(data);
      callback();
    } catch (err) {
      console.error(err);
    }
};

export const likeJob = job => {
  return {
    type: LIKE_JOB,
    payload: job
  };
};

export const clearLikeJobs = () => {
  return { type: CLEAR_LIKE_JOBS };
};
