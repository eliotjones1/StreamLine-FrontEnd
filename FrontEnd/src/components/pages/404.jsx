import React from 'react';

// Import Templates
import ErrorPage from '../templates/errorPage';

export default function NotFound() {
  return (
    <ErrorPage 
      errNum={"404"}
      errName={"Page not found"}
      errMessage={"Sorry, we couldn't find the page you're looking for."}
    />
  );
}