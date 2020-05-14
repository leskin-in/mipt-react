import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import classnames from 'classnames/bind';

import { actSigninFormModify, actLogin, actRegister, actLogout } from '../modules_redux/actions'
import { retrieveToken } from '../utilities/token'

import styles from './App.module.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const mapStateToProps = state => ({
  signin: state.signin,
});

const mapDispatchToProps = dispatch => ({
  login_fn: (login, password) => dispatch(actLogin(dispatch, login, password)),
  logout_fn: () => dispatch(actLogout()),
  register_fn: (login, password) => dispatch(actRegister(dispatch, login, password)),
  signinFormModify_fn: (key, value) => dispatch(actSigninFormModify(key, value)),
});

/* */


/* Signin */

const SigninButton = ({signin, signin_fn, name}) => (
  <form onSubmit={event => {
    event.preventDefault();
    return signin_fn(signin.login, signin.password)
  }}>
    <div className={cx("button")}>
      <input type="submit" value={name}/>
    </div>
  </form>
)

SigninButton.propTypes = {
  signin: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }),
  signin_fn: PropTypes.func,
  name: PropTypes.string
}


const SigninDataForm = ({signin, login_fn, register_fn, signinFormModify_fn}) => (
  <div className={cx("note", "project")}>
    <form onSubmit={event => {
      event.preventDefault();
    }}>
      <label htmlFor="login">Login:</label>
      <input
        className={cx("name")}
        type="text" name="login" id={cx("create-name")}
        value={signin.login}
        onChange={e => signinFormModify_fn(
          'login', e.target.value,
        )}
      />
      <label htmlFor="password">Password:</label>
      <input
        className={cx("name")}
        type="password" name="password" id={cx("create-name")}
        value={signin.password}
        onChange={e => signinFormModify_fn(
          'password', e.target.value,
        )}
      />
    </form>
    <div className={cx("alignable-buttons")}>
      <SigninButton signin={signin} signin_fn={login_fn} name='Login' />
      <SigninButton signin={signin} signin_fn={register_fn} name='Register' />
    </div>
  </div>
)

SigninDataForm.propTypes = {
  signin: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }),
  login_fn: PropTypes.func,
  register_fn: PropTypes.func,
  signinFormModify_fn: PropTypes.func
}


const LogoutButtonForm = ({logout_fn}) => (
  <div className={cx("note", "project")}>
    <form onSubmit={event => {
      event.preventDefault();
      return logout_fn()
    }}>
      <div className={cx("alignable-buttons")}>
        <div className={cx("button")}>
          <input type="submit" value='Logout'/>
        </div>
      </div>
    </form>
  </div>
)

LogoutButtonForm.propTypes = {
  logout_fn: PropTypes.func
}


const SigninContent = ({signin, signinFormModify_fn, login_fn, logout_fn, register_fn}) => (
  <div id={cx("right-panel")}>
      {retrieveToken() ?
        (
          <div id={cx("submit-container")}>
            <LogoutButtonForm logout_fn={logout_fn} signin={signin}/>
          </div>
        ) : (
          <div id={cx("submit-container")}>
            <SigninDataForm signin={signin} login_fn={login_fn} register_fn={register_fn} signinFormModify_fn={signinFormModify_fn} />
          </div>
        )
      }
  </div>
)

SigninContent.propTypes = {
  signin: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }),
  signinFormModify_fn: PropTypes.func,
  login_fn: PropTypes.func,
  logout_fn: PropTypes.func,
  register_fn: PropTypes.func,
}


const SigninBody = ({signin, login_fn, logout_fn, register_fn, signinFormModify_fn}) => (
  <div id={cx("body")}>
    <SigninContent signin={signin} signinFormModify_fn={signinFormModify_fn} login_fn={login_fn} logout_fn={logout_fn} register_fn={register_fn} />
  </div>
)

SigninContent.propTypes = {
  signin: PropTypes.shape({
    login: PropTypes.string,
    password: PropTypes.string
  }),
  login_fn: PropTypes.func,
  logout_fn: PropTypes.func,
  register_fn: PropTypes.func,
  signinFormModify_fn: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninBody)
