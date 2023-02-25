import { Link } from 'react-router-dom';
import { FaEye, FaList, FaPlusCircle } from 'react-icons/fa';

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose an option below</p>
      </section>

      <Link to="/new-project" className="btn btn-reverse btn-block">
        <FaPlusCircle /> Add New Project
      </Link>

      <Link to="/projects" className="btn btn-block">
        <FaEye /> View My Projects
      </Link>

      <Link to="/new-interview" className="btn btn-reverse btn-block">
        <FaList /> Prep For Interview
      </Link>

      <Link to="/interviews" className="btn btn-block">
        <FaEye /> View Interview Preps
      </Link>
    </>
  );
}

export default Home;
