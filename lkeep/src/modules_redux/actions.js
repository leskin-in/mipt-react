/*
 * Redux actions definitions
 */


/* State of existing notes */

export const ACT_SET_SORT = "ACT_SET_SORT";
export const actSetSort = (type) => ({
  type: ACT_SET_SORT,
  payload: {
    sort: type
  }
})


/* Note addition */

export const ACT_ADD_NOTE = "ACT_ADD_NOTE";
export const actAddNote = (id, name, description, priority) => ({
  type: ACT_ADD_NOTE,
  payload: {
    id: id,
    name: name,
    description: description,
    priority: priority,
  }
});

export const ACT_MODIFY_NOTE_TO_ADD = "ACT_MODIFY_NOTE_TO_ADD";
export const actModifyNoteToAdd = (name, description, priority) => ({
  type: ACT_MODIFY_NOTE_TO_ADD,
  payload: {
    name: name,
    description: description,
    priority: priority,
  }
});
