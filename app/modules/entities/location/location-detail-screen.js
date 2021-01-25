import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import LocationActions from './location.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import LocationDeleteModal from './location-delete-modal';
import styles from './location-styles';

function LocationDetailScreen(props) {
  const { route, getLocation, navigation, location, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = location?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Location');
      } else {
        getLocation(routeEntityId);
      }
    }, [routeEntityId, getLocation, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Location.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="locationDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{location.id}</Text>
      {/* StreetAddress Field */}
      <Text style={styles.label}>StreetAddress:</Text>
      <Text testID="streetAddress">{location.streetAddress}</Text>
      {/* PostalCode Field */}
      <Text style={styles.label}>PostalCode:</Text>
      <Text testID="postalCode">{location.postalCode}</Text>
      {/* City Field */}
      <Text style={styles.label}>City:</Text>
      <Text testID="city">{location.city}</Text>
      {/* StateProvince Field */}
      <Text style={styles.label}>StateProvince:</Text>
      <Text testID="stateProvince">{location.stateProvince}</Text>
      <Text style={styles.label}>Country:</Text>
      <Text testID="country">{String(location.country ? location.country.countryName : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('LocationEdit', { entityId })}
          accessibilityLabel={'Location Edit Button'}
          testID="locationEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Location Delete Button'}
          testID="locationDeleteButton"
        />
        {deleteModalVisible && (
          <LocationDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={location}
            testID="locationDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    location: state.locations.location,
    error: state.locations.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetailScreen);
