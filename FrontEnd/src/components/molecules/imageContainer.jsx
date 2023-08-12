// ImageContainer.js
import React from 'react';

export default function ImageContainer({ src, alt, classNameMods }) {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className={`${classNameMods} h-64 w-44 overflow-hidden rounded-lg`}>
        <img src={src} alt={alt} className="h-full w-full object-cover object-center" />
      </div>
    </div>
  );
}
