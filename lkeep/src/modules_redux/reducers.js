/*
 * Redux reducers definitions
 */

import { ACT_SET_SORT, ACT_ADD_NOTE, ACT_MODIFY_NOTE_TO_ADD, ACT_SET_PROJECT, ACT_ADD_PROJECT, ACT_MODIFY_PROJECT_TO_CREATE } from "./actions";


/* Default state definition */

const _defaultState_noteToCreate_clear = {
  name: '',
  description: '',
  priority: 3,
}

const _defaultState_projectToCreate_clear = {
  name: '',
}

const _defaultState_projectNew = {
  'notes': {
    sortType: 'none',
    list: []
  }
}

const defaultState = {
  projects: [
    {
      'id': '6bde2d3c50dc4814837d56180d709d54',
      'name': 'Project A'
    },
    {
      'id': '72130d2bc5a44887b94e9009c38203ee',
      'name': 'Project B'
    }
  ],

  projectData: {
    '6bde2d3c50dc4814837d56180d709d54': {
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
      }
    },
    '72130d2bc5a44887b94e9009c38203ee': {
      notes: {
        sortType: 'none',
        list: [
          {
            id: '1a5a5e52e-a449-4f39-8311-24fa59f9cd6b',
            name: 'D. A note with name "D"',
            description: 'Note D description (priority 2)',
            priority: 2
          },
          {
            id: 'a9fb86f2-01b3-4634-9569-9051f52ef171',
            name: 'E. A note with name "E"',
            description: 'Note E description (priority 1)',
            priority: 1
          },
          {
            id: '33cb6419-d72f-44a1-b2f6-13a8101441af',
            name: 'F. A note with name "F"',
            description: 'Note F description (priority 3). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices commodo rhoncus. In consequat, tortor in tincidunt interdum, mi leo.',
            priority: 3
          }
        ],
      }
    }
  },

  // This variable is intentionally the same for all projects
  noteToCreate: {
    ..._defaultState_noteToCreate_clear,
  },

  projectToCreate: {
    ..._defaultState_projectToCreate_clear,
  },

  projectId: null,
};


/* The reducer */

const reducer = (state = defaultState, action) => {
  console.log('Reducer called\n', 'State:', state, 'Action: ', action)

  // Check the given action is valid
  switch (action.type) {
    case ACT_SET_PROJECT:
    case ACT_ADD_PROJECT:
    case ACT_MODIFY_PROJECT_TO_CREATE:
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

  if (action.type === ACT_SET_PROJECT) {
    new_state.projectId = action.payload.projectId;
  }

  if (action.type === ACT_ADD_PROJECT) {
    new_state.projects = [...state.projects];
    new_state.projects.push({
      'id': action.payload.projectId,
      'name': action.payload.name
    });

    new_state.projectData = {
      ...state.projectData
    };
    new_state.projectData[action.payload.projectId] = {
      ..._defaultState_projectNew,
    };

    new_state.projectToCreate = {
      ..._defaultState_projectToCreate_clear
    };
  }

  if (action.type === ACT_MODIFY_PROJECT_TO_CREATE) {
    new_state.projectToCreate = {
      ...state.projectToCreate
    };

    new_state.projectToCreate[action.payload.key] = action.payload.value;
  }

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
    new_state.projectData = {
      ...state.projectData
    }
    new_state.projectData[action.payload.projectId].notes = {
      ...state.projectData[action.payload.projectId].notes
    }
    new_state.projectData[action.payload.projectId].notes.list = [...state.projectData[action.payload.projectId].notes.list]

    sort_required = true;
    new_state.projectData[action.payload.projectId].notes.list.push(action.payload.note);

    new_state.noteToCreate = {
      ..._defaultState_noteToCreate_clear
    }
  }

  if (action.type === ACT_SET_SORT) {
    new_state.projectData = {
      ...state.projectData
    }
    new_state.projectData[action.payload.projectId].notes = {
      ...state.projectData[action.payload.projectId].notes
    }
    new_state.projectData[action.payload.projectId].notes.list = [...state.projectData[action.payload.projectId].notes.list]

    sort_required = true;
    new_state.projectData[action.payload.projectId].notes.sortType = action.payload.sort;
  }

  // Sort nodes
  if (sort_required) {
    switch (new_state.projectData[action.payload.projectId].notes.sortType) {
      case 'name':
        new_state.projectData[action.payload.projectId].notes.list.sort((noteA, noteB) => {
          return noteA.name.localeCompare(noteB.name);
        })
        break;
      case 'priority':
        new_state.projectData[action.payload.projectId].notes.list.sort((noteA, noteB) => {
          return noteA.priority - noteB.priority;
        });
        break;
      default:
        console.warn('Unknown sort type:', new_state.projectData[action.payload.projectId].notes.sortType)
    }
  }

  console.debug('State after reducer: ', new_state)

  // Return the modified state
  return new_state;
};

export default reducer;
