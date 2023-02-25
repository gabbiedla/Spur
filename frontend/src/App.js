import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewProject from './pages/NewProject';
import Projects from './pages/Projects';
import Project from './pages/Project';
import NewInterview from './pages/NewInterview';
import Interviews from './pages/Interviews';
import Interview from './pages/Interview';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-project" element={<PrivateRoute />}>
              <Route path="/new-project" element={<NewProject />} />
            </Route>
            <Route path="/projects" element={<PrivateRoute />}>
              <Route path="/projects" element={<Projects />} />
            </Route>
            <Route path="/project/:projectId" element={<PrivateRoute />}>
              <Route path="/project/:projectId" element={<Project />} />
            </Route>
            <Route path="/new-interview" element={<PrivateRoute />}>
              <Route path="/new-interview" element={<NewInterview />} />
            </Route>
            <Route path="/interviews" element={<PrivateRoute />}>
              <Route path="/interviews" element={<Interviews />} />
            </Route>
            <Route path="/interview/:interviewId" element={<PrivateRoute />}>
              <Route path="/interview/:interviewId" element={<Interview />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
