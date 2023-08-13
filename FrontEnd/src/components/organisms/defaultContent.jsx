
import { useState, useContext } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import ContentSlider from '../molecules/contentSlider';
import { ModalContext } from '../../contexts/ModalContext';
import { APIContext } from '../../contexts/api';

export default function Content() {
  const [newlyReleased, setNewlyReleased] = useState([]);
  const [staffPicks, setStaffPicks] = useState([]);
  const { setOpen500Modal } = useContext(ModalContext);
  const { fetchTrendingContent } = useContext(APIContext);

  const fetchNewlyReleased = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/recent/');
      setNewlyReleased(data);
    } catch (error) {
      setOpen500Modal(true);
    }
  };

  const fetchStaffPicks = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/staffpicks/');
      setStaffPicks(data);
    } catch (error) {
      setOpen500Modal(true);
    }
  };

  const {
    status,
    error,
    data: trending,
  } = useQuery({
    queryKey: ["trending_content"],
    queryFn: () => fetchTrendingContent(),
  });

  if (status === "loading") return <></>;
  if (status === "error") return <p>{JSON.stringify(error)}</p>;

  return (
    <div className="max-w-7xl mx-auto relative z-0">
      <div className="pb-2">
        <p className="font-bold pb-2 text-2xl">Trending Content</p>
        <ContentSlider mediaContent={trending} />
      </div>
      <div className="pb-2">
        <p className="font-bold pb-2 text-2xl">Newly Released</p>
        <ContentSlider mediaContent={newlyReleased} />
      </div>
      <div className="pb-2">
        <p className="font-bold pb-2 text-2xl">Staff Picks</p>
        <ContentSlider mediaContent={staffPicks} />
      </div>
    </div>
  );
}
