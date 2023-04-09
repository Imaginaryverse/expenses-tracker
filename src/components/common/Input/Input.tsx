import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { disabledStyle } from '@src/style/css';
import { Icon } from '../Icon/Icon';
import { InputContainerProps, InputProps } from './Input.types';
import { InputLabel } from './Input.label';
import { InputPwdBtn } from './Input.pwdBtn';
import { InputField } from './Input.field';
import { InputErrorMsg } from './Input.errorMsg';

const StyledInputContainer = styled.div<InputContainerProps>`
  width: ${({ customStyle }) => customStyle?.width || '100%'};
  max-width: ${({ customStyle }) => customStyle?.maxWidth || '280px'};
  ${({ disabled }) => disabled && disabledStyle};
  display: flex;
  flex-direction: column;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  type = 'text',
  disabled,
  required,
  autoFocus,
  inputMode,
  filter,
  options,
  indicateError,
  errorMessage,
  customStyle,
}) => {
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    if (showPwd && disabled) {
      setShowPwd(false);
    }
  }, [disabled, showPwd]);

  return (
    <StyledInputContainer disabled={disabled} customStyle={customStyle}>
      {!!label && <InputLabel>{label}</InputLabel>}
      <StyledInputWrapper>
        <InputField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type === 'password' && showPwd ? 'text' : type}
          autoFocus={autoFocus}
          disabled={disabled}
          required={required}
          inputMode={inputMode}
          filter={filter}
          options={options}
          indicateError={indicateError}
        />
        {type === 'password' && !disabled && (
          <InputPwdBtn
            type='button'
            aria-label={showPwd ? 'Hide password' : 'Show password'}
            title={showPwd ? 'Hide password' : 'Show password'}
          >
            <Icon
              icon={showPwd ? 'eye' : 'eye-off'}
              size='small'
              onClick={() => setShowPwd(!showPwd)}
            />
          </InputPwdBtn>
        )}
      </StyledInputWrapper>
      {indicateError && errorMessage && (
        <InputErrorMsg>{errorMessage}</InputErrorMsg>
      )}
    </StyledInputContainer>
  );
};
