import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import JobHistoryActions from './job-history.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getJobHistory(api, action) {
  const { jobHistoryId } = action;
  // make the call to the api
  const apiCall = call(api.getJobHistory, jobHistoryId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(JobHistoryActions.jobHistorySuccess(response.data));
  } else {
    yield put(JobHistoryActions.jobHistoryFailure(response.data));
  }
}

function* getAllJobHistories(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllJobHistories, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(JobHistoryActions.jobHistoryAllSuccess(response.data, response.headers));
  } else {
    yield put(JobHistoryActions.jobHistoryAllFailure(response.data));
  }
}

function* updateJobHistory(api, action) {
  const { jobHistory } = action;
  // make the call to the api
  const idIsNotNull = !(jobHistory.id === null || jobHistory.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateJobHistory : api.createJobHistory, jobHistory);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(JobHistoryActions.jobHistoryUpdateSuccess(response.data));
  } else {
    yield put(JobHistoryActions.jobHistoryUpdateFailure(response.data));
  }
}

function* deleteJobHistory(api, action) {
  const { jobHistoryId } = action;
  // make the call to the api
  const apiCall = call(api.deleteJobHistory, jobHistoryId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(JobHistoryActions.jobHistoryDeleteSuccess());
  } else {
    yield put(JobHistoryActions.jobHistoryDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.startDate = convertDateTimeFromServer(data.startDate);
  data.endDate = convertDateTimeFromServer(data.endDate);
  return data;
}

export default {
  getAllJobHistories,
  getJobHistory,
  deleteJobHistory,
  updateJobHistory,
};
