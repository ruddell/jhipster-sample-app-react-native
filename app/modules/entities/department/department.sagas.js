import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import DepartmentActions from './department.reducer';

function* getDepartment(api, action) {
  const { departmentId } = action;
  // make the call to the api
  const apiCall = call(api.getDepartment, departmentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DepartmentActions.departmentSuccess(response.data));
  } else {
    yield put(DepartmentActions.departmentFailure(response.data));
  }
}

function* getAllDepartments(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllDepartments, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DepartmentActions.departmentAllSuccess(response.data, response.headers));
  } else {
    yield put(DepartmentActions.departmentAllFailure(response.data));
  }
}

function* updateDepartment(api, action) {
  const { department } = action;
  // make the call to the api
  const idIsNotNull = !(department.id === null || department.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateDepartment : api.createDepartment, department);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DepartmentActions.departmentUpdateSuccess(response.data));
  } else {
    yield put(DepartmentActions.departmentUpdateFailure(response.data));
  }
}

function* deleteDepartment(api, action) {
  const { departmentId } = action;
  // make the call to the api
  const apiCall = call(api.deleteDepartment, departmentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DepartmentActions.departmentDeleteSuccess());
  } else {
    yield put(DepartmentActions.departmentDeleteFailure(response.data));
  }
}

export default {
  getAllDepartments,
  getDepartment,
  deleteDepartment,
  updateDepartment,
};
