import { useState, useEffect } from 'react';
import { ContentSlider } from './components';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { StreamLineAxios } from 'api/axios.config';

export default function Content() {
	const [content, setContent] = useState(null);
	const [initialLoad, setInitialLoad] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchContent = async () => {
			try {
				const response = await StreamLineAxios.get('/api/service-content/');
				setContent(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
				setError(error);
			}
			setInitialLoad(false);
		};

		fetchContent();
		}, []);

	if (initialLoad) {
		return <QueryLoading />;
	}

	if (error) {
		return <QueryError error={error} />;
	}

	return (
		<section className="max-w-7xl mx-auto">
	    {content && Object.entries(content).map(([provider, mediaData]) => (
	      <div key={provider} style={{ marginBottom: '20px' }}>
			  <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
  {mediaData.info.image && mediaData.info.link && (
    <a href={mediaData.info.link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
      <img
        src={`https://image.tmdb.org/t/p/original/${mediaData.info.image}`}
        alt={provider}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
    </a>
  )}
  <h1 className="font-bold text-4xl" style={{ color: 'white', margin: 0 }}>From {provider}</h1>
</div>


	        {mediaData.content.Trending && (
	          <div style={{ marginBottom: '20px' }}>
	            <h2 className="font-bold text-2xl" style={{ color: 'white' }}>Trending</h2>
	            <ContentSlider key={`${provider}-trending`} mediaContent={mediaData.content.Trending} />
	          </div>
	        )}

	        {mediaData.content.Upcoming && (
	          <div style={{ marginBottom: '20px' }}>
				  <h2 className="font-bold text-2xl" style={{ color: 'white' }}>Upcoming</h2>
	            <ContentSlider key={`${provider}-upcoming`} mediaContent={mediaData.content.Upcoming} />
	          </div>
	        )}

	        {mediaData.content.In_Watchlist && (
	          <div style={{ marginBottom: '20px' }}>
				  <h2 className="font-bold text-2xl" style={{ color: 'white' }}>In Your Watchlist</h2>
	            <ContentSlider key={`${provider}-watchlist`} mediaContent={mediaData.content.In_Watchlist} />
	          </div>
	        )}

	      </div>
	    ))}
        </section>
	);
}

