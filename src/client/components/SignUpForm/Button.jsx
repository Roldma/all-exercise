import React from 'react';
import Proptypes from 'prop-types';

const Button = (props) => {
  const { text, type, className } = props;

  if (type === 'submit') {
    return <input className={className} type="submit" value={text} />;
  }

  if (type === 'button') {
    return (
      <button className={className} type="button">
        {text}
      </button>
    );
  }
};

Button.propTypes = {
  text: Proptypes.string,
  type: Proptypes.string,
  className: Proptypes.string,
};
export default Button;
