import { HTMLChakraProps, chakra } from '@chakra-ui/react';
import {
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { FieldProvider } from '@/shared/ui/forms/field-context.tsx';
import { InputField, PasswordInputField } from './default-fields.tsx';

export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
> extends UseFormProps<TFieldValues, TContext>,
    Omit<HTMLChakraProps<'form'>, 'onSubmit' | 'onError'> {
  onSubmit: SubmitHandler<TFieldValues>;
  onError?: SubmitErrorHandler<TFieldValues>;
}

const defaultFieldTypes = {
  text: InputField,
  password: PasswordInputField,
};

export function Form<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
>({ ...props }: FormProps<TFieldValues, TContext>) {
  const {
    mode = 'all',
    resolver,
    reValidateMode,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    criteriaMode,
    delayError,
    defaultValues,
    values,
    context,
    resetOptions,
    onSubmit,
    onError,
    children,
    ...rest
  } = props;

  const form = {
    mode,
    resolver,
    defaultValues,
    values,
    reValidateMode,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    criteriaMode,
    delayError,
    context,
    resetOptions,
  };

  const methods = useForm<TFieldValues, TContext>(form);
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={handleSubmit(onSubmit, onError)} {...rest}>
        <FieldProvider value={{ fields: { ...defaultFieldTypes } }}>{children}</FieldProvider>
      </chakra.form>
    </FormProvider>
  );
}
