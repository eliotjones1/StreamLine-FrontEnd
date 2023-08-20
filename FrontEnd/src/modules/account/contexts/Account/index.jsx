import { createContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AccountContext = createContext();

export default function AccountProvider({ children }) {
  const APIKEY = '95cd5279f17c6593123c72d04e0bedfa';

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
  
  const fetchSubscriptions = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/api/user/subscriptions/view/', { withCredentials: true });
    return data;
  }

  const fetchBudget = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/returnData/', { withCredentials: true });
    return data.budget;
  };

  const fetchList = async () => {
    const { data } = await axios.get('http://127.0.0.1:8000/returnData/', { withCredentials: true })

    const promises = data.media.map(async (media) => {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/${media.media_type}/${media.id}?api_key=${APIKEY}`
      );
      data.media_type = media.media_type;
      return data;
    });

    const results = await Promise.all(promises);
    return results;
  };

  const removeFromList =  async (media) => {
    await axios.post('http://127.0.0.1:8000/removeMedia/', { id: media.id.toString(), media_type: media.media_type },{ withCredentials: true })
    fetchList();
    return;
  };

  return (
    <AccountContext.Provider
      value={{
        fetchUpcoming,
        fetchSubscriptions,
        fetchBudget,
        fetchList,
        removeFromList,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};