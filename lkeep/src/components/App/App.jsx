import React from 'react';

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import classnames from 'classnames/bind';

import { actSetSort as aSS } from '../../modules_redux/actions'
import reducer from '../../modules_redux/reducers';

import NoteCreator from "./NoteCreator"

import './App.scss'
import styles from './App.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const store = createStore(reducer);

const mapStateToProps = state => ({
  notes: state.notes
});

const mapDispatchToProps = dispatch => ({
  actSetSort: (type) => dispatch(aSS(type))
});

/* */


const Header = () => (
  <div id="header">
    <div className="title">
      <h1>lkeep</h1>
    </div>
  </div>
)

const Note = (passed) => (
  <div className={cx("note", `note-priority-${passed.note.priority}`)} key={passed.note.id}>
    <div className="warning"><span>N</span></div>
    <h1 className="name">{passed.note.name}</h1>
    <p className="description">{passed.note.description}</p>
  </div>
)

/*
 * The application.
 *
 * In addition to holder functions, currently incapsulates some display logic.
 */
const App = ({notes, actSetSort}) => {return (
  <div id="react-container">

    <Header />

    <div id="body">

      <div id="left-panel">
        <div className="sticky-container">
          <div className="menu">
            <div className="header">
              Sort order:
            </div>
            <div className="status">{notes.sortType}</div>
            <button value="name" onClick={e => actSetSort('name')}>Sort by NAME</button>
            <button value="priority" onClick={e => actSetSort('priority')}>Sort by PRIORITY</button>
          </div>
        </div>
      </div>

      <div id="right-panel">

        <div id="notes-container">
        {
          notes.list.map(note => (
            <Note note={note} key={note.id}/>
          ))
        }
        </div>

        <div id="submit-container">
          <NoteCreator />
        </div>

      </div>
    </div>

  </div>
)}


/* Redux integration */

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const AppContainer = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);


export default AppContainer;
