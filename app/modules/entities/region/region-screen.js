import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import RegionActions from './region.reducer';
import styles from './region-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function RegionScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { region, regionList, getAllRegions, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Region entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchRegions();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [region, fetchRegions]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('RegionDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Regions Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchRegions = React.useCallback(() => {
    getAllRegions({ page: page - 1, sort, size });
  }, [getAllRegions, page, sort, size]);

  const handleLoadMore = () => {
    if (regionList.length) {
      return;
    }
    setPage(page + 1);
    fetchRegions();
  };
  return (
    <View style={styles.container} testID="regionScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={regionList}
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
    regionList: state.regions.regionList,
    region: state.regions.region,
    fetching: state.regions.fetchingAll,
    error: state.regions.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRegions: (options) => dispatch(RegionActions.regionAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionScreen);
