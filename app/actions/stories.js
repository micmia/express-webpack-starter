import Immutable from 'immutable';
import {
  GET_STORIES,
  GET_STORIES_SUCCESS,
  GET_STORIES_FAILURE
} from '../constants/stories';

export function getStories() {
  return (dispatch) => {
    dispatch({type: GET_STORIES});

    fetch('/api/stories')
      .then(res => res.json())
      .then(data => {
        dispatch({type: GET_STORIES_SUCCESS, payload: Immutable.fromJS(data)});
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: GET_STORIES_FAILURE});
      });
  }
};
