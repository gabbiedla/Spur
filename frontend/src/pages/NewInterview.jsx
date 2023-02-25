import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const [job_title, setJob_Title] = useState('');
  const [interview_date, setInterview_Date] = useState('');
  //   const [company, setCompany] = useState('');
  //   const [summary, setSummary] = useState('');
  //   const [situation, setSituation] = useState('');
  //   const [task, setTask] = useState('');
  //   const [action, setAction] = useState('');
  //   const [resolution, setResolution] = useState('');
  //   const [stakeholders, setStakeholders] = useState('');
  //   const [metrics, setMetrics] = useState('');
  //   const [takeaways, setTakeaways] = useState('');
  const [stages, setStages] = useState('First');
  //   const [resources, setResources] = useState('');
  //   const [files, setFiles] = useState('');

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
        job_title,
        interview_date,
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
        <h1>Create New Interview Prep</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        {/* <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div> */}
        <form onSubmit={onSubmit}>
          {/* <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div> */}
          <div className="form-group">
            <label htmlFor="job_title">Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={job_title}
              onChange={(e) => setJob_Title(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Year"
              value={interview_date}
              onChange={(e) => setInterview_Date(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary</label>
            <textarea
              name="summary"
              id="summary"
              className="form-control"
              placeholder="What is the project about? Why is worth sharing? Bonus: Turn this into an elevator pitch."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="situation">STAR Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stakeholders">Key Stakeholders</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="List the stakeholders you interacted with (i.e., Data Scientists, Marketing SMM, etc.)"
              value={stakeholders}
              onChange={(e) => setStakeholders(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="metrics">Metrics</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="How did you measure success? if NA, what metrics would you have used?"
              value={metrics}
              onChange={(e) => setMetrics(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="takeways">Key Takeaways</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="What did you learn? What went wrong? What would you have done differently?"
              value={takeaways}
              onChange={(e) => setTakeaways(e.target.value)}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="stages">Stages</label>
            <select
              name="tag"
              id="tag"
              value={stages}
              onChange={(e) => setStages(e.target.value)}
            >
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Final">Final</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="resources">Resources</label>
        
            <textarea
              type="url"
              className="form-control"
              placeholder="List related resources"
              value={resources}
              onChange={(e) => setResources(e.target.value)}
            />
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="files">Files</label>
            <input
              type="file"
              className="form-control"
              name="file"
              multiple
              // placeholder=""
              value={files}
              onChange={(e) => setFiles(e.target.value)}
            />
          </div> */}
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewInterview;
