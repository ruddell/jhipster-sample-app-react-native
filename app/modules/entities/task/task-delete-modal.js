import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import TaskActions from './task.reducer';

import styles from './task-styles';

function TaskDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteTask(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Task');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Task {entity.id}?</Text>
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
    task: state.tasks.task,
    fetching: state.tasks.fetchingOne,
    deleting: state.tasks.deleting,
    errorDeleting: state.tasks.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTask: (id) => dispatch(TaskActions.taskRequest(id)),
    getAllTasks: (options) => dispatch(TaskActions.taskAllRequest(options)),
    deleteTask: (id) => dispatch(TaskActions.taskDeleteRequest(id)),
    resetTasks: () => dispatch(TaskActions.taskReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDeleteModal);
