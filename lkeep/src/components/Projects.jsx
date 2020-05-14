import React from 'react';

import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import { actModifyProjectToCreate, actCreateProject } from '../modules_redux/actions'

import styles from './App.module.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const mapStateToProps = state => ({
  projects: state.projects,
  projectToCreate: state.projectToCreate,
});

const mapDispatchToProps = dispatch => ({
  createProject_fn: (name) => dispatch(actCreateProject(dispatch, name)),
  modifyProjectToCreate_fn: (key, value) => dispatch(actModifyProjectToCreate(key, value)),
});

/* */


/* Projects page menu */

const ProjectsMenu = () => (
  <div id={cx("left-panel")}>
    <div className={cx("sticky-container")}>
      <div className={cx("menu")}>
        <div className={cx("header")}>
          <Link to="/projects/">Projects</Link>
        </div>
      </div>
      <div className={cx("menu")}>
        <div className={cx("header")}>
          <Link to="/signin/">Logout</Link>
        </div>
      </div>
    </div>
  </div>
);


/* Projects page content */

const Project = ({project}) => (
  <div className={cx("note", "project")} key={project.id}>
    <Link to={`/project/${project.id}/`}><h1 className={cx("name")}>{project.name}</h1></Link>
  </div>
)


const ProjectCreator = ({projectToCreate, createProject_fn, modifyProjectToCreate_fn}) => (
  <div className={cx("note", "project")}>
    <form onSubmit={event => {
      event.preventDefault();
      return createProject_fn(projectToCreate.name)
    }}>
      <div className={cx("note-create-button")}>
        <input className={cx("note-create-button")} type="submit" value="Create a project"/>
      </div>
      <input
        className={cx("name")}
        type="text" name="name" id={cx("create-name")}
        value={projectToCreate.name}
        onChange={e => modifyProjectToCreate_fn(
          'name', e.target.value,
        )}
      />
    </form>
  </div>
)


const Projects = ({projects, projectToCreate, createProject_fn, modifyProjectToCreate_fn}) => (
  <div id={cx("right-panel")}>
    <div id={cx("notes-container")}>
      {
        projects.map(project => (
          <Project project={project} key={project.id} />
        ))
      }
    </div>

    <div id={cx("submit-container")}>
      <ProjectCreator projectToCreate={projectToCreate} createProject_fn={createProject_fn} modifyProjectToCreate_fn={modifyProjectToCreate_fn} />
    </div>
  </div>
)


const ProjectsBody = ({projects, projectToCreate, createProject_fn, modifyProjectToCreate_fn}) => (
  <div id={cx("body")}>
    <ProjectsMenu />
    <Projects projects={projects} projectToCreate={projectToCreate} createProject_fn={createProject_fn} modifyProjectToCreate_fn={modifyProjectToCreate_fn} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsBody)
