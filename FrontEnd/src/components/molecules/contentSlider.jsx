import React from 'react';

import ContentCard from '../atoms/contentCard';
import NameAndDate from '../atoms/nameAndDate';

export default function ContentSlider({ mediaContent }) {
  return (
    <div className="flex overflow-x-auto space-x-4 scrollbar-hidden relative">
      {mediaContent.map((content, index) => (
        <div className="w-44" key={index}>
          <ContentCard content={content} />
          <div className="py-3">
            <NameAndDate content={content} />
          </div>
        </div>
      ))}
    </div>
  );
}
