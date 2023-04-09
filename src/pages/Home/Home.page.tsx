import { Button, Text } from '@src/components/common';
import { ConfirmModal } from '@src/components/common/ConfirmModal/ConfirmModal';
import React from 'react';
import { FunctionComponent, useState } from 'react';

export const HomePage: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Text variant='h1'>Home</Text>

      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      {isOpen && (
        <ConfirmModal
          title='Are you sure?'
          description={[
            'You are about to delete this item. This action cannot be undone.',
          ]}
          requiredInput={'confirm'}
          inputPlaceholder='Type "confirm" to proceed'
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </React.Fragment>
  );
};
