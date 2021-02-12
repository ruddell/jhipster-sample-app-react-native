import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import DepartmentActions from './department.reducer';
import LocationActions from '../location/location.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './department-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  departmentName: Yup.string().required(),
});

function DepartmentEditScreen(props) {
  const {
    getDepartment,
    updateDepartment,
    route,
    department,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllLocations,
    locationList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getDepartment(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getDepartment, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(department));
    }
  }, [department, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity ? navigation.replace('DepartmentDetail', { entityId: department?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateDepartment(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const departmentNameRef = createRef();
  const locationRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="departmentEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="departmentName"
              ref={departmentNameRef}
              label="Department Name"
              placeholder="Enter Department Name"
              testID="departmentNameInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="location"
              inputType="select-one"
              ref={locationRef}
              listItems={locationList}
              listItemLabelField="streetAddress"
              label="Location"
              placeholder="Select Location"
              testID="locationSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    departmentName: value.departmentName ?? null,
    location: value.location && value.location.id ? value.location.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    departmentName: value.departmentName ?? null,
  };
  entity.location = value.location ? { id: value.location } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    locationList: state.locations.locationList ?? [],
    department: state.departments.department,
    fetching: state.departments.fetchingOne,
    updating: state.departments.updating,
    updateSuccess: state.departments.updateSuccess,
    errorUpdating: state.departments.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
    getDepartment: (id) => dispatch(DepartmentActions.departmentRequest(id)),
    getAllDepartments: (options) => dispatch(DepartmentActions.departmentAllRequest(options)),
    updateDepartment: (department) => dispatch(DepartmentActions.departmentUpdateRequest(department)),
    reset: () => dispatch(DepartmentActions.departmentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentEditScreen);
