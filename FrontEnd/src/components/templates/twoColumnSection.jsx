import React from 'react';

export default function twoColumnGrid({ leftComponent, rightComponent, classNameMods }){
  return (
    <div className={`max-w-7xl mx-auto grid grid-cols-2 gap-4 ${classNameMods}`}>
      <div className="col-span-1">
        {leftComponent}
      </div>
      <div className="col-span-1">
        {rightComponent}
      </div>
    </div>
  );
};