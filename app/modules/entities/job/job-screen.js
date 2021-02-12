import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import JobActions from './job.reducer';
import styles from './job-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function JobScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { job, jobList, getAllJobs, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Job entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchJobs();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [job, fetchJobs]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('JobDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Jobs Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchJobs = React.useCallback(() => {
    getAllJobs({ page: page - 1, sort, size });
  }, [getAllJobs, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchJobs();
  };
  return (
    <View style={styles.container} testID="jobScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={jobList}
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
    jobList: state.jobs.jobList,
    job: state.jobs.job,
    fetching: state.jobs.fetchingAll,
    error: state.jobs.errorAll,
    links: state.jobs.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllJobs: (options) => dispatch(JobActions.jobAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobScreen);
