import React, { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography, TextField } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DefaultMovieImg from '../../images/StreamLine.jpeg';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function AltDisplay({ items, onRemoveItem }) {
  const [activeColor, setActiveColor] = useState('');
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setActiveColor('linear-gradient(90deg, rgba(0,183,255,1) 0%, rgba(104,94,255,1) 100%)');
    } else {
      setActiveColor('linear-gradient(90deg, rgba(30,41,59,1) 0%, rgba(0,183,255,1) 100%)');
    }
  }, []);

  const handleDateChange = (index, value) => {
    setDates((prevDates) => [...prevDates, value]);
    let temp = dates;
    temp.push(value);
    localStorage.setItem('selectedDates', JSON.stringify(temp));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg shadow-lg px-6 py-4 max-h-96 overflow-y-auto">
        {items === null || items.length === 0 ? (
          'No current subscriptions.'
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
                  {/* <img width="46.25" height="69.5" style={{ borderRadius: '10%' }} src={`https://image.tmdb.org/t/p/w185${item.image}`} alt={DefaultMovieImg}/> */}
                  <div className="pl-2 text-white">
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                        textShadow: '1px 1px 2px rgba(1, 0, 0, 0.8)',
                      }}
                    >
                      {item}
                    </Typography>
                  </div>
                </div>
                <DatePicker
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={dates[index] || null}
                  onChange={(value) => handleDateChange(index, value)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                {onRemoveItem !== undefined && (
                  <div>
                    <IconButton
                      size="small"
                      edge="end"
                      style={{ color: 'white' }}
                      onClick={() => onRemoveItem(index)}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </div>
                )}
              </Box>
            ))}
          </Stack>
        )}
      </div>
    </LocalizationProvider>
  );
}

export default AltDisplay;
