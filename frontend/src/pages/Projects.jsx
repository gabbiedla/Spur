import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, reset } from '../features/projects/projectSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import ProjectItem from '../components/ProjectItem';

function Projects() {
  const { projects, isLoading, isSuccess } = useSelector(
    (state) => state.projects
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Projects</h1>
      <div className="projects">
        <div className="project-headings">
          {/* <div>Date</div> */}
          {/* <div>Products</div> */}
          <div>Title</div>
          <div>Type</div>
          <div>Info</div>
          {/* <div>Status</div> */}
          {/* <div></div> */}
        </div>
        {projects.map((project) => (
          <ProjectItem key={project._id} project={project} />
        ))}
      </div>
    </>
  );
}

export default Projects;
