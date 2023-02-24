import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { useSelector, useDis, useDispatch } from 'react-redux';
import { getProject } from '../features/projects/projectSlice';
import {
  getNotes,
  createNote,
  reset as notesReset,
} from '../features/notes/noteSlice';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

function Project() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [noteText, setNoteText] = useState('');

  const { project, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.projects
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const params = useParams();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProject(projectId));
    dispatch(getNotes(projectId));
    // eslint-disable-next-line
  }, [isError, message, projectId]);

  //create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, projectId }));
    closeModal();
  };

  //Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
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
          {/* Project ID: {project._id} */}
          Project Name: {project.title}
          {/* <span className={`status status-${project.status}`}>
            {project.status}
          </span> */}
          <span>{project.tag}</span>
        </h2>
        <h3>
          Date Created: {new Date(project.date).toLocaleDateString('en-US')}
          {/* Date Submitted: {new Date(project.createAt).toLocaleString('en-US')} */}
          <span>{project.company}</span>
        </h3>
        <hr />
        <div className="project-desc">
          <h3>Summary</h3>
          <p>{project.summary}</p>
          {/* <h3>Description of the Issue</h3>
          <p> {project.description}</p> */}
        </div>
        <div className="project-desc">
          <h3>STAR</h3>
          <h4>Situation</h4>
          <p>{project.situation}</p>
          <h4>Task</h4>
          <p>{project.task}</p>
          <h4>Action</h4>
          <p>{project.action}</p>
          <h4>Resolution</h4>
          <p>{project.Resolution}</p>
        </div>
        <div className="project-desc">
          <h3>Metrics</h3>
          <p>{project.metrics}</p>
        </div>
        <div className="project-desc">
          <h3>Key Stakeholders</h3>
          <p>{project.stakeholders}</p>
        </div>
        <div className="project-desc">
          <h3>Key Learnings</h3>
          <p>{project.takeaways}</p>
        </div>
        <div className="project-desc">
          <h3>Resources</h3>
          <h4>Links</h4>
          {/* <a>{project.resources}</a> */}
          <a href={project.resources} target="_blank" style={{ color: 'blue' }}>
            {project.resources}
          </a>
          <h4>Images</h4>
          <img src={project.files} alt="no image found" />
        </div>
        <h2>Notes</h2>
      </header>
      {/* comment off for add button */}
      {/* {project.status !== 'closed' && (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add Note
        </button>
      )} */}

      <button onClick={openModal} className="btn">
        <FaPlus />
        Add Note
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
}

export default Project;
