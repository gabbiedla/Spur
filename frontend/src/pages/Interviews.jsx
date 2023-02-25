import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviews, reset } from '../features/interviews/interviewSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import InterviewItem from '../components/InterviewItem';

function Interviews() {
  const { interviews, isLoading, isSuccess } = useSelector(
    (state) => state.interviews
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
    dispatch(getInterviews());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>Interviews</h1>
      <div className="projects">
        <div className="project-headings">
          {/* <div>Date</div> */}
          {/* <div>Products</div> */}
          <div>Title</div>
          <div>Stage</div>
          <div>Date</div>
          {/* <div>Info</div> */}
          {/* <div>Status</div> */}
          {/* <div></div> */}
        </div>
        {interviews.map((interview) => (
          <InterviewItem key={interview._id} interview={interview} />
        ))}
      </div>
    </>
  );
}

export default Interviews;
