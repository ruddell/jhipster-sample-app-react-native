import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  employeeRequest: ['employeeId'],
  employeeAllRequest: ['options'],
  employeeUpdateRequest: ['employee'],
  employeeDeleteRequest: ['employeeId'],

  employeeSuccess: ['employee'],
  employeeAllSuccess: ['employeeList', 'headers'],
  employeeUpdateSuccess: ['employee'],
  employeeDeleteSuccess: [],

  employeeFailure: ['error'],
  employeeAllFailure: ['error'],
  employeeUpdateFailure: ['error'],
  employeeDeleteFailure: ['error'],

  employeeReset: [],
});

export const EmployeeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  employee: { id: undefined },
  employeeList: [],
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
    employee: INITIAL_STATE.employee,
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
  const { employee } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    employee,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { employeeList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    employeeList: loadMoreDataWhenScrolled(state.employeeList, employeeList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { employee } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    employee,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    employee: INITIAL_STATE.employee,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    employee: INITIAL_STATE.employee,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    employeeList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    employee: state.employee,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    employee: state.employee,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EMPLOYEE_REQUEST]: request,
  [Types.EMPLOYEE_ALL_REQUEST]: allRequest,
  [Types.EMPLOYEE_UPDATE_REQUEST]: updateRequest,
  [Types.EMPLOYEE_DELETE_REQUEST]: deleteRequest,

  [Types.EMPLOYEE_SUCCESS]: success,
  [Types.EMPLOYEE_ALL_SUCCESS]: allSuccess,
  [Types.EMPLOYEE_UPDATE_SUCCESS]: updateSuccess,
  [Types.EMPLOYEE_DELETE_SUCCESS]: deleteSuccess,

  [Types.EMPLOYEE_FAILURE]: failure,
  [Types.EMPLOYEE_ALL_FAILURE]: allFailure,
  [Types.EMPLOYEE_UPDATE_FAILURE]: updateFailure,
  [Types.EMPLOYEE_DELETE_FAILURE]: deleteFailure,
  [Types.EMPLOYEE_RESET]: reset,
});
