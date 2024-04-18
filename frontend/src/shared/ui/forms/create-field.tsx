import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { callAllHandlers } from '@chakra-ui/utils';
import { useMergeRefs, forwardRef } from '@chakra-ui/react';
import { FieldProps } from '@/shared/ui';

const withControlledInput = (InputComponent: React.FC<any>) => {
  return forwardRef<FieldProps, typeof InputComponent>(({ name, rules, ...inputProps }, ref) => {
    const { control } = useFormContext();

    const onChange = inputProps.onChange as (...event: any[]) => void;

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { ref: _ref, ...field } }) => (
          <InputComponent
            {...field}
            {...inputProps}
            onChange={callAllHandlers(onChange, field.onChange)}
            onBlur={callAllHandlers(inputProps.onBlur, field.onBlur)}
            /* eslint-disable-next-line react-hooks/rules-of-hooks */
            ref={useMergeRefs(ref, _ref)}
          />
        )}
      />
    );
  });
};

const withUncontrolledInput = (InputComponent: React.FC<any>) => {
  return forwardRef<FieldProps, typeof InputComponent>(({ name, rules, ...inputProps }, ref) => {
    const { register } = useFormContext();

    const { ref: registerRef, ...field } = register(name, rules);

    const onChange = inputProps.onChange as (...event: any[]) => void;

    return (
      <InputComponent
        {...field}
        {...inputProps}
        onChange={callAllHandlers(onChange, field.onChange)}
        onBlur={callAllHandlers(inputProps.onBlur, field.onBlur)}
        ref={useMergeRefs(ref, registerRef)}
      />
    );
  });
};

export interface CreateFieldOptions {
  isControlled?: boolean;
}

export const createField = <TProps extends object>(
  component: React.FC<TProps>,
  options?: CreateFieldOptions
) => {
  let InputComponent;
  if (options?.isControlled) {
    InputComponent = withControlledInput(component);
  } else {
    InputComponent = withUncontrolledInput(component);
  }

  return InputComponent;
};
