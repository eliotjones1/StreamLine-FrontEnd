import React, { useContext, useState, useEffect } from 'react';

import { TMDBContext } from '../../contexts/tmdbContext';
import ContentCard from '../atoms/contentCard';
import NameAndDate from '../atoms/nameAndDate';

export default function BasicContentData({ type, id }){
  const { fetchContentData } = useContext(TMDBContext);
  const [contentData, setContentData] = useState({});

  useEffect(() => {
    fetchContentData(type, id).then(data => {
      setContentData(data);
    });
  }, []);

  if (Object.keys(contentData).length === 0){
    return (
      <></>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-700 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 space-x-2 flex shadow-md">
      <div className="flex relative w-1/4">
        <ContentCard content={contentData}/>
      </div>
      <div className="w-3/4 space-y-1 relative">
        <NameAndDate content={contentData}/>
      </div>
    </div>
  );
}