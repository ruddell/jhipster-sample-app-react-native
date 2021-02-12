import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import TaskActions from './task.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './task-styles';

function TaskEditScreen(props) {
  const { getTask, updateTask, route, task, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getTask(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getTask, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(task));
    }
  }, [task, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity ? navigation.replace('TaskDetail', { entityId: task?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateTask(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const titleRef = createRef();
  const descriptionRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="taskEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="title"
              ref={titleRef}
              label="Title"
              placeholder="Enter Title"
              testID="titleInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
            <FormField
              name="description"
              ref={descriptionRef}
              label="Description"
              placeholder="Enter Description"
              testID="descriptionInput"
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
    title: value.title ?? null,
    description: value.description ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    title: value.title ?? null,
    description: value.description ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    task: state.tasks.task,
    fetching: state.tasks.fetchingOne,
    updating: state.tasks.updating,
    updateSuccess: state.tasks.updateSuccess,
    errorUpdating: state.tasks.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTask: (id) => dispatch(TaskActions.taskRequest(id)),
    getAllTasks: (options) => dispatch(TaskActions.taskAllRequest(options)),
    updateTask: (task) => dispatch(TaskActions.taskUpdateRequest(task)),
    reset: () => dispatch(TaskActions.taskReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditScreen);
