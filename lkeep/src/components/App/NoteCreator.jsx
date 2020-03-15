import React from 'react';

import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames/bind';

import { actModifyNoteToAdd as aMNTA, actAddNote as aAN } from '../../modules_redux/actions'

import './App.scss'
import styles from './App.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const mapStateToProps = state => ({
  noteToCreate: state.noteToCreate
});

const mapDispatchToProps = dispatch => ({
  actModifyNoteToAdd: (name, description, priority) => dispatch(aMNTA(name, description, priority)),
  actAddNote: (id, name, description, priority) => dispatch(aAN(id, name, description, priority))
});

/* */


const NoteCreator = ({noteToCreate, actAddNote, actModifyNoteToAdd}) => {return (
  <div className={cx("note", `note-priority-${noteToCreate.priority}`)}>
    <form onSubmit={event => {
      event.preventDefault();
      return actAddNote(uuidv4(), noteToCreate.name, noteToCreate.description, noteToCreate.priority)
    }}>
      <div className="note-create-button">
        <input className="note-create-button" type="submit" value="Create a note"/>
      </div>
      <input
        className="name"
        type="text" name="name" id="create-name"
        value={noteToCreate.name}
        onChange={e => actModifyNoteToAdd(
          e.target.value, null, null,
        )}
      />
      <textarea
        className="description"
        name="description" id="create-description" cols="30" rows="10"
        value={noteToCreate.description}
        onChange={e => actModifyNoteToAdd(
          null, e.target.value, null
        )}
      />
      <div className="priority-selector">
        <div>Priority:</div>
        <div>
          <input
            type="radio" name="priority" id="create-priority-1"
            value="1" checked={noteToCreate.priority === 1}
            onChange={e => actModifyNoteToAdd(
              null, null, parseInt(e.target.value)
            )}
          />
          <label htmlFor="create-priority-1">1</label>
          <input
            type="radio" name="priority" id="create-priority-2"
            value="2" checked={noteToCreate.priority === 2}
            onChange={e => actModifyNoteToAdd(
              null, null, parseInt(e.target.value)
            )}
          />
          <label htmlFor="create-priority-2">2</label>
          <input
            type="radio" name="priority" id="create-priority-3"
            value="3" checked={noteToCreate.priority === 3}
            onChange={e => actModifyNoteToAdd(
              null, null, parseInt(e.target.value)
            )}
          />
          <label htmlFor="create-priority-3">3</label>
        </div>
      </div>
    </form>
  </div>
)}


export default connect(mapStateToProps, mapDispatchToProps)(NoteCreator);
