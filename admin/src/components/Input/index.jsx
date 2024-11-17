import React from 'react';
import PropTypes from 'prop-types';
import { Field, Flex } from '@strapi/design-system';
import { useField } from '@strapi/admin/strapi-admin';

import { Editor } from './components/Editor';

const Input = ({
  name,
  attribute,
  labelAction = null,
  label,
  disabled = false,
  required = false,
  hint = '',
  placeholder,
}) => {
  const { preset, maxLengthCharacters, ...options } = attribute.options;
  const field = useField(name);

  return (
    <Field.Root
      name={name}
      id={name}
      error={field.error}
      hint={hint}
      required={required}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label action={labelAction}>{label}</Field.Label>
        <Editor
          disabled={disabled}
          name={name}
          presetName={preset}
          maxLength={maxLengthCharacters}
          placeholder={placeholder}
        />
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  attribute: PropTypes.object.isRequired,
  value: PropTypes.string,
  labelAction: PropTypes.object,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  hint: PropTypes.string,
  placeholder: PropTypes.string,
};

const MemoizedInput = React.memo(Input);

export default MemoizedInput;