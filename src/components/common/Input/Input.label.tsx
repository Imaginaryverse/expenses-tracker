import { Text } from '../Text/Text';
import { FunctionComponent } from 'react';
import { InputLabelProps } from './Input.types';

export const InputLabel: FunctionComponent<InputLabelProps> = ({
  children,
}) => {
  return (
    <Text
      variant='label'
      fontWeight='bold'
      margin={{
        bottom: '0.25rem',
        left: '0.25rem',
      }}
    >
      {children}
    </Text>
  );
};
