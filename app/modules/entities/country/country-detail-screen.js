import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CountryActions from './country.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CountryDeleteModal from './country-delete-modal';
import styles from './country-styles';

function CountryDetailScreen(props) {
  const { route, getCountry, navigation, country, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = country?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Country');
      } else {
        getCountry(routeEntityId);
      }
    }, [routeEntityId, getCountry, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Country.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="countryDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{country.id}</Text>
      {/* CountryName Field */}
      <Text style={styles.label}>CountryName:</Text>
      <Text testID="countryName">{country.countryName}</Text>
      <Text style={styles.label}>Region:</Text>
      <Text testID="region">{String(country.region ? country.region.regionName : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CountryEdit', { entityId })}
          accessibilityLabel={'Country Edit Button'}
          testID="countryEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Country Delete Button'}
          testID="countryDeleteButton"
        />
        {deleteModalVisible && (
          <CountryDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={country}
            testID="countryDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    country: state.countries.country,
    error: state.countries.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetailScreen);
