import React from 'react';
import PropTypes from 'prop-types';
import { Field, Flex } from '@strapi/design-system';

import { Editor } from './components/Editor';

const Input = ({
  name,
  attribute,
  value = '',
  labelAction = null,
  label,
  disabled = false,
  error = null,
  required = false,
  hint = '',
  placeholder,
}) => {
  const { preset, maxLengthCharacters, ...options } = attribute.options;

  return (
    <Field.Root
      name={name}
      id={name}
      error={error}
      hint={hint}
      required={required}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label action={labelAction}>{label}</Field.Label>
        <Editor
          disabled={disabled}
          name={name}
          value={value}
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

export default Input;
