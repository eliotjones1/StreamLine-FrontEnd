import React from 'react';

import SocialLink from '../atoms/socialLink';

export default function SocialLinksList({ list, classNameMods }) {
  return (
    <ul className={`flex space-x-4 mb-4 ${classNameMods}`}>
      {list.map((link, index) => (
        <SocialLink link={link} key={index} />
      ))}
    </ul>
  );
}
