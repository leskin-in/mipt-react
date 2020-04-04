import React from 'react';

import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import NoteCreator from "./NoteCreator"

import { actSetSort as aSS } from '../../modules_redux/actions'

import styles from '../App/App.module.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const mapStateToProps = state => ({
  projectId: state.projectId,
  notes: state.projectData[state.projectId].notes,
});

const mapDispatchToProps = dispatch => ({
  actSetSort: (projectId, type) => dispatch(aSS(projectId, type))
});

/* */


const NotesMenu = ({projectId, notes, actSetSort}) => (
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
        <div className={cx("status")}>{notes.sortType}</div>
        <button value="name" onClick={e => actSetSort(projectId, 'name')}>Sort by NAME</button>
        <button value="priority" onClick={e => actSetSort(projectId, 'priority')}>Sort by PRIORITY</button>
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
        notes.list.map(note => (
          <Note note={note} key={note.id}/>
        ))
      }
    </div>

    <div id={cx("submit-container")}>
      <NoteCreator />
    </div>
  </div>
);


const NotesBody = ({projectId, notes, actSetSort}) => (
  <div id={cx("body")}>
    <NotesMenu projectId={projectId} notes={notes} actSetSort={actSetSort} />
    <Notes notes={notes} />
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(NotesBody);
