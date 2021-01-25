import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CountryActions from './country.reducer';

import styles from './country-styles';

function CountryDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCountry(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Country');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Country {entity.id}?</Text>
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
    country: state.countries.country,
    fetching: state.countries.fetchingOne,
    deleting: state.countries.deleting,
    errorDeleting: state.countries.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountry: (id) => dispatch(CountryActions.countryRequest(id)),
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    deleteCountry: (id) => dispatch(CountryActions.countryDeleteRequest(id)),
    resetCountries: () => dispatch(CountryActions.countryReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryDeleteModal);
