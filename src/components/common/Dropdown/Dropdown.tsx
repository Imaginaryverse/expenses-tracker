import { FunctionComponent, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { InputLabel } from '../Input/Input.label';
import { useOutsideClick, useKeyDown } from '../../hooks';
import { Icon } from '../Icon/Icon';
import { disabledStyle } from '@src/style/css';
import { StyledDropdownContainerProps, DropdownProps } from './Dropdown.types';
import { DropdownInputBtn } from './Dropdown.inputBtn';
import { DropdownOptionsList } from './Dropdown.optionsList';
import { DropdownOptionsListItem } from './Dropdown.optionsListItem';

const StyledDropdownContainer = styled.div<StyledDropdownContainerProps>`
  position: relative;
  width: ${({ customStyle }) => customStyle?.width || '100%'};
  max-width: ${({ customStyle }) => customStyle?.maxWidth || '280px'};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  ${({ disabled }) => disabled && disabledStyle}
`;

const StyledDropdownInputBtnWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Dropdown: FunctionComponent<DropdownProps> = ({
  label,
  selectedOptionIdx,
  options,
  onChange,
  placeholder = '',
  disabled,
  allowClear,
  customStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = useCallback(
    (idx: number) => {
      onChange(idx);
      setIsOpen(false);
    },
    [onChange, setIsOpen]
  );

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();

      setIsOpen(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
      }

      if (selectedOptionIdx === -1) {
        onChange(0);
        return;
      } else if (selectedOptionIdx < options.length - 1) {
        onChange(selectedOptionIdx + 1);
        return;
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (!isOpen) {
        setIsOpen(true);
      }

      if (selectedOptionIdx === -1) {
        onChange(options.length - 1);
        return;
      } else if (selectedOptionIdx > 0) {
        onChange(selectedOptionIdx - 1);
        return;
      }
    }
  };

  useKeyDown(dropdownRef, handleKeyDown);
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <StyledDropdownContainer
      ref={dropdownRef}
      disabled={disabled}
      customStyle={customStyle}
    >
      {!!label && <InputLabel>{label}</InputLabel>}
      <StyledDropdownInputBtnWrapper>
        <DropdownInputBtn
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          isOpen={isOpen}
          showPlaceholder={selectedOptionIdx === -1}
        >
          {selectedOptionIdx === -1 ? placeholder : options[selectedOptionIdx]}

          <Icon
            icon={allowClear && selectedOptionIdx !== -1 ? 'x' : 'chevron-down'}
            onClick={() => {
              if (allowClear && selectedOptionIdx !== -1) {
                handleOptionClick(-1);
                return;
              }

              setIsOpen(!isOpen);
            }}
            stopPropagation={selectedOptionIdx !== -1}
          />
        </DropdownInputBtn>
      </StyledDropdownInputBtnWrapper>
      {isOpen && (
        <DropdownOptionsList>
          {options.map((option, idx) => (
            <DropdownOptionsListItem
              key={option}
              onClick={() => handleOptionClick(idx)}
              selected={idx === selectedOptionIdx}
            >
              {option}
            </DropdownOptionsListItem>
          ))}
        </DropdownOptionsList>
      )}
    </StyledDropdownContainer>
  );
};
