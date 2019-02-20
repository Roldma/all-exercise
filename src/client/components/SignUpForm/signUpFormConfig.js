const emailConfig = {
  required: true,
  name: 'email',
  type: 'text',
  placeholder: 'enter email adress',
  header: 'SIGN UP FOR THE TLC NEWSLETTER.',
  button: 'NEXT',
  className: 'form__email',
  bigText: 'Join the list',
};

const nameConfig = {
  required: true,
  name: ['firstName', 'lastName'],
  type: 'text',
  placeholder: ['First Name', 'Last Name'],
  header: 'ALMOST DONE! PLEASE ENTER YOUR FIRST AND LAST NAME.',
  button: 'SIGN UP',
  className: 'form__name',
  bigText: 'Join the list',
};

const agreement = {
  text:
    'I agree to recieve information from the discovery communications in accordance with the following Privacy policy',
  required: true,
  name: 'check',
};

const successConfig = {
  bigText: 'Congratulations!',
  header: 'Thank You For Signing Up!',
  note: 'Look out for the latest news on your favorite shows.',
};

const collectedInfo = {
  email: null,
  first: null,
  last: null,
};

const config = {
  emailConfig,
  nameConfig,
  agreement,
  collectedInfo,
  successConfig,
};

export default config;
