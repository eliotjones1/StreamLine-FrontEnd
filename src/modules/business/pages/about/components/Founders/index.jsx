import { TwoColumnGrid } from '/src/modules/common/templates';
import { SocialLinksList } from '/src/modules/common/components';
import { BasicMediaCard } from './components';
import { TextSection } from 'src/modules/business/components';
import RyanFull from '/src/assets/images/Ryan_Full.jpg';
import EliotFull from '/src/assets/images/Eliot_Full.jpeg';
const founders = [
	{
		name: 'Ryan Dunn',
		role: 'Co-Founder / Role Undetermined',
		location: 'Charlotte, North Carolina',
		imageUrl: RyanFull,
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
		imageUrl: EliotFull,
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
		<>
			<TextSection
				sectionHeader={'Meet the Founders'}
				paragraphTextList={[
					"Meet our founders, two computer science students from Stanford University who share a passion for entertainment and technology. Both actively compete in the Pac-12 conference as members of the Stanford Men's Soccer Team, showcasing their teamwork and dedication on and off the field. With a vision to reshape the entertainment industry, they aim to utilize their diverse skillsets to bring innovative solutions and make a lasting impact on the future of media and beyond.",
				]}
			/>
			<section className="mt-12 mb-24">
				<TwoColumnGrid>
					{founders.map((person) => (
						<TwoColumnGrid key={person.name}>
							<img
								className="h-full w-full rounded-lg"
								src={person.imageUrl}
								alt=""
							/>

							<div className="flex flex-col min-h-min space-y-2 space-x-2">
								<div>
									<h3 className="text-2xl font-semibold leading-7 tracking-tight pt-2">
										{person.name}
									</h3>
									<p className="text-base font-semibold leading-6 text-sky-600">
										{person.role}
									</p>
									<p className="text-sm font-thin leading-6 text-gray-600 dark:text-gray-400">
										{person.location}
									</p>
								</div>

								<SocialLinksList list={person.socialMedia} />

								<div className="space-y-2">
									<p className="text-lg font-semibold">Favorite Content</p>
									{person.favContent.map((content, index) => (
										<BasicMediaCard
											type={content.type}
											id={content.id}
											key={index}
										/>
									))}
								</div>
							</div>
						</TwoColumnGrid>
					))}
				</TwoColumnGrid>
			</section>
		</>
	);
}
