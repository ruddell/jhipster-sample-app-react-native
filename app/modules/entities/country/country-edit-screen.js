import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CountryActions from './country.reducer';
import RegionActions from '../region/region.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './country-styles';

function CountryEditScreen(props) {
  const {
    getCountry,
    updateCountry,
    route,
    country,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllRegions,
    regionList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCountry(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCountry, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(country));
    }
  }, [country, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllRegions();
  }, [getAllRegions]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity ? navigation.replace('CountryDetail', { entityId: country?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCountry(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const countryNameRef = createRef();
  const regionRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="countryEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="countryName"
              ref={countryNameRef}
              label="Country Name"
              placeholder="Enter Country Name"
              testID="countryNameInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="region"
              inputType="select-one"
              ref={regionRef}
              listItems={regionList}
              listItemLabelField="regionName"
              label="Region"
              placeholder="Select Region"
              testID="regionSelectInput"
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
    countryName: value.countryName ?? null,
    region: value.region && value.region.id ? value.region.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    countryName: value.countryName ?? null,
  };
  entity.region = value.region ? { id: value.region } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    regionList: state.regions.regionList ?? [],
    country: state.countries.country,
    fetching: state.countries.fetchingOne,
    updating: state.countries.updating,
    updateSuccess: state.countries.updateSuccess,
    errorUpdating: state.countries.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRegions: (options) => dispatch(RegionActions.regionAllRequest(options)),
    getCountry: (id) => dispatch(CountryActions.countryRequest(id)),
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    updateCountry: (country) => dispatch(CountryActions.countryUpdateRequest(country)),
    reset: () => dispatch(CountryActions.countryReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryEditScreen);
