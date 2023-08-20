import PropTypes from 'prop-types';


export default function CalendarHeader({ days }){
  return (
    <div className="grid grid-cols-7 gap-2 mb-2">
      {days.map((day) => (
        <div key={day} className="bg-sky-600 text-white text-center py-2 rounded-md shadow-md">
          {day}
        </div>
      ))}
    </div>
  )
}

CalendarHeader.propTypes = {
  days: PropTypes.arrayOf(PropTypes.string)
}