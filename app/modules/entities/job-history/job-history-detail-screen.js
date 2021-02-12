import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import JobHistoryActions from './job-history.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import JobHistoryDeleteModal from './job-history-delete-modal';
import styles from './job-history-styles';

function JobHistoryDetailScreen(props) {
  const { route, getJobHistory, navigation, jobHistory, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = jobHistory?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('JobHistory');
      } else {
        getJobHistory(routeEntityId);
      }
    }, [routeEntityId, getJobHistory, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the JobHistory.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="jobHistoryDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{jobHistory.id}</Text>
      {/* StartDate Field */}
      <Text style={styles.label}>StartDate:</Text>
      <Text testID="startDate">{String(jobHistory.startDate)}</Text>
      {/* EndDate Field */}
      <Text style={styles.label}>EndDate:</Text>
      <Text testID="endDate">{String(jobHistory.endDate)}</Text>
      {/* Language Field */}
      <Text style={styles.label}>Language:</Text>
      <Text testID="language">{jobHistory.language}</Text>
      <Text style={styles.label}>Job:</Text>
      <Text testID="job">{String(jobHistory.job ? jobHistory.job.id : '')}</Text>
      <Text style={styles.label}>Department:</Text>
      <Text testID="department">{String(jobHistory.department ? jobHistory.department.id : '')}</Text>
      <Text style={styles.label}>Employee:</Text>
      <Text testID="employee">{String(jobHistory.employee ? jobHistory.employee.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('JobHistoryEdit', { entityId })}
          accessibilityLabel={'JobHistory Edit Button'}
          testID="jobHistoryEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'JobHistory Delete Button'}
          testID="jobHistoryDeleteButton"
        />
        {deleteModalVisible && (
          <JobHistoryDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={jobHistory}
            testID="jobHistoryDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    jobHistory: state.jobHistories.jobHistory,
    error: state.jobHistories.errorOne,
    fetching: state.jobHistories.fetchingOne,
    deleting: state.jobHistories.deleting,
    errorDeleting: state.jobHistories.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobHistory: (id) => dispatch(JobHistoryActions.jobHistoryRequest(id)),
    getAllJobHistories: (options) => dispatch(JobHistoryActions.jobHistoryAllRequest(options)),
    deleteJobHistory: (id) => dispatch(JobHistoryActions.jobHistoryDeleteRequest(id)),
    resetJobHistories: () => dispatch(JobHistoryActions.jobHistoryReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryDetailScreen);
