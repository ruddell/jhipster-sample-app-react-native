import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  jobHistoryRequest: ['jobHistoryId'],
  jobHistoryAllRequest: ['options'],
  jobHistoryUpdateRequest: ['jobHistory'],
  jobHistoryDeleteRequest: ['jobHistoryId'],

  jobHistorySuccess: ['jobHistory'],
  jobHistoryAllSuccess: ['jobHistoryList', 'headers'],
  jobHistoryUpdateSuccess: ['jobHistory'],
  jobHistoryDeleteSuccess: [],

  jobHistoryFailure: ['error'],
  jobHistoryAllFailure: ['error'],
  jobHistoryUpdateFailure: ['error'],
  jobHistoryDeleteFailure: ['error'],

  jobHistoryReset: [],
});

export const JobHistoryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  jobHistory: { id: undefined },
  jobHistoryList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    jobHistory: INITIAL_STATE.jobHistory,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { jobHistory } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    jobHistory,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { jobHistoryList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    jobHistoryList: loadMoreDataWhenScrolled(state.jobHistoryList, jobHistoryList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { jobHistory } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    jobHistory,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    jobHistory: INITIAL_STATE.jobHistory,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    jobHistory: INITIAL_STATE.jobHistory,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    jobHistoryList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    jobHistory: state.jobHistory,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    jobHistory: state.jobHistory,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.JOB_HISTORY_REQUEST]: request,
  [Types.JOB_HISTORY_ALL_REQUEST]: allRequest,
  [Types.JOB_HISTORY_UPDATE_REQUEST]: updateRequest,
  [Types.JOB_HISTORY_DELETE_REQUEST]: deleteRequest,

  [Types.JOB_HISTORY_SUCCESS]: success,
  [Types.JOB_HISTORY_ALL_SUCCESS]: allSuccess,
  [Types.JOB_HISTORY_UPDATE_SUCCESS]: updateSuccess,
  [Types.JOB_HISTORY_DELETE_SUCCESS]: deleteSuccess,

  [Types.JOB_HISTORY_FAILURE]: failure,
  [Types.JOB_HISTORY_ALL_FAILURE]: allFailure,
  [Types.JOB_HISTORY_UPDATE_FAILURE]: updateFailure,
  [Types.JOB_HISTORY_DELETE_FAILURE]: deleteFailure,
  [Types.JOB_HISTORY_RESET]: reset,
});
