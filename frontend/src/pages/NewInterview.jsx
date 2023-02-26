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
  );
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const [interviewer_name, setInterviewer_Name] = useState('');
  const [date, setDate] = useState('');
  const [pitch, setPitch] = useState(
    'I am a product manager in the B2B space. As a former operations leader in micromobility, I have experience in market launches, managing image recognition product tools, and scaling international support teams. I enjoy working on web development projects outside of work.'
  );
  const [why1, setWhy1] = useState('');
  const [why2, setWhy2] = useState('');
  const [why3, setWhy3] = useState('');
  const [description, setDescription] = useState('');
  const [info, setInfo] = useState('');
  const [questions, setQuestions] = useState('');
  const [desired_salary, setDesired_Salary] = useState('');
  const [stage, setStage] = useState('First');

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
        role,
        company,
        link,
        interviewer_name,
        date,
        pitch,
        why1,
        why2,
        why3,
        description,
        info,
        questions,
        desired_salary,
        stage,
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
        <h1>Prep for Interview</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="role">Job Title</label>
            <input
              type="text"
              className="form-control"
              // placeholder="Job Title"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              className="form-control"
              // placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Interview date</label>
            <input
              type="date"
              className="form-control"
              // placeholder="Company"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Job Link</label>
            <input
              type="url"
              className="form-control"
              // placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Stage">Interview Round</label>
            <select
              name="stage"
              id="stage"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
              <option value="Final">Final</option>
              <option value="Not Selected">Not Selected</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pitch">Pitch</label>
            <textarea
              name="pitch"
              id="pitch"
              className="form-control"
              // placeholder=""
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="why1">Why do you want the job?</label>
            <textarea
              name="why1"
              id="why1"
              className="form-control"
              // placeholder=""
              value={why1}
              onChange={(e) => setWhy1(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="why2">Why are you a good fit for this role?</label>
            <textarea
              name="why2"
              id="why2"
              className="form-control"
              // placeholder=""
              value={why2}
              onChange={(e) => setWhy2(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="why3">Why should they hire you?</label>
            <textarea
              name="why3"
              id="why3"
              className="form-control"
              // placeholder=""
              value={why3}
              onChange={(e) => setWhy3(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">About</label>
            <input
              type="text"
              className="form-control"
              placeholder="Short summary about what the company..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="info">Info</label>
            <textarea
              name="info"
              id="info"
              className="form-control"
              placeholder="Add research info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="questions">Questions</label>
            <textarea
              name="questions"
              id="questions"
              className="form-control"
              placeholder="Add questions..."
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desired_salary">Desired Salary</label>
            <input
              type="number"
              className="form-control"
              // placeholder="Link"
              value={desired_salary}
              onChange={(e) => setDesired_Salary(e.target.value)}
            />
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
