import { TextSection } from 'src/modules/business/components';
import { CTA } from '/src/modules/common/components';

export default function Revolution() {
	return (
		<>
			<TextSection
				sectionHeader={'Join the Revolution'}
				paragraphTextList={[
					'The StreamLine team invites you to be part of our revolutionary movement that transforms the way users experience entertainment. Say goodbye to the complexities of managing multiple subscriptions and the frustration of content fragmentation. Embrace a return to the simplicity and convenience of a virtual cable box, tailored just for you. Our mission is clear: to provide effortless content access, empowering you to focus on what you love most - enjoying your favorite shows, movies, and sports.',
					"Join us on this transformative journey as we lead the charge against the subscription chaos. StreamLine's user-centric platform brings together diverse content seamlessly, eliminating the hassle of switching between services. Discover a personalized entertainment experience like no other, with our intuitive interface and proprietary recommendation algorithms guiding you to your perfect content match. Whether you're a film fanatic, a sports enthusiast, or both, StreamLine has you covered. Embrace the revolution, and welcome to StreamLine, where simplicity and entertainment converge in harmony.",
				]}
			/>
			<CTA arrowBtnText="Contact Us" newNavURL="/support" />
		</>
	);
}
