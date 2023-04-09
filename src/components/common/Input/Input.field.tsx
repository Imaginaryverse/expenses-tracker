import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { StyledInputFieldProps, InputProps } from './Input.types';

const StyledInputField = styled.input<StyledInputFieldProps>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing['0.5']} ${theme.spacing['0.5']}`};
  padding-right: 2.25rem; // leave space for password button

  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.body.text};

  background-color: ${({ theme }) => theme.colors.body.text}10;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, indicateError }) =>
    indicateError ? 'red' : theme.colors.body.border};
  border-radius: ${({ theme }) => theme.borderRadius.M};

  transition: background-color ${({ theme }) => theme.transition.duration.M}
      ease-in-out,
    border-color ${({ theme }) => theme.transition.duration.M} ease-in-out;

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.body.text}20;
    border-color: ${({ theme, indicateError }) =>
      indicateError ? 'red' : theme.colors.primary.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.body.text}80; // 80% opacity
  }

  ${({ type }) =>
    type === 'password' &&
    `
    letter-spacing: 0.125rem;
    &::placeholder {
      letter-spacing: 0;
    }
  `};
`;

export const InputField: FunctionComponent<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  autoFocus,
  disabled,
  required,
  inputMode,
  filter,
  options,
  indicateError,
}) => {
  function handleInputChange(value: string) {
    const numberRegex = /^[0-9]*$/;
    const decimalRegex = /^[0-9]*\.?[0-9]*$/;

    if (!filter) {
      if (options?.minLength && value.length < options.minLength) {
        return;
      } else if (options?.maxLength && value.length > options.maxLength) {
        return;
      }

      onChange(value);
      return;
    }

    switch (filter) {
      case 'number':
        if (options?.minNumber && Number(value) < options.minNumber) {
          return;
        } else if (options?.maxNumber && Number(value) > options.maxNumber) {
          return;
        }

        if (numberRegex.test(value)) {
          onChange(value);
        }
        break;
      case 'decimal':
        if (options?.minNumber && Number(value) < options.minNumber) {
          return;
        } else if (options?.maxNumber && Number(value) > options.maxNumber) {
          return;
        }

        if (decimalRegex.test(value)) {
          onChange(value);
        }
        break;
      default:
        break;
    }
  }

  return (
    <StyledInputField
      type={type}
      value={value}
      onChange={e => handleInputChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      disabled={disabled}
      required={required}
      inputMode={inputMode}
      indicateError={indicateError}
    />
  );
};
