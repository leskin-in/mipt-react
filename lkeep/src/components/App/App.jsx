import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames/bind';

import './App.scss'
import styles from './App.scss';
const cx = classnames.bind(styles)


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

class App extends React.Component {
  _noteToCreate_clear = {
    name: '',
    description: '',
    priority: 3,
  };

  constructor(props) {
    super(props);

    this.state = {
      notes: {
        sortType: 'none',
        list: [
          {
            id: '1a5a5e52e-a449-4f39-8311-24fa59f9cd6b',
            name: 'C. A note with name "C"',
            description: 'Note C description (priority 2)',
            priority: 2
          },
          {
            id: 'a9fb86f2-01b3-4634-9569-9051f52ef171',
            name: 'B. A note with name "B"',
            description: 'Note B description (priority 1)',
            priority: 1
          },
          {
            id: '33cb6419-d72f-44a1-b2f6-13a8101441af',
            name: 'A. A note with name "A"',
            description: 'Note A description (priority 3). Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            priority: 3
          }
        ],
      },

      noteToCreate: {
        ...this._noteToCreate_clear,
      },
    };
  }

  /* Display notes */

  chooseNotesSort = event => {
    let notes = Object.assign({}, this.state.notes);

    notes.sortType = event.target.value;

    this.setState(
      {
        notes: notes
      },
      this.sortNotes
    );
  };

  sortNotes() {
    let notes = Object.assign({}, this.state.notes);

    switch (notes.sortType) {
      case 'name':
        notes.list.sort((noteA, noteB) => {
          return noteA.name.localeCompare(noteB.name);
        });
        break;
      case 'priority':
        notes.list.sort((noteA, noteB) => {
          return noteA.priority - noteB.priority;
        });
        break;
      default:
        return;
    }

    this.setState({
      notes: notes
    });
  }

  /* Note creation */

  createNoteSetName = event => {
    let noteTC = Object.assign({}, this.state.noteToCreate);

    noteTC.name = event.target.value;

    this.setState({
      noteToCreate: noteTC
    });
  };

  createNoteSetDescription = event => {
    let noteTC = Object.assign({}, this.state.noteToCreate);

    noteTC.description = event.target.value;

    this.setState({
      noteToCreate: noteTC
    });
  };

  createNoteSetPriority = event => {
    let noteTC = Object.assign({}, this.state.noteToCreate);

    noteTC.priority = parseInt(event.target.value);

    this.setState({
      noteToCreate: noteTC
    });
  };

  createNote = event => {
    event.preventDefault();

    let noteN = Object.assign({}, this.state.noteToCreate);
    noteN.id = uuidv4();
    this.setState({
      noteToCreate: {
        ...this._noteToCreate_clear
      }
    });

    let notes = Object.assign({}, this.state.notes);
    notes.list.push(noteN);
    this.setState(
      {
        notes: notes
      },
      this.sortNotes
    );
  };

  /* Render */

  render() {
    return (
      <div id="react-container">

        <Header />

        <div id="body">

          <div id="left-panel">
            <div className="sticky-container">
              <div className="menu">
                <div className="header">
                  Sort order:
                </div>
                <div className="status">{this.state.notes.sortType}</div>
                <button value="name" onClick={this.chooseNotesSort}>Sort by NAME</button>
                <button value="priority" onClick={this.chooseNotesSort}>Sort by PRIORITY</button>
              </div>
            </div>
          </div>

          <div id="right-panel">
            <div id="notes-container">
            {
              this.state.notes.list.map(note => (
                <Note note={note}/>
              ))
            }
            </div>

            <div id="submit-container">

              <div className={cx("note", `note-priority-${this.state.noteToCreate.priority}`)}>
                <form onSubmit={this.createNote}>
                  <div className="note-create-button">
                    <input className="note-create-button" type="submit" value="Create a note"/>
                  </div>
                  <input
                    className="name"
                    type="text" name="name" id="create-name"
                    value={this.state.noteToCreate.name} onChange={this.createNoteSetName}
                  />
                  <textarea
                    className="description"
                    name="description" id="create-description" cols="30" rows="10"
                    value={this.state.noteToCreate.description} onChange={this.createNoteSetDescription}
                  />
                  <div className="priority-selector">
                    <div>Priority:</div>
                    <div>
                      <input
                        type="radio" name="priority" id="create-priority-1"
                        value="1" onChange={this.createNoteSetPriority} checked={this.state.noteToCreate.priority === 1}
                      />
                      <label htmlFor="create-priority-1">1</label>
                      <input
                        type="radio" name="priority" id="create-priority-2"
                        value="2" onChange={this.createNoteSetPriority} checked={this.state.noteToCreate.priority === 2}
                      />
                      <label htmlFor="create-priority-2">2</label>
                      <input
                        type="radio" name="priority" id="create-priority-3"
                        value="3" onChange={this.createNoteSetPriority} checked={this.state.noteToCreate.priority === 3}
                      />
                      <label htmlFor="create-priority-3">3</label>
                    </div>
                  </div>
                </form>
              </div>

            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
