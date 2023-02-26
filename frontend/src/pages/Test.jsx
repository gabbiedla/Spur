import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, reset } from '../features/projects/projectSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
// import ProjectItem from '../components/ProjectItem';
import TestItem from '../components/TestItem';

function Test() {
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
      {/* <div>
          <div>Title</div>
          <div>Tag</div>
          <div>Link</div>
        </div> */}
      {projects.map((project) => (
        <TestItem key={project._id} project={project} />
      ))}
    </>
  );
}

export default Test;
