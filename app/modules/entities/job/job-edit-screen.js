import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import JobActions from './job.reducer';
import TaskActions from '../task/task.reducer';
import EmployeeActions from '../employee/employee.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './job-styles';

function JobEditScreen(props) {
  const {
    getJob,
    updateJob,
    route,
    job,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllTasks,
    taskList,
    getAllEmployees,
    employeeList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getJob(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getJob, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(job));
    }
  }, [job, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllTasks();
    getAllEmployees();
  }, [getAllTasks, getAllEmployees]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity ? navigation.replace('JobDetail', { entityId: job?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateJob(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const jobTitleRef = createRef();
  const minSalaryRef = createRef();
  const maxSalaryRef = createRef();
  const tasksRef = createRef();
  const employeeRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="jobEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="jobTitle"
              ref={jobTitleRef}
              label="Job Title"
              placeholder="Enter Job Title"
              testID="jobTitleInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => minSalaryRef.current?.focus()}
            />
            <FormField
              name="minSalary"
              ref={minSalaryRef}
              label="Min Salary"
              placeholder="Enter Min Salary"
              testID="minSalaryInput"
              inputType="number"
              onSubmitEditing={() => maxSalaryRef.current?.focus()}
            />
            <FormField
              name="maxSalary"
              ref={maxSalaryRef}
              label="Max Salary"
              placeholder="Enter Max Salary"
              testID="maxSalaryInput"
              inputType="number"
            />
            <FormField
              name="tasks"
              inputType="select-multiple"
              ref={tasksRef}
              listItems={taskList}
              listItemLabelField="title"
              label="Task"
              placeholder="Select Task"
              testID="taskSelectInput"
            />
            <FormField
              name="employee"
              inputType="select-one"
              ref={employeeRef}
              listItems={employeeList}
              listItemLabelField="email"
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
    jobTitle: value.jobTitle ?? null,
    minSalary: value.minSalary ?? null,
    maxSalary: value.maxSalary ?? null,
    tasks: value.tasks?.map((i) => i.id),
    employee: value.employee && value.employee.id ? value.employee.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    jobTitle: value.jobTitle ?? null,
    minSalary: value.minSalary ?? null,
    maxSalary: value.maxSalary ?? null,
  };
  entity.tasks = value.tasks.map((id) => ({ id }));
  entity.employee = value.employee ? { id: value.employee } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    taskList: state.tasks.taskList ?? [],
    employeeList: state.employees.employeeList ?? [],
    job: state.jobs.job,
    fetching: state.jobs.fetchingOne,
    updating: state.jobs.updating,
    updateSuccess: state.jobs.updateSuccess,
    errorUpdating: state.jobs.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: (options) => dispatch(TaskActions.taskAllRequest(options)),
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
    getJob: (id) => dispatch(JobActions.jobRequest(id)),
    getAllJobs: (options) => dispatch(JobActions.jobAllRequest(options)),
    updateJob: (job) => dispatch(JobActions.jobUpdateRequest(job)),
    reset: () => dispatch(JobActions.jobReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobEditScreen);
