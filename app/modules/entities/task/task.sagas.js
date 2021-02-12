import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import TaskActions from './task.reducer';

function* getTask(api, action) {
  const { taskId } = action;
  // make the call to the api
  const apiCall = call(api.getTask, taskId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TaskActions.taskSuccess(response.data));
  } else {
    yield put(TaskActions.taskFailure(response.data));
  }
}

function* getAllTasks(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllTasks, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TaskActions.taskAllSuccess(response.data, response.headers));
  } else {
    yield put(TaskActions.taskAllFailure(response.data));
  }
}

function* updateTask(api, action) {
  const { task } = action;
  // make the call to the api
  const idIsNotNull = !(task.id === null || task.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateTask : api.createTask, task);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TaskActions.taskUpdateSuccess(response.data));
  } else {
    yield put(TaskActions.taskUpdateFailure(response.data));
  }
}

function* deleteTask(api, action) {
  const { taskId } = action;
  // make the call to the api
  const apiCall = call(api.deleteTask, taskId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(TaskActions.taskDeleteSuccess());
  } else {
    yield put(TaskActions.taskDeleteFailure(response.data));
  }
}

export default {
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
};
