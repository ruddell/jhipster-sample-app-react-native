import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import RegionActions from './region.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import RegionDeleteModal from './region-delete-modal';
import styles from './region-styles';

function RegionDetailScreen(props) {
  const { route, getRegion, navigation, region, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = region?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Region');
      } else {
        getRegion(routeEntityId);
      }
    }, [routeEntityId, getRegion, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Region.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="regionDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{region.id}</Text>
      {/* RegionName Field */}
      <Text style={styles.label}>RegionName:</Text>
      <Text testID="regionName">{region.regionName}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('RegionEdit', { entityId })}
          accessibilityLabel={'Region Edit Button'}
          testID="regionEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Region Delete Button'}
          testID="regionDeleteButton"
        />
        {deleteModalVisible && (
          <RegionDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={region}
            testID="regionDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    region: state.regions.region,
    error: state.regions.errorOne,
    fetching: state.regions.fetchingOne,
    deleting: state.regions.deleting,
    errorDeleting: state.regions.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRegion: (id) => dispatch(RegionActions.regionRequest(id)),
    getAllRegions: (options) => dispatch(RegionActions.regionAllRequest(options)),
    deleteRegion: (id) => dispatch(RegionActions.regionDeleteRequest(id)),
    resetRegions: () => dispatch(RegionActions.regionReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionDetailScreen);
