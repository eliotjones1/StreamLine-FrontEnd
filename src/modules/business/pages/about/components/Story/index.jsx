import { ImageRow, Quote } from './components';
import { TextSection } from 'src/modules/business/components';

export default function Story() {
	return (
		<section className="space-y-4 my-20">
			<TextSection
				sectionHeader="Our Story"
				sectionSubHeader="From Inspiration to Innovation"
				paragraphTextList={[
					"At StreamLine, our journey began during a senior project class at Stanford University. As passionate entertainment enthusiasts, our founding team shared a deep love for classic cinema franchises such as Star Wars and a profound appreciation for the excitement of live sports. However, we couldn't overlook the challenges posed by the transition from cable boxes, which offered all-in-one entertainment solutions, to the fragmentation of content in the subscription landscape.",
					'Fueled by our collective frustration with managing multiple subscriptions and the complexity of accessing desired content effortlessly, a vision started to take shape. We set out to revolutionize the subscription industry by creating a groundbreaking platform that would optimize and automate this process.',
				]}
			/>
			<ImageRow />
			<TextSection
				paragraphTextList={[
					'With a strong focus on putting users at the core of our platform design, we aimed to develop a seamless and user-friendly interface. Our dedicated team worked tirelessly to design proprietary recommendation algorithms, ensuring that users could effortlessly navigate their subscription journey and access content that aligned perfectly with their interests.',
					'As StreamLine took shape, we saw an opportunity to empower entertainment enthusiasts worldwide by eliminating unnecessary complexities. Our platform became a place where users could easily discover and enjoy premium content, allowing them to focus solely on their entertainment journey.',
				]}
			/>
			<Quote
				quoteText="Our journey with StreamLine has been about simplifying the
							complicated and bringing joy back to content discovery. We're
							thrilled to share this innovative platform with the world."
			/>
			<TextSection
				paragraphTextList={[
					'Today, StreamLine stands as a trailblazer in the world of entertainment access, reshaping how content is consumed and enjoyed. Our journey is far from over, and our vision is as strong as ever. We aspire to be the go-to platform for millions of users, delivering an optimized and personalized entertainment experience that exceeds expectations.',
				]}
			/>
		</section>
	);
}
