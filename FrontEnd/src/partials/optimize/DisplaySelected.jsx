import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DefaultMovieImg from '../../images/StreamLine.jpeg';

function DisplaySelected({items, onRemoveItem, removeAll}) {
  const darkGrad = 'linear-gradient(90deg, rgba(0,183,255,1) 0%, rgba(104,94,255,1) 100%)';
  const lightGrad = 'linear-gradient(90deg, rgba(30,41,59,1) 0%, rgba(0,183,255,1) 100%)';
  const colorMode = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return darkGrad
    }
    return lightGrad
  }
  
  const handleWatched = (index) => {
    onRemoveItem(index)
  };

  return (
    <section>
      <div className="max-w-4xl mx-auto py-10">
        <div className="container max-w-4xl w-full mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Selected Movies/Shows</h2>
          {items.length !== 0 ? ( <button className="text-2xl font-bold mb-4 bg-transparent border-none cursor-pointer text-gray-500" onClick={removeAll}>
            Clear All
          </button>) : (<></>)}
          
          </div>

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
                      background: colorMode,
                      borderRadius: '8px',
                      p: 1,
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <div className="flex flex-row">
                      {
                        item.image !== null ?
                        <img src={'https://image.tmdb.org/t/p/w185' + item.image} width="46.25" height="69.5" style={{ borderRadius: '10%' }}/>
                        :
                        <img src={DefaultMovieImg} width="46.25" height="69.5" style={{ borderRadius: '10%' }}/>
                      }
                      <div className="pl-2">
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 2px rgba(1, 0, 0, 0.8)',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <div>
                          {
                            item.release_date !== null?
                            <Typography variant="caption" sx={{ color: 'white' }}>
                              Release Date: {item.release_date}
                            </Typography>
                            :
                            <></>
                          }
                        </div>
                        {
                          item.type !== null ?
                          <Typography variant="caption" sx={{ color: 'white' }}>
                            Type: {item.type}
                          </Typography>
                          :
                          <></>
                        }
                      </div>
                    </div>
                    <div>
                      <IconButton
                        size="small"
                        edge="end"
                        style={{ color: "white" }}
                        onClick={() => handleWatched(index)}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </div>
                  </Box>
                ))}
              </Stack>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DisplaySelected;
