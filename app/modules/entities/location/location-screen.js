import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import LocationActions from './location.reducer';
import styles from './location-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function LocationScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { location, locationList, getAllLocations, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Location entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchLocations();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [location, fetchLocations]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('LocationDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Locations Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchLocations = React.useCallback(() => {
    getAllLocations({ page: page - 1, sort, size });
  }, [getAllLocations, page, sort, size]);

  const handleLoadMore = () => {
    if (locationList.length) {
      return;
    }
    setPage(page + 1);
    fetchLocations();
  };
  return (
    <View style={styles.container} testID="locationScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={locationList}
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
    locationList: state.locations.locationList,
    location: state.locations.location,
    fetching: state.locations.fetchingAll,
    error: state.locations.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);
