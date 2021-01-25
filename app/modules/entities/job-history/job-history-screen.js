import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import JobHistoryActions from './job-history.reducer';
import styles from './job-history-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function JobHistoryScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { jobHistory, jobHistoryList, getAllJobHistories, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('JobHistory entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchJobHistories();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [jobHistory, fetchJobHistories]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('JobHistoryDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No JobHistories Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchJobHistories = React.useCallback(() => {
    getAllJobHistories({ page: page - 1, sort, size });
  }, [getAllJobHistories, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchJobHistories();
  };
  return (
    <View style={styles.container} testID="jobHistoryScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={jobHistoryList}
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
    jobHistoryList: state.jobHistories.jobHistoryList,
    jobHistory: state.jobHistories.jobHistory,
    fetching: state.jobHistories.fetchingAll,
    error: state.jobHistories.errorAll,
    links: state.jobHistories.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllJobHistories: (options) => dispatch(JobHistoryActions.jobHistoryAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryScreen);
