/*
 * Redux actions definitions
 */

import backendApiRequest from '../utilities/backend'


/* 'projects' */

export const ACT_SET_PROJECTS = "ACT_SET_PROJECTS"
export const actSetProjects = (projects) => ({
  type: ACT_SET_PROJECTS,
  payload: {
    projects: projects
  }
})

export const ACT_CHOOSE_PROJECT = "ACT_CHOOSE_PROJECT"
export const actChooseProject = (dispatch, projectId) => {
  backendApiRequest(`/projects/${projectId}/tasks/`).then(
    res => dispatch(actSetNotes(res))
  )

  return {
    type: ACT_CHOOSE_PROJECT,
    payload: {
      projectId: projectId,
    }
  }
}

export const ACT_CREATE_PROJECT = "ACT_CREATE_PROJECT"
export const actCreateProject = (dispatch, name) => {
  backendApiRequest(`/projects/`, {}, 'POST', {
    name: name,
  }).then(
    res => backendApiRequest(`/projects/`)
  ).then(
    res => dispatch(actSetProjects(res))
  )

  return {
    type: ACT_CREATE_PROJECT,
    payload: {
      name: name,
    }
  }
}

export const ACT_MODIFY_PROJECT_TO_CREATE = "ACT_MODIFY_PROJECT_TO_CREATE"
export const actModifyProjectToCreate = (key, value) => ({
  type: ACT_MODIFY_PROJECT_TO_CREATE,
  payload: {
    key: key,
    value: value,
  }
})


/* 'notes' */

export const ACT_SET_NOTES = "ACT_SET_NOTES"
export const actSetNotes = (notes) => ({
  type: ACT_SET_NOTES,
  payload: {
    notes: notes,
  }
})

export const ACT_CHOOSE_SORT = "ACT_CHOOSE_SORT";
export const actChooseSort = (type) => ({
  type: ACT_CHOOSE_SORT,
  payload: {
    sort: type,
  }
})

export const ACT_CREATE_NOTE = "ACT_CREATE_NOTE";
export const actCreateNote = (dispatch, projectId, name, description, priority) => {
  backendApiRequest(`/projects/${projectId}/tasks/`, {}, 'POST', {
    name: name,
    description: description,
    priority: priority
  }).then(
    res => backendApiRequest(`/projects/${projectId}/tasks/`)
  ).then(
    res => dispatch(actSetNotes(res))
  )

  return {
    type: ACT_CREATE_NOTE,
    payload: {
      name: name,
      description: description,
      priority: priority,
    }
  }
}

export const ACT_MODIFY_NOTE_TO_CREATE = "ACT_MODIFY_NOTE_TO_CREATE";
export const actModifyNoteToCreate = (key, value) => ({
  type: ACT_MODIFY_NOTE_TO_CREATE,
  payload: {
    key: key,
    value: value,
  }
})


/* 'signin' */

export const ACT_SIGNIN_FORM_MODIFY = "ACT_SIGNIN_FORM_MODIFY"
export const actSigninFormModify = (key, value) => ({
  type: ACT_SIGNIN_FORM_MODIFY,
  payload: {
    key: key,
    value: value,
  }
})

export const ACT_LOGIN = "ACT_LOGIN"
export const actLogin = (dispatch, login, password) => {
  backendApiRequest('/login/', {}, 'POST', {
    login: login,
    password: password
  }).then(
    res => {
      return res ? dispatch(actSetAuthenticationToken(res.token)) : null
    }
  )

  return {
    type: ACT_LOGIN,
    payload: {}
  }
}

export const ACT_REGISTER = "ACT_REGISTER"
export const actRegister = (dispatch, login, password) => {
  backendApiRequest('/register/', {}, 'POST', {
    login: login,
    password: password
  }).then(
    res => {
      return res ? dispatch(actSetAuthenticationToken(res.token)) : null
    }
  )

  return {
    type: ACT_REGISTER,
    payload: {}
  }
}

export const ACT_LOGOUT = "ACT_LOGOUT"
export const actLogout = () => ({
  type: ACT_LOGOUT,
  payload: {}
})

export const ACT_SET_AUTHENTICATION_TOKEN = "ACT_SET_AUTHENTICATION_TOKEN"
export const actSetAuthenticationToken = (token) => ({
  type: ACT_SET_AUTHENTICATION_TOKEN,
  payload: {
    token: token
  }
})
