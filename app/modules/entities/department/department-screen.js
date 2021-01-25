import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import DepartmentActions from './department.reducer';
import styles from './department-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function DepartmentScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { department, departmentList, getAllDepartments, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Department entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchDepartments();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [department, fetchDepartments]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('DepartmentDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Departments Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchDepartments = React.useCallback(() => {
    getAllDepartments({ page: page - 1, sort, size });
  }, [getAllDepartments, page, sort, size]);

  const handleLoadMore = () => {
    if (departmentList.length) {
      return;
    }
    setPage(page + 1);
    fetchDepartments();
  };
  return (
    <View style={styles.container} testID="departmentScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={departmentList}
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
    departmentList: state.departments.departmentList,
    department: state.departments.department,
    fetching: state.departments.fetchingAll,
    error: state.departments.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentScreen);
