import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CountryActions from './country.reducer';
import styles from './country-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CountryScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { country, countryList, getAllCountries, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Country entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCountries();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [country, fetchCountries]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CountryDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Countries Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCountries = React.useCallback(() => {
    getAllCountries({ page: page - 1, sort, size });
  }, [getAllCountries, page, sort, size]);

  const handleLoadMore = () => {
    if (countryList.length) {
      return;
    }
    setPage(page + 1);
    fetchCountries();
  };
  return (
    <View style={styles.container} testID="countryScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={countryList}
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
    countryList: state.countries.countryList,
    country: state.countries.country,
    fetching: state.countries.fetchingAll,
    error: state.countries.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryScreen);
