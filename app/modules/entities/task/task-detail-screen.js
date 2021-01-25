import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import TaskActions from './task.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import TaskDeleteModal from './task-delete-modal';
import styles from './task-styles';

function TaskDetailScreen(props) {
  const { route, getTask, navigation, task, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = task?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Task');
      } else {
        getTask(routeEntityId);
      }
    }, [routeEntityId, getTask, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Task.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="taskDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{task.id}</Text>
      {/* Title Field */}
      <Text style={styles.label}>Title:</Text>
      <Text testID="title">{task.title}</Text>
      {/* Description Field */}
      <Text style={styles.label}>Description:</Text>
      <Text testID="description">{task.description}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('TaskEdit', { entityId })}
          accessibilityLabel={'Task Edit Button'}
          testID="taskEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Task Delete Button'}
          testID="taskDeleteButton"
        />
        {deleteModalVisible && (
          <TaskDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={task}
            testID="taskDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    task: state.tasks.task,
    error: state.tasks.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailScreen);
