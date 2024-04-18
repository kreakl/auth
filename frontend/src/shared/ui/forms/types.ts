import { FieldValues } from 'react-hook-form';

export type Fields = 'text' | 'password';

export interface BaseFieldProps extends FieldValues {
  options?: string[];
  placeholder?: string;
}
