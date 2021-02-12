import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import RegionScreen from '../modules/entities/region/region-screen';
import RegionDetailScreen from '../modules/entities/region/region-detail-screen';
import RegionEditScreen from '../modules/entities/region/region-edit-screen';
import CountryScreen from '../modules/entities/country/country-screen';
import CountryDetailScreen from '../modules/entities/country/country-detail-screen';
import CountryEditScreen from '../modules/entities/country/country-edit-screen';
import LocationScreen from '../modules/entities/location/location-screen';
import LocationDetailScreen from '../modules/entities/location/location-detail-screen';
import LocationEditScreen from '../modules/entities/location/location-edit-screen';
import DepartmentScreen from '../modules/entities/department/department-screen';
import DepartmentDetailScreen from '../modules/entities/department/department-detail-screen';
import DepartmentEditScreen from '../modules/entities/department/department-edit-screen';
import TaskScreen from '../modules/entities/task/task-screen';
import TaskDetailScreen from '../modules/entities/task/task-detail-screen';
import TaskEditScreen from '../modules/entities/task/task-edit-screen';
import EmployeeScreen from '../modules/entities/employee/employee-screen';
import EmployeeDetailScreen from '../modules/entities/employee/employee-detail-screen';
import EmployeeEditScreen from '../modules/entities/employee/employee-edit-screen';
import JobScreen from '../modules/entities/job/job-screen';
import JobDetailScreen from '../modules/entities/job/job-detail-screen';
import JobEditScreen from '../modules/entities/job/job-edit-screen';
import JobHistoryScreen from '../modules/entities/job-history/job-history-screen';
import JobHistoryDetailScreen from '../modules/entities/job-history/job-history-detail-screen';
import JobHistoryEditScreen from '../modules/entities/job-history/job-history-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Region',
    route: 'region',
    component: RegionScreen,
    options: {
      title: 'Regions',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('RegionEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'RegionDetail',
    route: 'region/detail',
    component: RegionDetailScreen,
    options: { title: 'View Region', headerLeft: () => <HeaderBackButton onPress={() => navigate('Region')} /> },
  },
  {
    name: 'RegionEdit',
    route: 'region/edit',
    component: RegionEditScreen,
    options: {
      title: 'Edit Region',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('RegionDetail', 'Region')} />,
    },
  },
  {
    name: 'Country',
    route: 'country',
    component: CountryScreen,
    options: {
      title: 'Countries',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CountryEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CountryDetail',
    route: 'country/detail',
    component: CountryDetailScreen,
    options: { title: 'View Country', headerLeft: () => <HeaderBackButton onPress={() => navigate('Country')} /> },
  },
  {
    name: 'CountryEdit',
    route: 'country/edit',
    component: CountryEditScreen,
    options: {
      title: 'Edit Country',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CountryDetail', 'Country')} />,
    },
  },
  {
    name: 'Location',
    route: 'location',
    component: LocationScreen,
    options: {
      title: 'Locations',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('LocationEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'LocationDetail',
    route: 'location/detail',
    component: LocationDetailScreen,
    options: { title: 'View Location', headerLeft: () => <HeaderBackButton onPress={() => navigate('Location')} /> },
  },
  {
    name: 'LocationEdit',
    route: 'location/edit',
    component: LocationEditScreen,
    options: {
      title: 'Edit Location',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('LocationDetail', 'Location')} />,
    },
  },
  {
    name: 'Department',
    route: 'department',
    component: DepartmentScreen,
    options: {
      title: 'Departments',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('DepartmentEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'DepartmentDetail',
    route: 'department/detail',
    component: DepartmentDetailScreen,
    options: { title: 'View Department', headerLeft: () => <HeaderBackButton onPress={() => navigate('Department')} /> },
  },
  {
    name: 'DepartmentEdit',
    route: 'department/edit',
    component: DepartmentEditScreen,
    options: {
      title: 'Edit Department',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('DepartmentDetail', 'Department')} />,
    },
  },
  {
    name: 'Task',
    route: 'task',
    component: TaskScreen,
    options: {
      title: 'Tasks',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('TaskEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'TaskDetail',
    route: 'task/detail',
    component: TaskDetailScreen,
    options: { title: 'View Task', headerLeft: () => <HeaderBackButton onPress={() => navigate('Task')} /> },
  },
  {
    name: 'TaskEdit',
    route: 'task/edit',
    component: TaskEditScreen,
    options: { title: 'Edit Task', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('TaskDetail', 'Task')} /> },
  },
  {
    name: 'Employee',
    route: 'employee',
    component: EmployeeScreen,
    options: {
      title: 'Employees',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('EmployeeEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'EmployeeDetail',
    route: 'employee/detail',
    component: EmployeeDetailScreen,
    options: { title: 'View Employee', headerLeft: () => <HeaderBackButton onPress={() => navigate('Employee')} /> },
  },
  {
    name: 'EmployeeEdit',
    route: 'employee/edit',
    component: EmployeeEditScreen,
    options: {
      title: 'Edit Employee',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('EmployeeDetail', 'Employee')} />,
    },
  },
  {
    name: 'Job',
    route: 'job',
    component: JobScreen,
    options: {
      title: 'Jobs',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('JobEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'JobDetail',
    route: 'job/detail',
    component: JobDetailScreen,
    options: { title: 'View Job', headerLeft: () => <HeaderBackButton onPress={() => navigate('Job')} /> },
  },
  {
    name: 'JobEdit',
    route: 'job/edit',
    component: JobEditScreen,
    options: { title: 'Edit Job', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('JobDetail', 'Job')} /> },
  },
  {
    name: 'JobHistory',
    route: 'job-history',
    component: JobHistoryScreen,
    options: {
      title: 'JobHistories',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('JobHistoryEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'JobHistoryDetail',
    route: 'job-history/detail',
    component: JobHistoryDetailScreen,
    options: { title: 'View JobHistory', headerLeft: () => <HeaderBackButton onPress={() => navigate('JobHistory')} /> },
  },
  {
    name: 'JobHistoryEdit',
    route: 'job-history/edit',
    component: JobHistoryEditScreen,
    options: {
      title: 'Edit JobHistory',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('JobHistoryDetail', 'JobHistory')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
