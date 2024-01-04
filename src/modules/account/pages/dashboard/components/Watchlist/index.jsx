import { ContentSlider } from './components';
import { useEffect, useState } from 'react';
import { StreamLineAxios } from '../../../../../../api/axios.config.js';


export default function Watchlist() {
    const [mediaList, setMediaList] = useState([]);

    
    useEffect(() => {
        const fetchMediaList = async () => {
            try {
                const response = await StreamLineAxios.get('/api/return-user-data/'); 
                const mediaObjects = response.data.media; 

                const mediaInfoPromises = mediaObjects.map(mediaObject => 
                    fetchMedia(mediaObject.media_type, mediaObject.id)
                    );

                const mediaInfos = await Promise.all(mediaInfoPromises);
                setMediaList(mediaInfos);
            } catch (error) {
                console.error('Error fetching media list:', error);
                // Handle error here
            }
        };
        fetchMediaList();
        }, []);
    
    const fetchMedia = async (type, id) => {
        const { data } = await StreamLineAxios.post('/api/return-media-info/', {
            media_type: type,
            id: id,
        });
        return data;
    };
    
    return (
        <div className="max-w-7xl mx-auto relative z-0 text-slate-800">
            <div className="pb-2">
                <p className="font-bold pb-2 text-2xl ">Your Watchlist</p>
                <ContentSlider mediaContent={mediaList} />
            </div>
        </div>
        );
}