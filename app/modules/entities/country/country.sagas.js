import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CountryActions from './country.reducer';

function* getCountry(api, action) {
  const { countryId } = action;
  // make the call to the api
  const apiCall = call(api.getCountry, countryId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CountryActions.countrySuccess(response.data));
  } else {
    yield put(CountryActions.countryFailure(response.data));
  }
}

function* getAllCountries(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCountries, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CountryActions.countryAllSuccess(response.data, response.headers));
  } else {
    yield put(CountryActions.countryAllFailure(response.data));
  }
}

function* updateCountry(api, action) {
  const { country } = action;
  // make the call to the api
  const idIsNotNull = !(country.id === null || country.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCountry : api.createCountry, country);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CountryActions.countryUpdateSuccess(response.data));
  } else {
    yield put(CountryActions.countryUpdateFailure(response.data));
  }
}

function* deleteCountry(api, action) {
  const { countryId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCountry, countryId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CountryActions.countryDeleteSuccess());
  } else {
    yield put(CountryActions.countryDeleteFailure(response.data));
  }
}

export default {
  getAllCountries,
  getCountry,
  deleteCountry,
  updateCountry,
};
