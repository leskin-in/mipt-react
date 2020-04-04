import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import classnames from 'classnames/bind';

import NotesBody from '../Notes/Notes'
import ProjectsBody from '../Projects/Projects'

import reducer from '../../modules_redux/reducers'
import { actSetProject as aSP } from '../../modules_redux/actions'

import styles from './App.module.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const store = createStore(reducer);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  actSetProject: (projectId) => dispatch(aSP(projectId))
});

/* */


const Header = () => (
  <div id={cx("header")}>
    <div className={cx("title")}>
      <h1>lkeep</h1>
    </div>
  </div>
);


const Project = ({ match, actSetProject }) => {
  console.log(match)
  let projectId = match.params.projectId;
  actSetProject(projectId)

  return (
    <NotesBody />
  );
}

const ProjectConnected = connect(mapStateToProps, mapDispatchToProps)(Project);


/*
 * The application.
 *
 * In addition to holder functions, currently incapsulates some display logic.
 */
const App = () => (
  <BrowserRouter>
    <div id={cx("react-container")}>

      <Header />

      <Switch>
        <Route path='/projects/' component={ProjectsBody} />
        <Route path='/project/:projectId/' component={ProjectConnected} />
        <Redirect to='/projects/' />
      </Switch>

    </div>
  </BrowserRouter>
)

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


export default AppContainer;
