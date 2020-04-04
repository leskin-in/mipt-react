/*
 * Redux actions definitions
 */


/* Projects */

export const ACT_SET_PROJECT = "ACT_SET_PROJECT"
export const actSetProject = (projectId) => ({
  type: ACT_SET_PROJECT,
  payload: {
    projectId: projectId
  }
})

export const ACT_ADD_PROJECT = "ACT_ADD_PROJECT"
export const actAddProject = (projectId, name) => ({
  type: ACT_ADD_PROJECT,
  payload: {
    projectId: projectId,
    name: name
  }
})

export const ACT_MODIFY_PROJECT_TO_CREATE = "ACT_MODIFY_PROJECT_TO_CREATE"
export const actModifyProjectToCreate = (key, value) => ({
  type: ACT_MODIFY_PROJECT_TO_CREATE,
  payload: {
    key: key,
    value: value,
  }
})


/* Notes */

export const ACT_SET_SORT = "ACT_SET_SORT";
export const actSetSort = (projectId, type) => ({
  type: ACT_SET_SORT,
  payload: {
    projectId: projectId,
    sort: type
  }
})

export const ACT_ADD_NOTE = "ACT_ADD_NOTE";
export const actAddNote = (projectId, id, name, description, priority) => ({
  type: ACT_ADD_NOTE,
  payload: {
    projectId: projectId,
    note: {
      id: id,
      name: name,
      description: description,
      priority: priority,
    },
  }
})

export const ACT_MODIFY_NOTE_TO_ADD = "ACT_MODIFY_NOTE_TO_ADD";
export const actModifyNoteToAdd = (name, description, priority) => ({
  type: ACT_MODIFY_NOTE_TO_ADD,
  payload: {
    name: name,
    description: description,
    priority: priority,
  }
})
