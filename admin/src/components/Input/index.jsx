import React from 'react';

import PropTypes from 'prop-types';

import { CKEditor } from './CKEditor';
import { useIntl } from 'react-intl';
import { Field, Flex } from '@strapi/design-system';

export const Input = ({ name, attribute, value, labelAction, disabled, error, required, hint }) => {
  const { formatMessage } = useIntl();
  const { preset, maxLengthCharacters, ...options } = attribute.options;

  return (
    <Field.Root name={name} id={name} error={error} hint={hint}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label action={labelAction} required={required}>
          {formatMessage({
            id: 'plugin.ckeditor.label',
            defaultMessage: 'CKEditor',
          })}
        </Field.Label>
        <CKEditor
          disabled={disabled}
          name={name}
          value={value}
          preset={preset}
          maxLength={maxLengthCharacters}
        />
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

Input.defaultProps = {
  hint: '',
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: '',
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
