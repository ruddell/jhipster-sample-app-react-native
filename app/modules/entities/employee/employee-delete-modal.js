import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import EmployeeActions from './employee.reducer';

import styles from './employee-styles';

function EmployeeDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteEmployee(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Employee');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Employee {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    employee: state.employees.employee,
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDeleteModal);
