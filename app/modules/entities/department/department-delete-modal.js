import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import DepartmentActions from './department.reducer';

import styles from './department-styles';

function DepartmentDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteDepartment(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Department');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Department {entity.id}?</Text>
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
    department: state.departments.department,
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

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDeleteModal);
