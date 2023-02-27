import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EditButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-reverse btn-black">
      <FaEdit /> Edit
    </Link>
  );
};

export default EditButton;
