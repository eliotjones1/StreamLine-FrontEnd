import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import noimage from 'src/assets/images/no-image.jpg';
import { useNavigate } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Carousel } from "@material-tailwind/react";

export default function ContentSlider({ mediaContent }) {
	const navigate = useNavigate();
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const defaultImageStyle = {
		width: 'auto', // Adjust width to the container's width
		height: 'auto',
		objectFit: 'contain',
	};
	const handleMouseEnter = (index) => {
			setHoveredIndex(index);
	};

	const handleMouseLeave = () => {
		setHoveredIndex(null);
	};

	return (
		<div className="flex overflow-x-auto scrollbar-hidden relative">
			{mediaContent.map((content, index) => {
				const backgroundImage = `https://image.tmdb.org/t/p/original/` + content.backdrop_path
				const isHovered = index === hoveredIndex;
				return (
					<div
						key={index}
						className="inline-block"
						style={{ width: '800px', marginRight: '10px', flexShrink: '0' }}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
						>
						<div
					                            className="relative cursor-pointer transition-transform duration-300 ease-in-out"
							>

							{!isHovered && (
								<img
									src={content.backdrop_path ? backgroundImage : noimage}
									onClick={() => navigate(`/media/${content.media_type}/${content.id}`)}
									alt={content.title || content.name}
									style={defaultImageStyle}
								/>
								)}
							{isHovered && (
								<div className="h-[60.25vh] bg-cover" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${backgroundImage})`}}
									>
									<div className="h-full w-full flex flex-col justify-end py-20 pl-20 pr-20 text-slate-900 space-y-4">
										<p className="font-bold text-2xl">{content.title || content.name}</p>
										<p
											className="font-semibold"
											style={{
											fontSize: `calc(1rem - ${content.overview.length * 0.0005}em)`, // Calculate font size based on overview length
												whiteSpace: 'normal', // Make sure text wraps
												lineHeight: '1.2', // Adjust line height if necessary
										}}
											>
											{content.overview}
										</p>
										<a
											className="basic-btn !bg-slate-900 !text-white flex items-center justify-center space-x-2"
											href={content.homepage}
											target="_blank"
											rel="noreferrer"
											>
											<InformationCircleIcon className="h-6" />
											<span className="font-normal text-lg">More Info</span>
										</a>
									</div>
								</div>
								)}

						</div>
					</div>
					);
			})}
		</div>
		);
}

ContentSlider.propTypes = {
	mediaContent: PropTypes.arrayOf(PropTypes.shape({
		backdrop_path: PropTypes.string,
		media_type: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		title: PropTypes.string,
		name: PropTypes.string,
		overview: PropTypes.string,
		homepage: PropTypes.string,
	})).isRequired,
};
