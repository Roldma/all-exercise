import React, { Component } from 'react';
import emailValidator from 'email-validator';

import Field from './Field.jsx';
import Agreement from './Agreement.jsx';
import Button from './Button.jsx';
import signUpPropTypes from './signUpFormPropTypes';
import './SignUpForm.scss';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.config = props.config;
    this.collectedInfo = props.config.collectedInfo;

    this.state = {
      emailInput: null,
      firstNameInput: null,
      lastNameInput: null,
      agreed: false,
      emailValid: false,
      nameValid: false,
      error: false,

      collectedInfo: {
        firstName: null,
        lastName: null,
        email: null,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.allFieldsValid = this.allFieldsValid.bind(this);
    this.inputIsValid = this.inputIsValid.bind(this);
  }

  componentDidUpdate() {
    if (this.allFieldsValid()) {
      const { collectedInfo } = this.state;
      const { firstName, lastName, email } = collectedInfo;
      console.log(this.state.collectedInfo);
      console.log(`email: ${email} first name:${firstName} last name:${lastName}`);
    }
  }

  /**
   * Checks field inputs within the state and validates with Regexp.
   * If input is valid, sets state for specific input to valid.
   *
   * returns - Boolean
   */
  inputIsValid() {
    const {
      firstNameInput, lastNameInput, emailInput, emailValid,
    } = this.state;

    let isValid;

    if (emailInput && !emailValid) {
      const { validate } = emailValidator;
      isValid = validate(emailInput);

      if (isValid) this.setState({ emailValid: true });
    }

    if (firstNameInput && lastNameInput) {
      const validName = /^[a-z ,.'-]+$/i;
      const fullName = `${firstNameInput} ${lastNameInput}`;

      isValid = validName.test(fullName);

      if (isValid) this.setState({ nameValid: true });
    }
    return isValid;
  }

  /**
   * Handles inputs and sets state depending on input types
   * @param {*} e - event
   * return - none, sets state.
   */
  handleInput(e) {
    const { name, value, type } = e.target;

    if (type === 'text') {
      const inputName = `${name}Input`;
      return this.setState({ [inputName]: value });
    }

    if (type === 'checkbox') {
      return this.setState({ agreed: e.target.checked });
    }
  }

  /**
   * Handles submission of form. Sets data collected in the state,
   * If inputs are invalid, sets error in state.
   * @param {*} e - event
   */
  handleSubmit(e) {
    e.preventDefault();

    if (this.inputIsValid()) {
      this.setState((state) => {
        const {
          emailValid,
          nameValid,
          collectedInfo,
          emailInput,
          firstNameInput,
          lastNameInput,
          agreed,
        } = state;

        const { email, firstName, lastName } = collectedInfo;
        const stateCopy = { ...state, collectedInfo: { ...state.collectedInfo } };

        if (emailValid && agreed && !email) {
          stateCopy.collectedInfo.email = emailInput;
          stateCopy.error = false;
        }

        if (nameValid && !firstName && !lastName) {
          stateCopy.collectedInfo.firstName = firstNameInput;
          stateCopy.collectedInfo.lastName = lastNameInput;
          stateCopy.error = false;
        }

        return stateCopy;
      });
    } else {
      return this.setState({ error: true });
    }
  }

  allFieldsValid() {
    const { emailValid, nameValid } = this.state;
    return emailValid && nameValid;
  }

  render() {
    const { config } = this.props;
    const { emailValid, nameValid, error } = this.state;
    const {
      emailConfig, nameConfig, agreement, successConfig,
    } = config;

    const bigText = emailValid && nameValid ? successConfig.bigText : emailConfig.bigText;

    //*  Sets header text above input fields, based on current state.
    const header = () => {
      let text;

      if (this.allFieldsValid()) {
        text = null;
      } else if (emailValid && !nameValid) {
        text = nameConfig.header;
      } else if (!emailValid && !nameValid) {
        text = emailConfig.header;
      }

      return text;
    };

    return (
      <div className="form form--background--purple">
        <form className="form__block" onSubmit={this.handleSubmit}>
          <div className="form__bigtext--green form__bigtext--position">{bigText}</div>
          <div className="form__header--blue form__header--blue--position ">{header()}</div>

          {/**  As long as both email and name have not been submitted,
           **  render input fields and buttons.
           **  Input fields and buttons are rendered according to props.
           **  Props are determined by state.
           */}
          {!this.allFieldsValid() && (
            <div className="form__field--position">
              <Field
                className={emailValid ? nameConfig.className : emailConfig.className}
                config={emailValid ? nameConfig : emailConfig}
                onChange={this.handleInput}
              />
              <span className="form__button--position">
                <Button
                  className="form__button"
                  type="submit"
                  text={emailValid ? nameConfig.button : emailConfig.button}
                />
              </span>
              {/**  Error msg rendered for invalid field information */}
              {error && (
                <div className="form__field-error">
                  Please fill in all fields with valid information.
                </div>
              )}
            </div>
          )}

          {/**  If email is invalid or not submitted yet, checkbox is rendered to UI */}
          {!emailValid ? (
            <div className="form__check form__check--position">
              <span className="check__box">
                <Agreement onChange={this.handleInput} required={agreement.required} />
              </span>
              <span className="form__check--text">{agreement.text}</span>
            </div>
          ) : null}

          {/**  If valid name and email have been submitted render success msg */}
          {this.allFieldsValid() && (
            <div className="success success__position">
              <div className="success__text success__text--bold ">{successConfig.header}</div>
              <div className="success__text success__text--skinny">{successConfig.note}</div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = signUpPropTypes;
export default SignUpForm;
