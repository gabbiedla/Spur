import React from 'react';
import { Link } from 'react-router-dom';

function InterviewItem({ interview }) {
  return (
    <div className="project">
      {/* <div>{new Date(project.createdAt).toLocaleString('en-US')}</div>
      <div>{project.product}</div>
      <div className={`status status-${project.status}`}>{project.status}</div>
      <Link to={`/project/${project._id}`} className="btn btn-reverse btn-sm">
        View
      </Link> */}
      {/* <div>{new Date(project.createdAt).toLocaleString('en-US')}</div> */}
      <div>
        {new Date(interview.interview_date).toLocaleDateString('en-US')}
      </div>
      <div>{interview.job_title}</div>
      <div>{interview.stages}</div>
      {/* <div className={`status status-${project.status}`}>{project.status}</div> */}
      <Link
        to={`/interview/${interview._id}`}
        className="btn btn-reverse btn-sm"
      >
        View
      </Link>
    </div>
  );
}

export default InterviewItem;
