import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import TaskSagas from '../../../../../app/modules/entities/task/task.sagas';
import TaskActions from '../../../../../app/modules/entities/task/task.reducer';

const { getTask, getAllTasks, updateTask, deleteTask } = TaskSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getTask(1);
  const step = stepper(getTask(FixtureAPI, { taskId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaskActions.taskSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getTask(FixtureAPI, { taskId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaskActions.taskFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllTasks();
  const step = stepper(getAllTasks(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaskActions.taskAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllTasks(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaskActions.taskAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateTask({ id: 1 });
  const step = stepper(updateTask(FixtureAPI, { task: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaskActions.taskUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateTask(FixtureAPI, { task: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaskActions.taskUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteTask({ id: 1 });
  const step = stepper(deleteTask(FixtureAPI, { taskId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(TaskActions.taskDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteTask(FixtureAPI, { taskId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(TaskActions.taskDeleteFailure()));
});
