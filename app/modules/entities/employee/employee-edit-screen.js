import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import EmployeeActions from './employee.reducer';
import DepartmentActions from '../department/department.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './employee-styles';

function EmployeeEditScreen(props) {
  const {
    getEmployee,
    updateEmployee,
    route,
    employee,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllEmployees,
    employeeList,
    getAllDepartments,
    departmentList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getEmployee(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getEmployee, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(employee));
    }
  }, [employee, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllEmployees();
    getAllDepartments();
  }, [getAllEmployees, getAllDepartments]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity ? navigation.replace('EmployeeDetail', { entityId: employee?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateEmployee(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  const phoneNumberRef = createRef();
  const hireDateRef = createRef();
  const salaryRef = createRef();
  const commissionPctRef = createRef();
  const managerRef = createRef();
  const departmentRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="employeeEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="firstName"
              ref={firstNameRef}
              label="First Name"
              placeholder="Enter First Name"
              testID="firstNameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => lastNameRef.current?.focus()}
            />
            <FormField
              name="lastName"
              ref={lastNameRef}
              label="Last Name"
              placeholder="Enter Last Name"
              testID="lastNameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <FormField
              name="email"
              ref={emailRef}
              label="Email"
              placeholder="Enter Email"
              testID="emailInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => phoneNumberRef.current?.focus()}
            />
            <FormField
              name="phoneNumber"
              ref={phoneNumberRef}
              label="Phone Number"
              placeholder="Enter Phone Number"
              testID="phoneNumberInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => hireDateRef.current?.focus()}
            />
            <FormField
              name="hireDate"
              ref={hireDateRef}
              label="Hire Date"
              placeholder="Enter Hire Date"
              testID="hireDateInput"
              inputType="datetime"
              onSubmitEditing={() => salaryRef.current?.focus()}
            />
            <FormField
              name="salary"
              ref={salaryRef}
              label="Salary"
              placeholder="Enter Salary"
              testID="salaryInput"
              inputType="number"
              onSubmitEditing={() => commissionPctRef.current?.focus()}
            />
            <FormField
              name="commissionPct"
              ref={commissionPctRef}
              label="Commission Pct"
              placeholder="Enter Commission Pct"
              testID="commissionPctInput"
              inputType="number"
            />
            <FormField
              name="manager"
              inputType="select-one"
              ref={managerRef}
              listItems={employeeList}
              listItemLabelField="id"
              label="Manager"
              placeholder="Select Manager"
              testID="employeeSelectInput"
            />
            <FormField
              name="department"
              inputType="select-one"
              ref={departmentRef}
              listItems={departmentList}
              listItemLabelField="departmentName"
              label="Department"
              placeholder="Select Department"
              testID="departmentSelectInput"
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
    firstName: value.firstName ?? null,
    lastName: value.lastName ?? null,
    email: value.email ?? null,
    phoneNumber: value.phoneNumber ?? null,
    hireDate: value.hireDate ?? null,
    salary: value.salary ?? null,
    commissionPct: value.commissionPct ?? null,
    manager: value.manager && value.manager.id ? value.manager.id : null,
    department: value.department && value.department.id ? value.department.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    firstName: value.firstName ?? null,
    lastName: value.lastName ?? null,
    email: value.email ?? null,
    phoneNumber: value.phoneNumber ?? null,
    hireDate: value.hireDate ?? null,
    salary: value.salary ?? null,
    commissionPct: value.commissionPct ?? null,
  };
  entity.manager = value.manager ? { id: value.manager } : null;
  entity.department = value.department ? { id: value.department } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employees.employeeList ?? [],
    departmentList: state.departments.departmentList ?? [],
    employee: state.employees.employee,
    fetching: state.employees.fetchingOne,
    updating: state.employees.updating,
    updateSuccess: state.employees.updateSuccess,
    errorUpdating: state.employees.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
    getEmployee: (id) => dispatch(EmployeeActions.employeeRequest(id)),
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
    updateEmployee: (employee) => dispatch(EmployeeActions.employeeUpdateRequest(employee)),
    reset: () => dispatch(EmployeeActions.employeeReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEditScreen);
