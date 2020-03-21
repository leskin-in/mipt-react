import React from 'react';

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import classnames from 'classnames/bind';

import { actSetSort as aSS } from '../../modules_redux/actions'
import reducer from '../../modules_redux/reducers';

import NoteCreator from "./NoteCreator"

import styles from './App.module.scss';
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
  <div id={cx("header")}>
    <div className={cx("title")}>
      <h1>lkeep</h1>
    </div>
  </div>
)

const Note = (passed) => (
  <div className={cx("note", `note-priority-${passed.note.priority}`)} key={passed.note.id}>
    <div className={cx("warning")}><span>N</span></div>
    <h1 className={cx("name")}>{passed.note.name}</h1>
    <p className={cx("description")}>{passed.note.description}</p>
  </div>
)

/*
 * The application.
 *
 * In addition to holder functions, currently incapsulates some display logic.
 */
const App = ({notes, actSetSort}) => {return (
  <div id={cx("react-container")}>

    <Header />

    <div id={cx("body")}>

      <div id={cx("left-panel")}>
        <div className={cx("sticky-container")}>
          <div className={cx("menu")}>
            <div className={cx("header")}>
              Sort order:
            </div>
            <div className={cx("status")}>{notes.sortType}</div>
            <button value="name" onClick={e => actSetSort('name')}>Sort by NAME</button>
            <button value="priority" onClick={e => actSetSort('priority')}>Sort by PRIORITY</button>
          </div>
        </div>
      </div>

      <div id={cx("right-panel")}>

        <div id={cx("notes-container")}>
        {
          notes.list.map(note => (
            <Note note={note} key={note.id}/>
          ))
        }
        </div>

        <div id={cx("submit-container")}>
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
