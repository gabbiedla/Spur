import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getInterview, reset } from '../features/interviews/interviewSlice';
import {
  getIntNotes,
  createIntNote,
  reset as intnotesReset,
} from '../features/intnotes/intnoteSlice';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import IntNoteItem from '../components/IntNoteItem';

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

  const [intnoteText, setIntNoteText] = useState('');

  const { interview, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.interviews
  );

  const { intnotes, isLoading: intnotesIsLoading } = useSelector(
    (state) => state.intnotes
  );

  const params = useParams();
  const dispatch = useDispatch();
  const { interviewId } = useParams();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getInterview(interviewId));
    dispatch(getIntNotes(interviewId));
    // eslint-disable-next-line
  }, [isError, message, interviewId]);

  //create note submit
  const onIntNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createIntNote({ intnoteText, interviewId }));
    closeModal();
  };

  //Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || intnotesIsLoading) {
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
          Job Title: {interview.role}
          {/* <span className={`status status-${project.status}`}>
            {project.status}
          </span> */}
          <span>Company: {interview.company}</span>
          {/* <span>Link: {interview.link}</span> */}
          <span>Round: {interview.stage}</span>
        </h2>
        {/* <h3>
          <span>Interviewer Name: {interview.interviewer_name}</span>
          <span>
            Interview Date:{' '}
            {new Date(interview.date).toLocaleDateString('en-US')}
          </span>
          <span>
            Date Submitted: {new Date(project.createAt).toLocaleString('en-US')}
          </span>
        </h3> */}
        <hr />
        <div className="project-container">
          <h3 className="project-title">Why Me</h3>
          <div className="project-desc">
            <h3>Pitch</h3>
            <p>{interview.pitch}</p>
          </div>
          <div className="project-desc2">
            <h3>Why do you want this job?</h3>
            <p>{interview.why1}</p>
          </div>
          <div className="project-desc2">
            <h3>Why am I a good fit?</h3>
            <p>{interview.why2}</p>
          </div>
          <div className="project-desc2">
            <h3>Why hire me?</h3>
            <p>{interview.why3}</p>
          </div>
          <h3 className="project-title">Company Research</h3>
          <div className="project-desc1">
            <h3>Description</h3>
            <p>{interview.description}</p>
          </div>
          <div className="project-desc1">
            <h3>Notes/Concerns</h3>
            <p>{interview.info}</p>
          </div>
          <div className="project-desc1">
            <h3>Questions</h3>
            <p>{interview.questions}</p>
          </div>
          <div className="project-desc1">
            <h3>Desired Salary</h3>
            <p>{interview.desired_salary}</p>
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
        <form onSubmit={onIntNoteSubmit}>
          <div className="form-group">
            <textarea
              name="intnoteText"
              id="intnoteText"
              className="form-control"
              placeholder="Note text"
              value={intnoteText}
              onChange={(e) => setIntNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {intnotes.map((intnote) => (
        <IntNoteItem key={intnote._id} intnote={intnote} />
      ))}
    </div>
  );
}

export default Interview;
