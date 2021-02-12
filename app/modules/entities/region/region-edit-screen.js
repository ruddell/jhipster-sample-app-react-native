import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import RegionActions from './region.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './region-styles';

function RegionEditScreen(props) {
  const { getRegion, updateRegion, route, region, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getRegion(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getRegion, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(region));
    }
  }, [region, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity ? navigation.replace('RegionDetail', { entityId: region?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateRegion(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const regionNameRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="regionEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="regionName"
              ref={regionNameRef}
              label="Region Name"
              placeholder="Enter Region Name"
              testID="regionNameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => formRef.current?.submitForm()}
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
    regionName: value.regionName ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    regionName: value.regionName ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    region: state.regions.region,
    fetching: state.regions.fetchingOne,
    updating: state.regions.updating,
    updateSuccess: state.regions.updateSuccess,
    errorUpdating: state.regions.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRegion: (id) => dispatch(RegionActions.regionRequest(id)),
    getAllRegions: (options) => dispatch(RegionActions.regionAllRequest(options)),
    updateRegion: (region) => dispatch(RegionActions.regionUpdateRequest(region)),
    reset: () => dispatch(RegionActions.regionReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionEditScreen);
