import { Button, ButtonProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

export interface SubmitButtonProps extends ButtonProps {
  disableIfUntouched?: boolean;
  disableIfInvalid?: boolean;
}

export const SubmitButton = forwardRef<'button', SubmitButtonProps>((props, ref) => {
  const {
    children = 'Ответить',
    disableIfUntouched = false,
    disableIfInvalid = false,
    isDisabled: isDisabledProp,
    isLoading,
    ...rest
  } = props;
  const { formState } = useFormContext();

  const isDisabled =
    (disableIfUntouched && !formState.isDirty) ||
    (disableIfInvalid && !formState.isValid) ||
    isDisabledProp;

  return (
    <Button
      ref={ref}
      type="submit"
      isLoading={formState.isSubmitting || isLoading}
      isDisabled={isDisabled}
      {...rest}
    >
      {children}
    </Button>
  );
});
