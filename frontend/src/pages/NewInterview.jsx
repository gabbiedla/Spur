import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { createProject, reset } from '../features/projects/projectSlice';
import { createInterview, reset } from '../features/interviews/interviewSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewInterview() {
  // const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.interviews
  ); //   const [name, setName] = useSelector(user.name);
  //   const [email, setEmail] = useState(user.email);
  // const [name] = useState(user.name);
  // const [email] = useState(user.email);
  // const [product, setProduct] = useState('iPhone');
  // const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [stages, setStages] = useState('First');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/interviews');
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createInterview({
        // product,
        // description,
        title,
        date,
        stages,
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create interview</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Year Created</label>
            <input
              type="date"
              className="form-control"
              placeholder="Year"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stages">Stages</label>
            <select
              name="stages"
              id="stages"
              value={stages}
              onChange={(e) => setStages(e.target.value)}
            >
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Final</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewInterview;
