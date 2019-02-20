import React from 'react';
import Proptypes from 'prop-types';

const Agreement = (props) => {
  const { required, onChange } = props;
  return <input type="checkbox" required={required} onChange={onChange} />;
};

Agreement.propTypes = {
  required: Proptypes.bool,
};
Agreement.defaultProps = {
  required: true,
};
export default Agreement;
