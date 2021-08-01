import { get } from "../utils/apiClient";
import { GET_TEST_DATA, GET_TEST_DATA_SUCCESS, GET_TEST_DATA_ERROR } from "./types";

export const getTestData = (pageNum) => {
  return async (dispatch) => {
    dispatch({ type: GET_TEST_DATA });
    try {
      const res = await get(`/api/v1/search?page=${pageNum}`);
      dispatch({ type: GET_TEST_DATA_SUCCESS, data: res, key: pageNum });
    } catch(e) {
      dispatch({ type: GET_TEST_DATA_ERROR });
    }
  }
};
