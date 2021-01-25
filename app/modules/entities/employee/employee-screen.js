import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import EmployeeActions from './employee.reducer';
import styles from './employee-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function EmployeeScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { employee, employeeList, getAllEmployees, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Employee entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchEmployees();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [employee, fetchEmployees]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('EmployeeDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Employees Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchEmployees = React.useCallback(() => {
    getAllEmployees({ page: page - 1, sort, size });
  }, [getAllEmployees, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchEmployees();
  };
  return (
    <View style={styles.container} testID="employeeScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={employeeList}
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
    employeeList: state.employees.employeeList,
    employee: state.employees.employee,
    fetching: state.employees.fetchingAll,
    error: state.employees.errorAll,
    links: state.employees.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEmployees: (options) => dispatch(EmployeeActions.employeeAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeScreen);
