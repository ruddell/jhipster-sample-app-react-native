import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import LocationActions from './location.reducer';

function* getLocation(api, action) {
  const { locationId } = action;
  // make the call to the api
  const apiCall = call(api.getLocation, locationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(LocationActions.locationSuccess(response.data));
  } else {
    yield put(LocationActions.locationFailure(response.data));
  }
}

function* getAllLocations(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllLocations, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(LocationActions.locationAllSuccess(response.data, response.headers));
  } else {
    yield put(LocationActions.locationAllFailure(response.data));
  }
}

function* updateLocation(api, action) {
  const { location } = action;
  // make the call to the api
  const idIsNotNull = !(location.id === null || location.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateLocation : api.createLocation, location);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(LocationActions.locationUpdateSuccess(response.data));
  } else {
    yield put(LocationActions.locationUpdateFailure(response.data));
  }
}

function* deleteLocation(api, action) {
  const { locationId } = action;
  // make the call to the api
  const apiCall = call(api.deleteLocation, locationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(LocationActions.locationDeleteSuccess());
  } else {
    yield put(LocationActions.locationDeleteFailure(response.data));
  }
}

export default {
  getAllLocations,
  getLocation,
  deleteLocation,
  updateLocation,
};
