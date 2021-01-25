import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  jobRequest: ['jobId'],
  jobAllRequest: ['options'],
  jobUpdateRequest: ['job'],
  jobDeleteRequest: ['jobId'],

  jobSuccess: ['job'],
  jobAllSuccess: ['jobList', 'headers'],
  jobUpdateSuccess: ['job'],
  jobDeleteSuccess: [],

  jobFailure: ['error'],
  jobAllFailure: ['error'],
  jobUpdateFailure: ['error'],
  jobDeleteFailure: ['error'],

  jobReset: [],
});

export const JobTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  job: { id: undefined },
  jobList: [],
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
    job: INITIAL_STATE.job,
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
  const { job } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    job,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { jobList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    jobList: loadMoreDataWhenScrolled(state.jobList, jobList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { job } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    job,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    job: INITIAL_STATE.job,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    job: INITIAL_STATE.job,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    jobList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    job: state.job,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    job: state.job,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.JOB_REQUEST]: request,
  [Types.JOB_ALL_REQUEST]: allRequest,
  [Types.JOB_UPDATE_REQUEST]: updateRequest,
  [Types.JOB_DELETE_REQUEST]: deleteRequest,

  [Types.JOB_SUCCESS]: success,
  [Types.JOB_ALL_SUCCESS]: allSuccess,
  [Types.JOB_UPDATE_SUCCESS]: updateSuccess,
  [Types.JOB_DELETE_SUCCESS]: deleteSuccess,

  [Types.JOB_FAILURE]: failure,
  [Types.JOB_ALL_FAILURE]: allFailure,
  [Types.JOB_UPDATE_FAILURE]: updateFailure,
  [Types.JOB_DELETE_FAILURE]: deleteFailure,
  [Types.JOB_RESET]: reset,
});
