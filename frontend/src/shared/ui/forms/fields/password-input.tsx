import { ReactElement, useState } from 'react';
import {
  forwardRef,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { IoMdEye as HidePasswordIcon, IoMdEyeOff as ShowPasswordIcon } from 'react-icons/io';

export interface PasswordInputProps extends InputProps {
  showIcon?: ReactElement;
  hideIcon?: ReactElement;
}

const defaultHide = <HidePasswordIcon width="24px" height="24px" />;
const defaultShow = <ShowPasswordIcon width="24px" height="24px" />;

export const PasswordInput = forwardRef<PasswordInputProps, 'div'>(
  (
    {
      placeholder = 'Введите пароль',
      size = 'md',
      showIcon = defaultShow,
      hideIcon = defaultHide,
      variant = 'outline',
      autoComplete = 'on',
      ...inputProps
    },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => {
      setShow(!show);
    };

    return (
      <InputGroup>
        <Input
          {...inputProps}
          ref={ref}
          size={size}
          variant={variant}
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          autoComplete={show ? 'off' : autoComplete}
          placeholder={placeholder}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label="show password"
            h="1.75rem"
            size="sm"
            borderRadius="md"
            bg="transparent"
            variant="outlined"
            onClick={handleClick}
            icon={show ? showIcon : hideIcon}
            _hover={{ bg: 'primary.50' }}
          />
        </InputRightElement>
      </InputGroup>
    );
  }
);
