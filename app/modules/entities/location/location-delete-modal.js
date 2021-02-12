import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import LocationActions from './location.reducer';

import styles from './location-styles';

function LocationDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteLocation(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Location');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Location {entity.id}?</Text>
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
    location: state.locations.location,
    fetching: state.locations.fetchingOne,
    deleting: state.locations.deleting,
    errorDeleting: state.locations.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLocation: (id) => dispatch(LocationActions.locationRequest(id)),
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
    deleteLocation: (id) => dispatch(LocationActions.locationDeleteRequest(id)),
    resetLocations: () => dispatch(LocationActions.locationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationDeleteModal);
