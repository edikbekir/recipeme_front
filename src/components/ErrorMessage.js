import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import userImage from 'assets/img/users/user.png';

const ErrorMessage = ({
  error
}) => {
  return (
    <div className="error-message">
      <span>{error}</span>
    </div>
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: null,
};

export default ErrorMessage;
