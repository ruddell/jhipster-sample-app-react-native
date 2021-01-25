import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import TaskActions from './task.reducer';
import styles from './task-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function TaskScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { task, taskList, getAllTasks, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Task entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchTasks();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [task, fetchTasks]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('TaskDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Tasks Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchTasks = React.useCallback(() => {
    getAllTasks({ page: page - 1, sort, size });
  }, [getAllTasks, page, sort, size]);

  const handleLoadMore = () => {
    if (taskList.length) {
      return;
    }
    setPage(page + 1);
    fetchTasks();
  };
  return (
    <View style={styles.container} testID="taskScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={taskList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    taskList: state.tasks.taskList,
    task: state.tasks.task,
    fetching: state.tasks.fetchingAll,
    error: state.tasks.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTasks: (options) => dispatch(TaskActions.taskAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
