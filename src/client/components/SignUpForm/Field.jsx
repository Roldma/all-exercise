import React from 'react';
import PropTypes from 'prop-types';

const Field = (props) => {
  const {
    config, onChange, className, onError,
  } = props;
  const {
    required, name, type, placeholder,
  } = config;

  let ele = <input type="text" />;

  if (Array.isArray(name) && name[0] === 'firstName' && name[1] === 'lastName') {
    ele = (
      <span className="form__name-position">
        <input
          className={onError ? `${className} ${className}-onError` : `${className}`}
          type={type}
          name={name[0]}
          placeholder={placeholder[0]}
          onChange={onChange}
          required={required}
        />
        <input
          className={onError ? `${className} ${className}-onError` : `${className}`}
          type={type}
          name={name[1]}
          placeholder={placeholder[1]}
          onChange={onChange}
          required={required}
        />
      </span>
    );
  }

  if (name === 'email') {
    ele = (
      <input
        className={onError ? `${className} ${className}-onError` : `${className}`}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    );
  }

  return ele;
};

const {
  bool, string, func, arrayOf, oneOfType,
} = PropTypes;

Field.propTypes = {
  config: PropTypes.shape({
    required: bool,
    name: oneOfType([string, arrayOf(string)]),
    type: string,
    placeholder: oneOfType([string, arrayOf(string)]),
    header: string,
  }),
  onChange: func.isRequired,
  onError: bool,
  className: string,
};

export default Field;
