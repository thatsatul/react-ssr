import {
  GET_TEST_DATA, GET_TEST_DATA_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  data: null,
  isFetching: false,
  isError: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TEST_DATA: {
      return { ...state, isFetching: true };
    }

    case GET_TEST_DATA_SUCCESS: {
      const { data } = action;
      return { ...state, isFetching: false, data };
    }

    default:
      return state;
  }
};
