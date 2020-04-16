import React from 'react';

import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { actChooseSort } from '../modules_redux/actions'

import NoteCreator from "./NoteCreator"

import styles from './App.module.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const mapStateToProps = state => ({
  notes: state.notes,
  notesSortType: state.notesSortType,
});

const mapDispatchToProps = dispatch => ({
  chooseSort_fn: (type) => dispatch(actChooseSort(type))
});

/* */


const NotesMenu = ({notesSortType, chooseSort_fn}) => (
  <div id={cx("left-panel")}>
    <div className={cx("sticky-container")}>
      <div className={cx("menu")}>
        <div className={cx("header")}>
          <Link to="/projects/">Projects</Link>
        </div>
      </div>
      <div className={cx("menu")}>
        <div className={cx("header")}>
          Sort order:
        </div>
        <div className={cx("status")}>{!notesSortType ? "NONE" : notesSortType}</div>
        <button value="name" onClick={e => chooseSort_fn('name')}>Sort by NAME</button>
        <button value="priority" onClick={e => chooseSort_fn('priority')}>Sort by PRIORITY</button>
      </div>
    </div>
  </div>
);


const Note = (passed) => (
  <div className={cx("note", `note-priority-${passed.note.priority}`)} key={passed.note.id}>
    <div className={cx("warning")}><span>N</span></div>
    <h1 className={cx("name")}>{passed.note.name}</h1>
    <p className={cx("description")}>{passed.note.description}</p>
  </div>
);

const Notes = ({notes}) => (
  <div id={cx("right-panel")}>
    <div id={cx("notes-container")}>
      {
        notes.map(note => (
          <Note note={note} key={note.id}/>
        ))
      }
    </div>

    <div id={cx("submit-container")}>
      <NoteCreator />
    </div>
  </div>
);


const NotesBody = ({notes, notesSortType, chooseSort_fn}) => (
  <div id={cx("body")}>
    <NotesMenu notesSortType={notesSortType} chooseSort_fn={chooseSort_fn} />
    <Notes notes={notes} />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(NotesBody);
