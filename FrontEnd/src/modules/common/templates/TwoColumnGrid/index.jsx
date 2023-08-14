import React from 'react';
import PropTypes from 'prop-types';

export default function TwoColumnGrid({ children, classNameMods }) {
  const [leftComponent, rightComponent] = React.Children.toArray(children).slice(0, 2);

  return (
    <div className={`max-w-7xl mx-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 ${classNameMods}`}>
      <div className="col-span-1">{leftComponent}</div>
      <div className="col-span-1">{rightComponent}</div>
    </div>
  );
}

TwoColumnGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  classNameMods: PropTypes.string,
};