import { TwoColumnGrid } from '/src/modules/common/templates';
import { SocialLinksList } from '/src/modules/common/components';
import { BasicMediaCard } from './components';

const founders = [
  {
    name: 'Ryan Dunn',
    role: 'Co-Founder / Role Undetermined',
    location: 'Charlotte, North Carolina',
    imageUrl: '/src/assets/images/Ryan_Full.jpg',
    favContent: [
      { type: 'movie', id: '11' },
      { type: 'tv', id: '84773' },
    ],
    socialMedia: [
      'https://twitter.com/RyanDun46936119',
      'https://www.instagram.com/_ryan.dunn/',
      'https://github.com/rycdunn',
      'https://www.linkedin.com/in/ryan-dunn-/',
    ],
  },
  {
    name: 'Eliot Jones',
    role: 'Co-Founder / Role Undetermined',
    location: 'New Britain, Connecticut',
    imageUrl: '/src/assets/images/Eliot_Full.jpeg',
    favContent: [
      { type: 'movie', id: '286217' },
      { type: 'tv', id: '71912' },
    ],
    socialMedia: [
      'https://github.com/eliotjones1',
      'https://www.linkedin.com/in/eliot-krzysztof-jones/',
    ],
  },
];

export default function Founders() {
  return (
    <section className="mt-12 mb-24">
      <TwoColumnGrid>
        {founders.map((person) => (
          <TwoColumnGrid key={person.name}>
            <img className="h-full w-full rounded-lg" src={person.imageUrl} alt="" />

            <div className="flex flex-col min-h-min space-y-2 space-x-2">
              <div>
                <h3 className="text-2xl font-semibold leading-7 tracking-tight pt-2">
                  {person.name}
                </h3>
                <p className="text-base font-semibold leading-6 text-sky-600">{person.role}</p>
                <p className="text-sm font-thin leading-6 text-gray-600 dark:text-gray-400">
                  {person.location}
                </p>
              </div>

              <SocialLinksList list={person.socialMedia} />

              <div className="space-y-2">
                <p className="text-lg font-semibold">Favorite Content</p>
                {person.favContent.map((content, index) => (
                  <BasicMediaCard type={content.type} id={content.id} key={index} />
                ))}
              </div>
            </div>
          </TwoColumnGrid>
        ))}
      </TwoColumnGrid>
    </section>
  );
}
