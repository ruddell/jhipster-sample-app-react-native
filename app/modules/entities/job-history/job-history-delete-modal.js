import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import JobHistoryActions from './job-history.reducer';

import styles from './job-history-styles';

function JobHistoryDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteJobHistory(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('JobHistory');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete JobHistory {entity.id}?</Text>
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
    jobHistory: state.jobHistories.jobHistory,
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

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryDeleteModal);
