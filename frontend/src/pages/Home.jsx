import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose an option below</p>
      </section>

      <Link to="/new-project" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Store New Project
      </Link>

      <Link to="/projects" className="btn btn-block">
        <FaTicketAlt /> View My Projects
      </Link>
    </>
  );
}

export default Home;
