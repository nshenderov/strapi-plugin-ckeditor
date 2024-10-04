import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
} from '@strapi/design-system';
import { Stack } from '@strapi/design-system';

import { Editor } from './components/Editor';

const Wysiwyg = ({
  name,
  attribute,
  onChange,
  value,
  intlLabel,
  labelAction,
  disabled,
  error,
  description,
  required,
  placeholder,
}) => {
  const { formatMessage } = useIntl();
  const { preset, maxLengthCharacters, ...options } = attribute.options;

  return (
    <Field
      name={name}
      id={name}
      error={error}
      required={required}
      hint={description && formatMessage(description)}
    >
      <Stack spacing={1}>
        <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
        <Editor
          disabled={disabled}
          name={name}
          onChange={onChange}
          value={value}
          presetName={preset}
          maxLength={maxLengthCharacters}
          placeholder={placeholder}
        />
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

Wysiwyg.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.object,
};

const MemoizedWysiwyg = React.memo(Wysiwyg);

export default MemoizedWysiwyg;