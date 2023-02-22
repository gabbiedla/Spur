import React from 'react';
import { Link } from 'react-router-dom';

function ProjectItem({ project }) {
  return (
    <div className="project">
      {/* <div>{new Date(project.createdAt).toLocaleString('en-US')}</div>
      <div>{project.product}</div>
      <div className={`status status-${project.status}`}>{project.status}</div>
      <Link to={`/project/${project._id}`} className="btn btn-reverse btn-sm">
        View
      </Link> */}
      {/* <div>{new Date(project.createdAt).toLocaleString('en-US')}</div> */}
      <div>{project.title}</div>
      <div>{project.tag}</div>
      {/* <div className={`status status-${project.status}`}>{project.status}</div> */}
      <Link to={`/project/${project._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default ProjectItem;