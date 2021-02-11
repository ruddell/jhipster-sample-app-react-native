import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import AppConfig from '../../config/app-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { RegionTypes } from '../../modules/entities/region/region.reducer'
import { CountryTypes } from '../../modules/entities/country/country.reducer'
import { LocationTypes } from '../../modules/entities/location/location.reducer'
import { DepartmentTypes } from '../../modules/entities/department/department.reducer'
import { TaskTypes } from '../../modules/entities/task/task.reducer'
import { EmployeeTypes } from '../../modules/entities/employee/employee.reducer'
import { JobTypes } from '../../modules/entities/job/job.reducer'
import { JobHistoryTypes } from '../../modules/entities/job-history/job-history.reducer'
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import UserSagas from '../../shared/sagas/user.sagas'
import RegionSagas from '../../modules/entities/region/region.sagas';
import CountrySagas from '../../modules/entities/country/country.sagas';
import LocationSagas from '../../modules/entities/location/location.sagas';
import DepartmentSagas from '../../modules/entities/department/department.sagas';
import TaskSagas from '../../modules/entities/task/task.sagas';
import EmployeeSagas from '../../modules/entities/employee/employee.sagas';
import JobSagas from '../../modules/entities/job/job.sagas';
import JobHistorySagas from '../../modules/entities/job-history/job-history.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(RegionTypes.REGION_REQUEST, RegionSagas.getRegion, api),
    takeLatest(RegionTypes.REGION_ALL_REQUEST, RegionSagas.getAllRegions, api),
    takeLatest(RegionTypes.REGION_UPDATE_REQUEST, RegionSagas.updateRegion, api),
    takeLatest(RegionTypes.REGION_DELETE_REQUEST, RegionSagas.deleteRegion, api),

    takeLatest(CountryTypes.COUNTRY_REQUEST, CountrySagas.getCountry, api),
    takeLatest(CountryTypes.COUNTRY_ALL_REQUEST, CountrySagas.getAllCountries, api),
    takeLatest(CountryTypes.COUNTRY_UPDATE_REQUEST, CountrySagas.updateCountry, api),
    takeLatest(CountryTypes.COUNTRY_DELETE_REQUEST, CountrySagas.deleteCountry, api),

    takeLatest(LocationTypes.LOCATION_REQUEST, LocationSagas.getLocation, api),
    takeLatest(LocationTypes.LOCATION_ALL_REQUEST, LocationSagas.getAllLocations, api),
    takeLatest(LocationTypes.LOCATION_UPDATE_REQUEST, LocationSagas.updateLocation, api),
    takeLatest(LocationTypes.LOCATION_DELETE_REQUEST, LocationSagas.deleteLocation, api),

    takeLatest(DepartmentTypes.DEPARTMENT_REQUEST, DepartmentSagas.getDepartment, api),
    takeLatest(DepartmentTypes.DEPARTMENT_ALL_REQUEST, DepartmentSagas.getAllDepartments, api),
    takeLatest(DepartmentTypes.DEPARTMENT_UPDATE_REQUEST, DepartmentSagas.updateDepartment, api),
    takeLatest(DepartmentTypes.DEPARTMENT_DELETE_REQUEST, DepartmentSagas.deleteDepartment, api),

    takeLatest(TaskTypes.TASK_REQUEST, TaskSagas.getTask, api),
    takeLatest(TaskTypes.TASK_ALL_REQUEST, TaskSagas.getAllTasks, api),
    takeLatest(TaskTypes.TASK_UPDATE_REQUEST, TaskSagas.updateTask, api),
    takeLatest(TaskTypes.TASK_DELETE_REQUEST, TaskSagas.deleteTask, api),

    takeLatest(EmployeeTypes.EMPLOYEE_REQUEST, EmployeeSagas.getEmployee, api),
    takeLatest(EmployeeTypes.EMPLOYEE_ALL_REQUEST, EmployeeSagas.getAllEmployees, api),
    takeLatest(EmployeeTypes.EMPLOYEE_UPDATE_REQUEST, EmployeeSagas.updateEmployee, api),
    takeLatest(EmployeeTypes.EMPLOYEE_DELETE_REQUEST, EmployeeSagas.deleteEmployee, api),

    takeLatest(JobTypes.JOB_REQUEST, JobSagas.getJob, api),
    takeLatest(JobTypes.JOB_ALL_REQUEST, JobSagas.getAllJobs, api),
    takeLatest(JobTypes.JOB_UPDATE_REQUEST, JobSagas.updateJob, api),
    takeLatest(JobTypes.JOB_DELETE_REQUEST, JobSagas.deleteJob, api),

    takeLatest(JobHistoryTypes.JOB_HISTORY_REQUEST, JobHistorySagas.getJobHistory, api),
    takeLatest(JobHistoryTypes.JOB_HISTORY_ALL_REQUEST, JobHistorySagas.getAllJobHistories, api),
    takeLatest(JobHistoryTypes.JOB_HISTORY_UPDATE_REQUEST, JobHistorySagas.updateJobHistory, api),
    takeLatest(JobHistoryTypes.JOB_HISTORY_DELETE_REQUEST, JobHistorySagas.deleteJobHistory, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
