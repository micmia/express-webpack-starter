import Immutable from 'immutable';
import {
  GET_STORIES,
  GET_STORIES_SUCCESS,
  GET_STORIES_FAILURE,
  EDIT_STORY,
  UPDATE_STORY,
  UPDATE_STORY_SUCCESS,
  UPDATE_STORY_FAILURE,
  CREATE_STORY,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_FAILURE,
  DELETE_STORY,
  DELETE_STORY_SUCCESS,
  DELETE_STORY_FAILURE
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

export function editStory(id) {
  return {
    type: EDIT_STORY,
    payload: id
  };
}

export function updateStory(story) {
  return (dispatch) => {
    dispatch({type: UPDATE_STORY});

    return fetch(`/api/stories/${story._id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(story)
    })
      .then(res => res.json())
      .then(() => {
        return dispatch({type: UPDATE_STORY_SUCCESS});
      })
      .catch((err) => {
        console.log(err);
        return dispatch({type: UPDATE_STORY_FAILURE});
      });
  }
}

export function createStory(story) {
  return (dispatch) => {
    dispatch({type: CREATE_STORY});

    return fetch(`/api/stories`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(story)
    })
      .then(res => res.json())
      .then(() => {
        return dispatch({type: CREATE_STORY_SUCCESS});
      })
      .catch((err) => {
        console.log(err);
        return dispatch({type: CREATE_STORY_FAILURE});
      });
  }
}

export function deleteStory(id) {
  return (dispatch) => {
    dispatch({type: DELETE_STORY});

    return fetch(`/api/stories/${id}`, {method: 'DELETE'})
      .then(res => res.json())
      .then(() => {
        return dispatch({type: DELETE_STORY_SUCCESS});
      })
      .catch((err) => {
        console.log(err);
        return dispatch({type: DELETE_STORY_FAILURE});
      });
  }
}