import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import EmployeeSagas from '../../../../../app/modules/entities/employee/employee.sagas';
import EmployeeActions from '../../../../../app/modules/entities/employee/employee.reducer';

const { getEmployee, getAllEmployees, updateEmployee, deleteEmployee } = EmployeeSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getEmployee(1);
  const step = stepper(getEmployee(FixtureAPI, { employeeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EmployeeActions.employeeSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getEmployee(FixtureAPI, { employeeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EmployeeActions.employeeFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllEmployees();
  const step = stepper(getAllEmployees(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EmployeeActions.employeeAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllEmployees(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EmployeeActions.employeeAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateEmployee({ id: 1 });
  const step = stepper(updateEmployee(FixtureAPI, { employee: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EmployeeActions.employeeUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateEmployee(FixtureAPI, { employee: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EmployeeActions.employeeUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteEmployee({ id: 1 });
  const step = stepper(deleteEmployee(FixtureAPI, { employeeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(EmployeeActions.employeeDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteEmployee(FixtureAPI, { employeeId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(EmployeeActions.employeeDeleteFailure()));
});
