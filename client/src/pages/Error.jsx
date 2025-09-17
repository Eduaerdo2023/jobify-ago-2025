import NotFound from '../assets/images/not-found.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.log(error.status, error.statusText);
  
  
  return (
    <div>
      {error.status === 404 ? (
        <div>
          <img src={NotFound} alt="Not Found" />
          <Link to="/">Go to Home</Link>
        </div>
      ) : (
        <div>
          <h2>Something Went Wrong</h2>
          <Link to="/">Go to Home</Link>
        </div>
      )}

   
    </div>
  );
};

export default Error;