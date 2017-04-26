import Immutable from 'immutable';
import {
  GET_STORIES_SUCCESS,
  GET_STORIES_FAILURE,
  EDIT_STORY
} from '../constants/stories';

const initialState = Immutable.fromJS({
  items: [],
  itemToEdit: null,
  count: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STORIES_SUCCESS:
      return state.merge({
        items: action.payload,
        count: action.payload.count()
      });

    case GET_STORIES_FAILURE:
      return state.clear();

    case EDIT_STORY:
      return state.set('itemToEdit', action.payload);

    default:
      return state;
  }
}