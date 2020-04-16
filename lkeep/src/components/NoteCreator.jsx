import React from 'react';

import { connect } from "react-redux";
import classnames from 'classnames/bind';

import { actModifyNoteToCreate, actCreateNote } from '../modules_redux/actions'

import styles from './App.module.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const mapStateToProps = state => ({
  projectId: state.projectId,
  noteToCreate: state.noteToCreate,
});

const mapDispatchToProps = dispatch => ({
  modifyNoteToCreate_fn: (key, value) => dispatch(actModifyNoteToCreate(key, value)),
  createNote_fn: (projectId, name, description, priority) => dispatch(actCreateNote(dispatch, projectId, name, description, priority)),
});

/* */


const NoteCreator = ({projectId, noteToCreate, modifyNoteToCreate_fn, createNote_fn}) => (
  <div className={cx("note", `note-priority-${noteToCreate.priority}`)}>
    <form onSubmit={event => {
      event.preventDefault();
      return createNote_fn(projectId, noteToCreate.name, noteToCreate.description, noteToCreate.priority)
    }}>
      <div className={cx("note-create-button")}>
        <input className={cx("note-create-button")} type="submit" value="Create a note"/>
      </div>
      <input
        className={cx("name")}
        type="text" name="name" id={cx("create-name")}
        value={noteToCreate.name}
        onChange={e => modifyNoteToCreate_fn(
          e.target.name, e.target.value
        )}
      />
      <textarea
        className={cx("description")}
        name="description" id={cx("create-description")} cols="30" rows="10"
        value={noteToCreate.description}
        onChange={e => modifyNoteToCreate_fn(
          e.target.name, e.target.value
        )}
      />
      <div className={cx("priority-selector")}>
        <div>Priority:</div>
        <div>
          <input
            type="radio" name="priority" id={cx("create-priority-1")}
            value="1" checked={noteToCreate.priority === 1}
            onChange={e => modifyNoteToCreate_fn(
              e.target.name, parseInt(e.target.value)
            )}
          />
          <label htmlFor="create-priority-1">1</label>
          <input
            type="radio" name="priority" id={cx("create-priority-2")}
            value="2" checked={noteToCreate.priority === 2}
            onChange={e => modifyNoteToCreate_fn(
              e.target.name, parseInt(e.target.value)
            )}
          />
          <label htmlFor="create-priority-2">2</label>
          <input
            type="radio" name="priority" id={cx("create-priority-3")}
            value="3" checked={noteToCreate.priority === 3}
            onChange={e => modifyNoteToCreate_fn(
              e.target.name, parseInt(e.target.value)
            )}
          />
          <label htmlFor="create-priority-3">3</label>
        </div>
      </div>
    </form>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreator);
