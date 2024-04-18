import { ReactNode } from 'react';
import { forwardRef, Input, InputGroup, InputProps } from '@chakra-ui/react';
import { createField, PasswordInput, PasswordInputProps } from '@/shared/ui';

export const PasswordInputField = createField<PasswordInputProps>(
  forwardRef((props, ref) => <PasswordInput ref={ref} {...props} />),
);

export interface InputFieldProps extends InputProps {
  type?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

export const InputField = createField<InputFieldProps>(
  forwardRef(({ type = 'text', leftAddon, rightAddon, size, ...rest }, ref) => {
    const input = <Input type={type} size={size} {...rest} ref={ref} />;
    if (leftAddon || rightAddon) {
      return (
        <InputGroup size={size}>
          {leftAddon}
          {input}
          {rightAddon}
        </InputGroup>
      );
    }
    return input;
  }),
);
