import { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AccountContext = createContext();

export default function AccountProvider({ children }) {

  const fetchUpcoming = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/user/subscriptions/upcoming', { withCredentials: true });
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    const nextSevenDays = daysOfWeek.slice(todayIndex).concat(daysOfWeek.slice(0, todayIndex));

    if (data.length === 0){
      return {
        days: nextSevenDays,
        releases: []
      };
    }
    return {
      days: nextSevenDays,
      releases: nextSevenDays.map((day) => data.filter((movie) => daysOfWeek[new Date(movie.release_date).getUTCDay()] === day))
    }
  }

  return (
    <AccountContext.Provider
      value={{
        fetchUpcoming,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};