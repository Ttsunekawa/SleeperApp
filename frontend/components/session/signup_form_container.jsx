import React from 'react';
import { connect } from 'react-redux';
import { signup, clearErrors } from '../../actions/session_actions';
import { Link } from 'react-router-dom';

import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.sessionErrors,
  formType: 'Sign Up',
  navLink: <Link className="right-header-action" to="/login">Login</Link>,
  onboardText: "Let's get started by creating an account",
  emailPlace: "Enter email",
  passwordPlace: "Set a password"
  
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: user => dispatch(signup(user)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);