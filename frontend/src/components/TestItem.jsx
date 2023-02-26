import React from 'react';
import { Link } from 'react-router-dom';

function TestItem({ project }) {
  return (
    <div className="project-headings1">
      <div>{project.title}</div>
      <div>{project.tag}</div>
      <Link to={`/project/${project._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}

export default TestItem;
