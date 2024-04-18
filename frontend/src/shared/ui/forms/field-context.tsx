import React from 'react';

import { createContextProvider } from '@/shared/model';
import { Fields } from './types.ts';

export type FieldsContextValue = {
  fields: Record<Fields, React.FC<any>>;
};

export const { Provider: FieldProvider, useProvidedContext: useFieldContext } =
  createContextProvider<FieldsContextValue>('fields');

export const useField = (type: Fields, fallback?: React.FC<any>): React.FC<any> => {
  const context = useFieldContext();

  return context.fields?.[type] || fallback;
};
