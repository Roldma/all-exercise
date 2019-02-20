import PropTypes from 'prop-types';

export default {
  config: PropTypes.shape({
    emailConfig: PropTypes.object,
    nameConfig: PropTypes.object,
    agreement: PropTypes.object,
    collectedInfo: PropTypes.object,
    successConfig: PropTypes.object,
  }),
};
