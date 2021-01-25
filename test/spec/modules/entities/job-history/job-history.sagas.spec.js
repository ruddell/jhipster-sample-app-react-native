import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import JobHistorySagas from '../../../../../app/modules/entities/job-history/job-history.sagas';
import JobHistoryActions from '../../../../../app/modules/entities/job-history/job-history.reducer';

const { getJobHistory, getAllJobHistories, updateJobHistory, deleteJobHistory } = JobHistorySagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getJobHistory(1);
  const step = stepper(getJobHistory(FixtureAPI, { jobHistoryId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(JobHistoryActions.jobHistorySuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getJobHistory(FixtureAPI, { jobHistoryId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(JobHistoryActions.jobHistoryFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllJobHistories();
  const step = stepper(getAllJobHistories(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(JobHistoryActions.jobHistoryAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllJobHistories(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(JobHistoryActions.jobHistoryAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateJobHistory({ id: 1 });
  const step = stepper(updateJobHistory(FixtureAPI, { jobHistory: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(JobHistoryActions.jobHistoryUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateJobHistory(FixtureAPI, { jobHistory: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(JobHistoryActions.jobHistoryUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteJobHistory({ id: 1 });
  const step = stepper(deleteJobHistory(FixtureAPI, { jobHistoryId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(JobHistoryActions.jobHistoryDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteJobHistory(FixtureAPI, { jobHistoryId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(JobHistoryActions.jobHistoryDeleteFailure()));
});
