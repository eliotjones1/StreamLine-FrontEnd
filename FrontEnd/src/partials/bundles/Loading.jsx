import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get('http://127.0.0.1:8000/getProgress/')
        .then((response) => {
          if (response.data.progress > progress) {
            setProgress(response.data.progress);
          }
        })
        .catch((error) => {
          // Add Error Modal
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p className="font-bold pb-4">Loading...</p>
      <div className="w-40 h-4 bg-gray-200 rounded">
        <div
          className="h-full bg-blue-500 rounded"
          style={{
            width: `${progress}%`,
            transition: 'width 1s ease-in-out',
          }}
        />
      </div>
    </>
  );
}

export default Loading;
