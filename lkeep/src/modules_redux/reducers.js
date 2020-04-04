/*
 * Redux reducers definitions
 */

import { ACT_SET_SORT, ACT_ADD_NOTE, ACT_MODIFY_NOTE_TO_ADD } from "./actions";


/* Default state definition */

const _defaultState_noteToCreate_clear = {
  name: '',
  description: '',
  priority: 3,
}

const defaultState = {
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
    ..._defaultState_noteToCreate_clear,
  },
};


/* The reducer */

const reducer = (state = defaultState, action) => {
  console.log('Reducer called', 'State:', state, 'Action: ', action)

  // Check the given action is valid
  switch (action.type) {
    case ACT_MODIFY_NOTE_TO_ADD:
    case ACT_ADD_NOTE:
    case ACT_SET_SORT:
      break;
    default:
      console.warn('Unknown action:', action)
      return state;
  }

  // The action is valid. Form a new state
  let new_state = {
    ...state
  };
  // A flag to signal the 'new_state.notes' was changed and needs sorting
  let sort_required = false;

  if (action.type === ACT_MODIFY_NOTE_TO_ADD) {
    new_state.noteToCreate = {
      ...state.noteToCreate
    }

    if (action.payload.name != null) {
      new_state.noteToCreate.name = action.payload.name;
    }
    if (action.payload.description != null) {
      new_state.noteToCreate.description = action.payload.description;
    }
    if (action.payload.priority != null) {
      new_state.noteToCreate.priority = action.payload.priority;
    }
  }

  if (action.type === ACT_ADD_NOTE) {
    new_state.notes = {
      ...state.notes
    }
    new_state.notes.list = [...state.notes.list]

    sort_required = true;
    new_state.notes.list.push(action.payload);

    new_state.noteToCreate = {
      ..._defaultState_noteToCreate_clear
    }
  }

  if (action.type === ACT_SET_SORT) {
    new_state.notes = {
      ...state.notes
    }
    new_state.notes.list = [...state.notes.list]

    sort_required = true;
    new_state.notes.sortType = action.payload.sort;
  }

  // Sort nodes
  if (sort_required) {
    switch (new_state.notes.sortType) {
      case 'name':
        new_state.notes.list.sort((noteA, noteB) => {
          return noteA.name.localeCompare(noteB.name);
        })
        break;
      case 'priority':
        new_state.notes.list.sort((noteA, noteB) => {
          return noteA.priority - noteB.priority;
        });
        break;
      default:
        console.warn('Unknown sort type:', new_state.notes.sortType)
    }
  }

  console.debug('State after reducer: ', new_state)

  // Return the modified state
  return new_state;
};

export default reducer;
