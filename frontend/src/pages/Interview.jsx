import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getInterview, reset } from '../features/interviews/interviewSlice';
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

function Interview() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [noteText, setNoteText] = useState('');

  const { interview, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.interviews
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const params = useParams();
  const dispatch = useDispatch();
  const { interviewId } = useParams();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getInterview(interviewId));
    dispatch(getNotes(interviewId));
    // eslint-disable-next-line
  }, [isError, message, interviewId]);

  //create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, interviewId }));
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
        <BackButton url="/interviews" />
        <h2>
          {/* Project ID: {project._id} */}
          Interview Name: {interview.title}
          {/* <span className={`status status-${project.status}`}>
            {project.status}
          </span> */}
          <span>{interview.stages}</span>
        </h2>
        <h3>
          Interview Date: {new Date(interview.date).toLocaleDateString('en-US')}
          {/* Date Submitted: {new Date(project.createAt).toLocaleString('en-US')} */}
          {/* <span>{project.company}</span> */}
        </h3>
        <hr />
        <div className="project-container">
          <div className="project-desc">
            <h3>Summary</h3>
            <p>{interview.stages}</p>
          </div>
        </div>
        <hr className="note-line" />
        <h2 className="notes-section">Notes</h2>
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

      {/* {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))} */}
    </div>
  );
}

export default Interview;
