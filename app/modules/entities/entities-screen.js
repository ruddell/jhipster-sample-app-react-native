import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text="Region" onPress={() => navigation.navigate('Region')} testID="regionEntityScreenButton" />
      <RoundedButton text="Country" onPress={() => navigation.navigate('Country')} testID="countryEntityScreenButton" />
      <RoundedButton text="Location" onPress={() => navigation.navigate('Location')} testID="locationEntityScreenButton" />
      <RoundedButton text="Department" onPress={() => navigation.navigate('Department')} testID="departmentEntityScreenButton" />
      <RoundedButton text="Task" onPress={() => navigation.navigate('Task')} testID="taskEntityScreenButton" />
      <RoundedButton text="Employee" onPress={() => navigation.navigate('Employee')} testID="employeeEntityScreenButton" />
      <RoundedButton text="Job" onPress={() => navigation.navigate('Job')} testID="jobEntityScreenButton" />
      <RoundedButton text="JobHistory" onPress={() => navigation.navigate('JobHistory')} testID="jobHistoryEntityScreenButton" />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
