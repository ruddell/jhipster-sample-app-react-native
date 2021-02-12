import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import JobActions from './job.reducer';

function* getJob(api, action) {
  const { jobId } = action;
  // make the call to the api
  const apiCall = call(api.getJob, jobId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(JobActions.jobSuccess(response.data));
  } else {
    yield put(JobActions.jobFailure(response.data));
  }
}

function* getAllJobs(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllJobs, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(JobActions.jobAllSuccess(response.data, response.headers));
  } else {
    yield put(JobActions.jobAllFailure(response.data));
  }
}

function* updateJob(api, action) {
  const { job } = action;
  // make the call to the api
  const idIsNotNull = !(job.id === null || job.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateJob : api.createJob, job);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(JobActions.jobUpdateSuccess(response.data));
  } else {
    yield put(JobActions.jobUpdateFailure(response.data));
  }
}

function* deleteJob(api, action) {
  const { jobId } = action;
  // make the call to the api
  const apiCall = call(api.deleteJob, jobId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(JobActions.jobDeleteSuccess());
  } else {
    yield put(JobActions.jobDeleteFailure(response.data));
  }
}

export default {
  getAllJobs,
  getJob,
  deleteJob,
  updateJob,
};
