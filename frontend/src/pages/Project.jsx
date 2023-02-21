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
