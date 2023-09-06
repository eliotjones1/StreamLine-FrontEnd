import { TwoColumnGrid } from '/src/modules/common/templates';
import { TextSection } from 'src/modules/business/components';

export default function Mission() {
	return (
		<TwoColumnGrid>
			<TextSection
				sectionHeader={'Our Mission'}
				paragraphTextList={[
					'At StreamLine, our mission is simple: to revolutionize the subscription industry and make content access effortless for all. We understand the frustration faced by casual entertainment users who are overwhelmed by managing multiple subscriptions and figuring out what content is available on each platform. Unfortunately, many companies take advantage of this complexity, making it challenging for users optimally access the content that truly interests them.',
					'Our commitment is to simplify this process entirely. We firmly believe that accessing your favorite content should be simple, cost-efficient, and tailored specifically for you. With our user-friendly interface and proprietary recommendation algorithms, we aim to streamline your subscription journey, allowing you to focus on enjoying the content you love the most.',
					"Say goodbye to the time and effort spent searching for what's available on each service. With StreamLine, you can optimize your entertainment experience and indulge in the content that brings you joy. Welcome to a world of effortless content access - welcome to StreamLine.",
				]}
			/>
			<div className="flex justify-center">
				<img src="src/assets/images/no-image.jpg" />
			</div>
		</TwoColumnGrid>
	);
}
