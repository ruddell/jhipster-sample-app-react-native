import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import LocationActions from './location.reducer';
import CountryActions from '../country/country.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './location-styles';

function LocationEditScreen(props) {
  const {
    getLocation,
    updateLocation,
    route,
    location,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllCountries,
    countryList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getLocation(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getLocation, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(location));
    }
  }, [location, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity ? navigation.replace('LocationDetail', { entityId: location?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateLocation(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const streetAddressRef = createRef();
  const postalCodeRef = createRef();
  const cityRef = createRef();
  const stateProvinceRef = createRef();
  const countryRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="locationEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="streetAddress"
              ref={streetAddressRef}
              label="Street Address"
              placeholder="Enter Street Address"
              testID="streetAddressInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => postalCodeRef.current?.focus()}
            />
            <FormField
              name="postalCode"
              ref={postalCodeRef}
              label="Postal Code"
              placeholder="Enter Postal Code"
              testID="postalCodeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => cityRef.current?.focus()}
            />
            <FormField
              name="city"
              ref={cityRef}
              label="City"
              placeholder="Enter City"
              testID="cityInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => stateProvinceRef.current?.focus()}
            />
            <FormField
              name="stateProvince"
              ref={stateProvinceRef}
              label="State Province"
              placeholder="Enter State Province"
              testID="stateProvinceInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="country"
              inputType="select-one"
              ref={countryRef}
              listItems={countryList}
              listItemLabelField="countryName"
              label="Country"
              placeholder="Select Country"
              testID="countrySelectInput"
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
    streetAddress: value.streetAddress ?? null,
    postalCode: value.postalCode ?? null,
    city: value.city ?? null,
    stateProvince: value.stateProvince ?? null,
    country: value.country && value.country.id ? value.country.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    streetAddress: value.streetAddress ?? null,
    postalCode: value.postalCode ?? null,
    city: value.city ?? null,
    stateProvince: value.stateProvince ?? null,
  };
  entity.country = value.country ? { id: value.country } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    countryList: state.countries.countryList ?? [],
    location: state.locations.location,
    fetching: state.locations.fetchingOne,
    updating: state.locations.updating,
    updateSuccess: state.locations.updateSuccess,
    errorUpdating: state.locations.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    getLocation: (id) => dispatch(LocationActions.locationRequest(id)),
    getAllLocations: (options) => dispatch(LocationActions.locationAllRequest(options)),
    updateLocation: (location) => dispatch(LocationActions.locationUpdateRequest(location)),
    reset: () => dispatch(LocationActions.locationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditScreen);
