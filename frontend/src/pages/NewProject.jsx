import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProject, reset } from '../features/projects/projectSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewProject() {
  // const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.projects
  ); //   const [name, setName] = useSelector(user.name);
  //   const [email, setEmail] = useState(user.email);
  // const [name] = useState(user.name);
  // const [email] = useState(user.email);
  // const [product, setProduct] = useState('iPhone');
  // const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [company, setCompany] = useState('');
  const [summary, setSummary] = useState('');
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [resolution, setResolution] = useState('');
  const [stakeholders, setStakeholders] = useState('');
  const [metrics, setMetrics] = useState('');
  const [takeaways, setTakeaways] = useState('');
  const [tag, setTag] = useState('Web');
  const [resources, setResources] = useState('');
  const [files, setFiles] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/projects');
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProject({
        // product,
        // description,
        title,
        date,
        company,
        summary,
        situation,
        task,
        action,
        resolution,
        stakeholders,
        metrics,
        takeaways,
        tag,
        resources,
        files,
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
        <h1>Create New Project</h1>
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
            <label htmlFor="title">Project Title</label>
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
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <select
              name="tag"
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="Ops Process">Ops Process</option>
              <option value="Web">Web</option>
              <option value="Mobile">Mobile</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="resources">Resources</label>
            {/* <textarea
              name="resources"
              id="resources"
              className="form-control"
              placeholder="Include links to figma link"
              value={resourcesy}
              onChange={(e) => setResources(e.target.value)}
            ></textarea> */}
            <textarea
              type="url"
              className="form-control"
              placeholder="List related resources"
              value={resources}
              onChange={(e) => setResources(e.target.value)}
            />
          </div>
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

export default NewProject;
