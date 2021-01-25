import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import JobActions from './job.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import JobDeleteModal from './job-delete-modal';
import styles from './job-styles';

function JobDetailScreen(props) {
  const { route, getJob, navigation, job, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = job?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Job');
      } else {
        getJob(routeEntityId);
      }
    }, [routeEntityId, getJob, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Job.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="jobDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{job.id}</Text>
      {/* JobTitle Field */}
      <Text style={styles.label}>JobTitle:</Text>
      <Text testID="jobTitle">{job.jobTitle}</Text>
      {/* MinSalary Field */}
      <Text style={styles.label}>MinSalary:</Text>
      <Text testID="minSalary">{job.minSalary}</Text>
      {/* MaxSalary Field */}
      <Text style={styles.label}>MaxSalary:</Text>
      <Text testID="maxSalary">{job.maxSalary}</Text>
      <Text style={styles.label}>Task:</Text>
      {job.tasks &&
        job.tasks.map((entity, index) => (
          <Text key={index} testID={`tasks-${index}`}>
            {String(entity.title || '')}
          </Text>
        ))}
      <Text style={styles.label}>Employee:</Text>
      <Text testID="employee">{String(job.employee ? job.employee.email : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('JobEdit', { entityId })}
          accessibilityLabel={'Job Edit Button'}
          testID="jobEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Job Delete Button'}
          testID="jobDeleteButton"
        />
        {deleteModalVisible && (
          <JobDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={job}
            testID="jobDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    job: state.jobs.job,
    error: state.jobs.errorOne,
    fetching: state.jobs.fetchingOne,
    deleting: state.jobs.deleting,
    errorDeleting: state.jobs.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJob: (id) => dispatch(JobActions.jobRequest(id)),
    getAllJobs: (options) => dispatch(JobActions.jobAllRequest(options)),
    deleteJob: (id) => dispatch(JobActions.jobDeleteRequest(id)),
    resetJobs: () => dispatch(JobActions.jobReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailScreen);
