import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import DepartmentActions from './department.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import DepartmentDeleteModal from './department-delete-modal';
import styles from './department-styles';

function DepartmentDetailScreen(props) {
  const { route, getDepartment, navigation, department, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = department?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Department');
      } else {
        getDepartment(routeEntityId);
      }
    }, [routeEntityId, getDepartment, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Department.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="departmentDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{department.id}</Text>
      {/* DepartmentName Field */}
      <Text style={styles.label}>DepartmentName:</Text>
      <Text testID="departmentName">{department.departmentName}</Text>
      <Text style={styles.label}>Location:</Text>
      <Text testID="location">{String(department.location ? department.location.streetAddress : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('DepartmentEdit', { entityId })}
          accessibilityLabel={'Department Edit Button'}
          testID="departmentEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Department Delete Button'}
          testID="departmentDeleteButton"
        />
        {deleteModalVisible && (
          <DepartmentDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={department}
            testID="departmentDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    department: state.departments.department,
    error: state.departments.errorOne,
    fetching: state.departments.fetchingOne,
    deleting: state.departments.deleting,
    errorDeleting: state.departments.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDepartment: (id) => dispatch(DepartmentActions.departmentRequest(id)),
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
    deleteDepartment: (id) => dispatch(DepartmentActions.departmentDeleteRequest(id)),
    resetDepartments: () => dispatch(DepartmentActions.departmentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDetailScreen);
