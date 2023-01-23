import React from "react";
import PropTypes from "prop-types";
import {default as CKEditor} from "./CKEditor";
import { useIntl } from "react-intl";
import { Field, FieldHint, FieldError, FieldLabel } from "@strapi/design-system/Field";
import { Stack } from "@strapi/design-system/Stack";

const Wysiwyg = ({ name, attribute, onChange, value, intlLabel, labelAction, disabled, error, description, required }) => {
  const { formatMessage } = useIntl();
  const { preset, maxLengthCharacters, ...options } = attribute.options;
  
  return (
    <Field name={name} id={name} error={error} hint={description && formatMessage(description)}>
      <Stack spacing={1}>
        <FieldLabel action={labelAction} required={required}>
          {formatMessage(intlLabel)}
        </FieldLabel>
          <CKEditor disabled={disabled} name={name} onChange={onChange} value={value} preset={preset} maxLength={maxLengthCharacters}/>
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};


Wysiwyg.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: "",
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
};
export default Wysiwyg;