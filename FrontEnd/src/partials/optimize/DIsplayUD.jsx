import React, { useEffect, useState } from 'react';
import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DefaultMovieImg from '../../images/StreamLine.jpeg';
import SliderWithLabels from '../../utils/SliderWithMarks';
import Cookies from 'js-cookie';
import axios from 'axios';

function DisplaySelected({ items, onRemoveItem }) {
  const [activeColor, setActiveColor] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(5);
  const [item_index, setIndex] = useState(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setActiveColor('linear-gradient(90deg, rgba(0,183,255,1) 0%, rgba(104,94,255,1) 100%)');
    } else {
      setActiveColor('linear-gradient(90deg, rgba(30,41,59,1) 0%, rgba(0,183,255,1) 100%)');
    }
  }, []);

  const handleRemoveItem = (index) => {
    const selectedItem = items[index];
    setSelectedItem(selectedItem);
    setShowPopup(true);
  };

  function handleRatingChange(newRating) {
    console.log('New rating:', newRating);
    setRating(newRating);
  }

  const handleSkip = () => {
    setSelectedItem(null);
    setShowPopup(false);
    onRemoveItem(item_index);
    setIndex(null);
  };

  const handleSubmit = () => {
    // Make POST request to http://127.0.0.1:8000/api/recommendations/saveRating/
    axios
      .post('http://127.0.0.1:8000/api/recommendations/saveRating/', [selectedItem, rating], {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setSelectedItem(null);
    setShowPopup(false);
    onRemoveItem(item_index);
    setIndex(null);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg shadow-lg px-6 py-4 max-h-96 overflow-y-auto">
      {items.length === 0 ? (
        'No content selected yet.'
      ) : (
        <Stack spacing={2}>
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: activeColor,
                borderRadius: '8px',
                p: 1,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="flex flex-row">
                <img
                  width="46.25"
                  height="69.5"
                  style={{ borderRadius: '10%' }}
                  src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                  alt={DefaultMovieImg}
                />
                <div className="pl-2 text-white">
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(1, 0, 0, 0.8)',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <div>
                    {item.release_date !== null && (
                      <Typography variant="caption">Release Date: {item.release_date}</Typography>
                    )}
                  </div>
                  {item.type !== null && (
                    <Typography variant="caption">Type: {item.type}</Typography>
                  )}
                </div>
              </div>
              {onRemoveItem !== undefined && (
                <div>
                  <IconButton
                    size="small"
                    edge="end"
                    style={{ color: 'white' }}
                    onClick={() => {
                      handleRemoveItem(index), setIndex(index);
                    }}
                  >
                    <CheckCircleOutlineIcon />
                  </IconButton>
                </div>
              )}
            </Box>
          ))}
        </Stack>
      )}
      {showPopup &&
        selectedItem &&
        (console.log(selectedItem),
        (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 flex flex-col">
              <div className="flex justify-end">
                <IconButton
                  size="small"
                  style={{ color: 'black' }}
                  onClick={() => {
                    setShowPopup(false), setRating(5);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="flex flex-col items-center">
                <Typography variant="h5" style={{ color: 'black' }}>
                  Please Rate This Item
                </Typography>
                <img
                  width="200"
                  height="300"
                  style={{ borderRadius: '5%' }}
                  src={`https://image.tmdb.org/t/p/w185${selectedItem.poster_path}`}
                  alt={DefaultMovieImg}
                />
                <Typography variant="h5" style={{ color: 'black' }}>
                  {selectedItem.title}
                </Typography>
                <Typography variant="body2" style={{ color: 'black' }}>
                  Release Date: {selectedItem.release_date}
                </Typography>
                <div className="flex items-center">
                  <Typography variant="body2" style={{ color: 'black' }}>
                    Scale:
                  </Typography>
                  <SliderWithLabels value={rating} onChangeRating={handleRatingChange} />
                  <Typography variant="body2">{rating}</Typography>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button className="bg-gray-300 py-2 px-4 rounded" onClick={handleSkip}>
                  Skip
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default DisplaySelected;
