import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import JobHistoryActions from './job-history.reducer';
import JobActions from '../job/job.reducer';
import DepartmentActions from '../department/department.reducer';
import EmployeeActions from '../employee/employee.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './job-history-styles';

const Language = [
  {
    label: 'FRENCH',
    value: 'FRENCH',
  },
  {
    label: 'ENGLISH',
    value: 'ENGLISH',
  },
  {
    label: 'SPANISH',
    value: 'SPANISH',
  },
];

function JobHistoryEditScreen(props) {
  const {
    getJobHistory,
    updateJobHistory,
    route,
    jobHistory,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllJobs,
    jobList,
    getAllDepartments,
    departmentList,
    getAllEmployees,
    employeeList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getJobHistory(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getJobHistory, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(jobHistory));
    }
  }, [jobHistory, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllJobs();
    getAllDepartments();
    getAllEmployees();
  }, [getAllJobs, getAllDepartments, getAllEmployees]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity ? navigation.replace('JobHistoryDetail', { entityId: jobHistory?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateJobHistory(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const startDateRef = createRef();
  const endDateRef = createRef();
  const languageRef = createRef();
  const jobRef = createRef();
  const departmentRef = createRef();
  const employeeRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="jobHistoryEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="startDate"
              ref={startDateRef}
              label="Start Date"
              placeholder="Enter Start Date"
              testID="startDateInput"
              inputType="datetime"
              onSubmitEditing={() => endDateRef.current?.focus()}
            />
            <FormField
              name="endDate"
              ref={endDateRef}
              label="End Date"
              placeholder="Enter End Date"
              testID="endDateInput"
              inputType="datetime"
              onSubmitEditing={() => languageRef.current?.focus()}
            />
            <FormField
              name="language"
              ref={languageRef}
              label="Language"
              placeholder="Enter Language"
              testID="languageInput"
              inputType="select-one"
              listItems={Language}
            />
            <FormField
              name="job"
              inputType="select-one"
              ref={jobRef}
              listItems={jobList}
              listItemLabelField="id"
              label="Job"
              placeholder="Select Job"
              testID="jobSelectInput"
            />
            <FormField
              name="department"
              inputType="select-one"
              ref={departmentRef}
              listItems={departmentList}
              listItemLabelField="id"
              label="Department"
              placeholder="Select Department"
              testID="departmentSelectInput"
            />
            <FormField
              name="employee"
              inputType="select-one"
              ref={employeeRef}
              listItems={employeeList}
              listItemLabelField="id"
              label="Employee"
              placeholder="Select Employee"
              testID="employeeSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    startDate: value.startDate ?? null,
    endDate: value.endDate ?? null,
    language: value.language ?? null,
    job: value.job && value.job.id ? value.job.id : null,
    department: value.department && value.department.id ? value.department.id : null,
    employee: value.employee && value.employee.id ? value.employee.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    startDate: value.startDate ?? null,
    endDate: value.endDate ?? null,
    language: value.language ?? null,
  };
  entity.job = value.job ? { id: value.job } : null;
  entity.department = value.department ? { id: value.department } : null;
  entity.employee = value.employee ? { id: value.employee } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    jobList: state.jobs.jobList ?? [],
    departmentList: state.departments.departmentList ?? [],
    employeeList: state.employees.employeeList ?? [],
    jobHistory: state.jobHistories.jobHistory,
    fetching: state.jobHistories.fetchingOne,
    updating: state.jobHistories.updating,
    updateSuccess: state.jobHistories.updateSuccess,
    errorUpdating: state.jobHistories.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllJobs: (options) => dispatch(JobActions.jobAllRequest(options)),
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
    getJobHistory: (id) => dispatch(JobHistoryActions.jobHistoryRequest(id)),
    getAllJobHistories: (options) => dispatch(JobHistoryActions.jobHistoryAllRequest(options)),
    updateJobHistory: (jobHistory) => dispatch(JobHistoryActions.jobHistoryUpdateRequest(jobHistory)),
    reset: () => dispatch(JobHistoryActions.jobHistoryReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryEditScreen);
