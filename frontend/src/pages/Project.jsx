import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDis, useDispatch } from 'react-redux';
import { getProject, reset } from '../features/projects/projectSlice';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function Project() {
  const { project, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.projects
  );

  const params = useParams();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProject(projectId));
    // eslint-disable-next-line
  }, [isError, message, projectId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="project-page">
      <header className="project-header">
        <BackButton url="/projects" />
        <h2>
          Project ID: {project._id}
          <span className={`status status-${project.status}`}>
            {project.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(project.createAt).toLocaleString('en-US')}
        </h3>
        <hr />
        <div className="project-desc">
          <h3>Description of the Issue</h3>
          <p> {project.description}</p>
        </div>
      </header>
    </div>
  );
}

export default Project;
