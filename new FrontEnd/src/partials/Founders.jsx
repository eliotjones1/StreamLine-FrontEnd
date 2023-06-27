import React from 'react';

import RyanHeadshot from '../images/Ryan_Headshot.jpg';
import JoshKHeadshot from '../images/JoshKHeadshot.jpeg';
import EliotHeadshot from '../images/Eliot_Headshot.png';
import JoshFHeadshot from '../images/JoshFHeadshot.jpeg';

function Founders() {
  const founders = [
    {
      name: 'Ryan Dunn',
      role: 'Co-Founder / Role Undetermined',
      location: 'Charlotte, North Carolina',
      imageUrl: RyanHeadshot,
    },
    {
      name: 'Eliot Jones',
      role: 'Co-Founder / Role Undetermined',
      location: 'Hartford, Connecticut',
      imageUrl: EliotHeadshot
    },
    {
      name: 'Josh Karty',
      role: 'Co-Founder / Irrelevant',
      location: 'Greensboro, North Carolina',
      imageUrl: JoshKHeadshot
    },
    {
      name: 'Josh Francis',
      role: 'Co-Founder / Irrelevant',
      location: 'Palo Alto, California',
      imageUrl: JoshFHeadshot
    }
  ]
  
  return (
    <section className='py-16'>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 px-6 lg:px-8">

        <div className='row-start-1'>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Meet our Team</h2>
          <p className="max-w-4xl mt-6 text-lg leading-8">
            Driven Stanford University computer science students revolutionizing technology through StreamLine. Changing the game in subscriptions with innovation and expertise.
          </p>
        </div>

        <ul className='grid w-full grid-cols-4'>
          {founders.map((person) => (
            <li key={person.name}>
              <div className="flex flex-col w-full">
                <img className="h-[260px] w-[260px] rounded-lg mb-4" src={person.imageUrl} alt="" />
                <div className='flex flex-col min-h-min'>
                  <h3 className="text-base font-semibold leading-7 tracking-tight">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-sky-600">{person.role}</p>
                  <p className='text-sm font-thin leading-6 text-gray-600 dark:text-gray-400'>{person.location}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}

export default Founders;