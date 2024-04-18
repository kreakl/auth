import {
  Box,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { getError } from './utils.ts';

export interface FieldControlProps
  extends Omit<FormControlProps, 'onChange' | 'onBlur' | 'onSubmit'> {
  name: string;
  help?: string;
  hideLabel?: boolean;
  children: ReactNode;
}

export function FieldControl({ hideLabel, name, label, help, children }: FieldControlProps) {
  const { formState } = useFormContext();

  const error = getError(name, formState);

  return (
    <FormControl isInvalid={!!error}>
      {label && !hideLabel ? <FormLabel>{label}</FormLabel> : null}
      <Box>
        {children}
        {help && !error ? <FormHelperText>{help}</FormHelperText> : null}
        {error?.message && <FormErrorMessage fontSize="md">{error?.message}</FormErrorMessage>}
      </Box>
    </FormControl>
  );
}
