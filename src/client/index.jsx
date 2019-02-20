import React from 'react';
import ReactDOM from 'react-dom';

import SignUpForm from './components/SignUpForm/SignUpForm.jsx';
import signUpFormConfig from './components/SignUpForm/signUpFormConfig.js';

ReactDOM.render(<SignUpForm config={signUpFormConfig} />, document.getElementById('content'));
