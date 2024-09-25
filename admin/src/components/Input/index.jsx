import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Field, Flex } from '@strapi/design-system';

import { Editor } from './components/Editor';

const Input = ({
  name,
  attribute,
  value = '',
  labelAction = null,
  disabled = false,
  error = null,
  required = false,
  hint = '',
  intlLabel
}) => {
  const { formatMessage } = useIntl();
  const { preset, maxLengthCharacters, ...options } = attribute.options;

  return (
    <Field.Root name={name} id={name} error={error} hint={hint}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label action={labelAction} required={required}>
          {intlLabel ? formatMessage(intlLabel) : name}
        </Field.Label>
        <Editor
          disabled={disabled}
          name={name}
          value={value}
          presetName={preset}
          maxLength={maxLengthCharacters}
        />
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

Input.propTypes = {
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Input;