import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import EmployeeActions from './employee.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import EmployeeDeleteModal from './employee-delete-modal';
import styles from './employee-styles';

function EmployeeDetailScreen(props) {
  const { route, getEmployee, navigation, employee, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = employee?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Employee');
      } else {
        getEmployee(routeEntityId);
      }
    }, [routeEntityId, getEmployee, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Employee.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="employeeDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{employee.id}</Text>
      {/* FirstName Field */}
      <Text style={styles.label}>FirstName:</Text>
      <Text testID="firstName">{employee.firstName}</Text>
      {/* LastName Field */}
      <Text style={styles.label}>LastName:</Text>
      <Text testID="lastName">{employee.lastName}</Text>
      {/* Email Field */}
      <Text style={styles.label}>Email:</Text>
      <Text testID="email">{employee.email}</Text>
      {/* PhoneNumber Field */}
      <Text style={styles.label}>PhoneNumber:</Text>
      <Text testID="phoneNumber">{employee.phoneNumber}</Text>
      {/* HireDate Field */}
      <Text style={styles.label}>HireDate:</Text>
      <Text testID="hireDate">{String(employee.hireDate)}</Text>
      {/* Salary Field */}
      <Text style={styles.label}>Salary:</Text>
      <Text testID="salary">{employee.salary}</Text>
      {/* CommissionPct Field */}
      <Text style={styles.label}>CommissionPct:</Text>
      <Text testID="commissionPct">{employee.commissionPct}</Text>
      <Text style={styles.label}>Manager:</Text>
      <Text testID="manager">{String(employee.manager ? employee.manager.id : '')}</Text>
      <Text style={styles.label}>Department:</Text>
      <Text testID="department">{String(employee.department ? employee.department.departmentName : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('EmployeeEdit', { entityId })}
          accessibilityLabel={'Employee Edit Button'}
          testID="employeeEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Employee Delete Button'}
          testID="employeeDeleteButton"
        />
        {deleteModalVisible && (
          <EmployeeDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={employee}
            testID="employeeDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    employee: state.employees.employee,
    error: state.employees.errorOne,
    fetching: state.employees.fetchingOne,
    deleting: state.employees.deleting,
    errorDeleting: state.employees.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployee: (id) => dispatch(EmployeeActions.employeeRequest(id)),
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
    deleteEmployee: (id) => dispatch(EmployeeActions.employeeDeleteRequest(id)),
    resetEmployees: () => dispatch(EmployeeActions.employeeReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetailScreen);
