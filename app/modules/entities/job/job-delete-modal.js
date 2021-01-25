import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import JobActions from './job.reducer';

import styles from './job-styles';

function JobDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteJob(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Job');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Job {entity.id}?</Text>
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
    job: state.jobs.job,
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

export default connect(mapStateToProps, mapDispatchToProps)(JobDeleteModal);
