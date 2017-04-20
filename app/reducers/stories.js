import Immutable from 'immutable';
import {
  GET_STORIES_SUCCESS,
  GET_STORIES_FAILURE
} from '../constants/stories';

const initialState = Immutable.fromJS({
  items: [],
  itemToEdit: -1,
  count: 0
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORIES_SUCCESS:
      return state.merge({
        items: action.payload,
        count: action.payload.length
      });

    case GET_STORIES_FAILURE: {
      return state.clear();
    }

    default:
      return state;
  }
}