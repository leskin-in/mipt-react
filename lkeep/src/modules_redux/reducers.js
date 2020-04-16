/*
 * Redux reducers definitions
 */

import {
  ACT_SET_PROJECTS, ACT_CHOOSE_PROJECT, ACT_CREATE_PROJECT, ACT_MODIFY_PROJECT_TO_CREATE,
  ACT_SET_NOTES, ACT_CHOOSE_SORT, ACT_CREATE_NOTE, ACT_MODIFY_NOTE_TO_CREATE
} from "./actions";


/* Default state definition */

const _defaultState_projectToCreate_clear = {
  name: '',
}

const _defaultState_noteToCreate_clear = {
  name: '',
  description: '',
  priority: 3,
}

const defaultState = {
  // 'projects': A list of all projects
  projects: [],
  // 'projects': A project to create
  projectToCreate: {
    ..._defaultState_projectToCreate_clear,
  },

  // 'notes': The current project ID
  projectId: null,
  // 'notes': A list of tasks of the selected project
  notes: [],
  // 'notes': sort type of tasks list
  notesSortType: null,
  // 'notes': a task to create. Intentionally the same for all projects
  noteToCreate: {
    ..._defaultState_noteToCreate_clear,
  },
};


/* The reducer */

const reducer = (state = defaultState, action) => {
  console.debug('Reducer called.\n', 'State:\n', state, 'Action:\n', action)

  // Check the given action is valid
  switch (action.type) {
    case ACT_SET_PROJECTS:
    case ACT_CHOOSE_PROJECT:
    case ACT_CREATE_PROJECT:
    case ACT_MODIFY_PROJECT_TO_CREATE:
    case ACT_SET_NOTES:
    case ACT_CHOOSE_SORT:
    case ACT_CREATE_NOTE:
    case ACT_MODIFY_NOTE_TO_CREATE:

      break;

    default:
      console.warn('Unknown action:\n', action)
      return state;
  }

  console.log('Action:\n', action)

  // The action is valid. Form a new state
  let new_state = {
    ...state
  };

  /* 'projects' */

  if (action.type === ACT_SET_PROJECTS) {
    new_state.projects = [...action.payload.projects]
    return new_state;
  }

  if (action.type === ACT_CHOOSE_PROJECT) {
    new_state.projectId = action.payload.projectId
    return new_state;
  }

  if (action.type === ACT_CREATE_PROJECT) {
    new_state.projectToCreate = {
      ..._defaultState_projectToCreate_clear
    }
    return new_state;
  }

  if (action.type === ACT_MODIFY_PROJECT_TO_CREATE) {
    new_state.projectToCreate = {
      ...state.projectToCreate
    };
    new_state.projectToCreate[action.payload.key] = action.payload.value;
    return new_state;
  }

  /* 'notes' */

  if ([ACT_SET_NOTES, ACT_CHOOSE_SORT].indexOf(action.type) !== -1) {
    if (action.type === ACT_SET_NOTES) {
      new_state.notes = [...action.payload.notes]
    }

    if (action.type === ACT_CHOOSE_SORT) {
      new_state.notes = [...state.notes]
      new_state.notesSortType = action.payload.sort
    }

    switch (new_state.notesSortType) {
      case null:
        break;
      case 'name':
        new_state.notes.sort((noteA, noteB) => {
          return noteA.name.localeCompare(noteB.name);
        })
        break;
      case 'priority':
        new_state.notes.sort((noteA, noteB) => {
          return noteA.priority - noteB.priority;
        })
        break;
      default:
        console.debug('Unknown sort type: ', new_state.notesSortType)
    }

    return new_state;
  }

  if (action.type === ACT_CREATE_NOTE) {
    new_state.noteToCreate = {
      ..._defaultState_noteToCreate_clear
    }
    return new_state;
  }

  if (action.type === ACT_MODIFY_NOTE_TO_CREATE) {
    new_state.noteToCreate = {
      ...state.noteToCreate
    }
    new_state.noteToCreate[action.payload.key] = action.payload.value;
    return new_state;
  }
};

export default reducer;
