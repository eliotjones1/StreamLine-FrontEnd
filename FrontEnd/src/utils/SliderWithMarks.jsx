import { Box, Slider } from '@mui/material';
// Marks from 1-10 step 1

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function SliderWithLabels({ value, onChangeRating }) {
  const handleSliderChange = (event, newValue) => {
    onChangeRating(newValue);
    console.log(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        onChange={handleSliderChange}
        step={1}
        marks={marks}
        defaultValue={5}
        min={1}
        max={10}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        aria-labelledby="slider-label"
      />
    </Box>
  );
}
