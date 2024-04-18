import { FormState, get } from 'react-hook-form';

export const getError = (name: string, formState: FormState<{ [x: string]: unknown }>) =>
  get(formState.errors, name);
