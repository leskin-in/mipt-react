import React from 'react';

import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames/bind';

import { actModifyProjectToCreate as aMPTC, actAddProject as aAP } from '../../modules_redux/actions'

import styles from '../App/App.module.scss';
const cx = classnames.bind(styles)


/* Redux integration */

const mapStateToProps = state => ({
  projects: state.projects,
  projectToCreate: state.projectToCreate,
});

const mapDispatchToProps = dispatch => ({
  actAddProject: (id, name) => dispatch(aAP(id, name)),
  actModifyProjectToCreate: (key, value) => dispatch(aMPTC(key, value)),
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
    </div>
  </div>
);


/* Projects page content */

const Project = ({project}) => (
  <div className={cx("note", "project")} key={project.id}>
    <Link to={`/project/${project.id}/`}><h1 className={cx("name")}>{project.name}</h1></Link>
  </div>
)


const ProjectCreator = ({projectToCreate, actAddProject, actModifyProjectToCreate}) => (
  <div className={cx("note", "project")}>
    <form onSubmit={event => {
      event.preventDefault();
      return actAddProject(uuidv4(), projectToCreate.name)
    }}>
      <div className={cx("note-create-button")}>
        <input className={cx("note-create-button")} type="submit" value="Create a project"/>
      </div>
      <input
        className={cx("name")}
        type="text" name="name" id={cx("create-name")}
        value={projectToCreate.name}
        onChange={e => actModifyProjectToCreate(
          'name', e.target.value,
        )}
      />
    </form>
  </div>
)


const Projects = ({projects, projectToCreate, actAddProject, actModifyProjectToCreate}) => (
  <div id={cx("right-panel")}>
    <div id={cx("notes-container")}>
      {
        projects.map(project => (
          <Project project={project} key={project.id} />
        ))
      }
    </div>

    <div id={cx("submit-container")}>
      <ProjectCreator projectToCreate={projectToCreate} actAddProject={actAddProject} actModifyProjectToCreate={actModifyProjectToCreate} />
    </div>
  </div>
)


const ProjectsBody = ({projects, projectToCreate, actAddProject, actModifyProjectToCreate}) => (
  <div id={cx("body")}>
    <ProjectsMenu />
    <Projects projects={projects} projectToCreate={projectToCreate} actAddProject={actAddProject} actModifyProjectToCreate={actModifyProjectToCreate} />
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsBody)
