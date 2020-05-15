import React from 'react'

import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { createStore } from "redux"
import { Provider, connect } from "react-redux"
import classnames from 'classnames/bind'

import backendApiRequest from '../utilities/backend'

import reducer from '../modules_redux/reducers'
import { actChooseProject, actSetProjects } from '../modules_redux/actions'

import NotesBody from './Notes'
import ProjectsBody from './Projects'
import SigninBody from './Signin'

import styles from './App.module.scss'
import { retrieveToken } from '../utilities/token'
const cx = classnames.bind(styles)


/* Redux integration app-wide */

const store = createStore(reducer);

/* */


/*
 * We define various URL-specific wrapper objects here.
 * They call various backend methods for data retrieval, and then the component
 * is rendered.
 * We have to use these wrapper objects to divide data retrieval and component
 * rendering. This, in turn, is caused by Redux events model.
 */

const Header = () => (
  <div id={cx("header")}>
    <div className={cx("title")}>
      <Link to="/"><h1>lkeep</h1></Link>
    </div>
  </div>
);


const NotesWrapperObject = ({ match, chooseProject_fn }) => {
  chooseProject_fn(match.params.projectId)
  return (
    <NotesBody />
  );
}

const NotesWrapper = connect(
  (state) => ({}),
  (dispatch) => ({
    chooseProject_fn: (projectId) => dispatch(actChooseProject(dispatch, projectId))
  })
)(NotesWrapperObject);


const ProjectsWrapperObject = ({ setProjects_fn }) => {
  backendApiRequest(`/projects/`).then(
    res => setProjects_fn(res)
  )
  return (
    <ProjectsBody />
  )
}

const ProjectsWrapper = connect(
  (state) => ({}),
  (dispatch) => ({
    setProjects_fn: (projects) => dispatch(actSetProjects(projects))
  })
)(ProjectsWrapperObject)


const AppSigninSwitch = ({ signin }) => (
  <Switch>
    <Route path='/signin/' component={SigninBody} />
    {retrieveToken() ?
      (
        <Switch>
          <Route path='/projects/' component={ProjectsWrapper} />
          <Route path='/project/:projectId/' component={NotesWrapper} />
          <Redirect to='/projects/' />
        </Switch>
      ) : (
        <Redirect to='/signin/' />
      )
    }
  </Switch>
)

const AppSigninSwitchConnected = connect(
  (state) => ({
    signin: state.signin,
  }),
  (dispatch) => ({})
)(AppSigninSwitch)


/*
 * The application "main render object".
 */
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div id={cx("react-container")}>

        <Header />
        <AppSigninSwitchConnected />
        
      </div>
    </BrowserRouter>
  </Provider>
)

export default App;
