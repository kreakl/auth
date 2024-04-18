import { ForwardedRef, forwardRef } from 'react';
import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { FocusableElement } from '../types';
import { useField } from './field-context.tsx';
import { FieldControl, type FieldControlProps } from './field-control.tsx';
import type { BaseFieldProps, Fields } from './types.ts';
import { InputField } from './default-fields.tsx';

export interface FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FieldControlProps, 'children'>,
    BaseFieldProps {
  rules?: RegisterOptions<TFieldValues, TName>;
  type: Fields;
}

export const Field = forwardRef(
  (
    { name, type, hideLabel, label, help, ...props }: FieldProps,
    ref: ForwardedRef<FocusableElement>
  ) => {
    const InputComponent = useField(type, InputField);

    return (
      <FieldControl name={name} hideLabel={hideLabel} label={label} help={help}>
        <InputComponent {...props} type={type} name={name} ref={ref} />
      </FieldControl>
    );
  }
);
