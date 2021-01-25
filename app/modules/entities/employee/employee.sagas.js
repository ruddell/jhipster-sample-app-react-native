import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import EmployeeActions from './employee.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getEmployee(api, action) {
  const { employeeId } = action;
  // make the call to the api
  const apiCall = call(api.getEmployee, employeeId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(EmployeeActions.employeeSuccess(response.data));
  } else {
    yield put(EmployeeActions.employeeFailure(response.data));
  }
}

function* getAllEmployees(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllEmployees, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(EmployeeActions.employeeAllSuccess(response.data, response.headers));
  } else {
    yield put(EmployeeActions.employeeAllFailure(response.data));
  }
}

function* updateEmployee(api, action) {
  const { employee } = action;
  // make the call to the api
  const idIsNotNull = !(employee.id === null || employee.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateEmployee : api.createEmployee, employee);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(EmployeeActions.employeeUpdateSuccess(response.data));
  } else {
    yield put(EmployeeActions.employeeUpdateFailure(response.data));
  }
}

function* deleteEmployee(api, action) {
  const { employeeId } = action;
  // make the call to the api
  const apiCall = call(api.deleteEmployee, employeeId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(EmployeeActions.employeeDeleteSuccess());
  } else {
    yield put(EmployeeActions.employeeDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.hireDate = convertDateTimeFromServer(data.hireDate);
  return data;
}

export default {
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
};
