import React from "react";
import PropTypes from "prop-types";
import nextId from "react-id-generator";
import { FormGroup, Select } from "nsw-ds-react";

const defHtmlId = nextId();

// you can set onChange in the NSW version of this component, so had to modify a bit

/**
 * The text group component
 *
 * @param  {string}  status           - Adds invalid state to form group
 * @param  {string}  statusText        - Text for error message
 * @param  {string}  label            - Text for label
 * @param  {string}  helper           - Text for helper
 * @param  {array}   options          - The options for the select, format: { value: '', text: '' }
 * @param  {string}  className        - An additional class, optional
 * @param  {object}  attributeOptions - Any other attribute options
 */
export const FormGroupSelect = ({
  status,
  selected,
  statusText,
  label,
  helper,
  options,
  htmlId,
  value,
  onChange,
}) => (
  <FormGroup status={status} statusText={statusText} label={label} helper={helper} htmlId={htmlId}>
    <Select options={options} selected={selected} value={value} onChange={onChange} />
  </FormGroup>
);

FormGroupSelect.propTypes = {
  status: PropTypes.oneOf(["valid", "invalid", "default"]),
  statusText: PropTypes.string,
  label: PropTypes.string,
  helper: PropTypes.string,
  selected: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  htmlId: PropTypes.string,
};

FormGroupSelect.defaultProps = {
  status: "default",
  htmlId: defHtmlId,
};
