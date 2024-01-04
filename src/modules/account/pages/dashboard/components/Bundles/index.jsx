import { useState, useEffect } from 'react';
import { StreamLineAxios } from '../../../../../../api/axios.config.js';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Spinner,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';

export default function Bundles() { 
    const [curBundle, setCurBundle] = useState({});
    const [curBudget, setCurBudget] = useState(0);
    const [mediaList, setMediaList] = useState([]);
    const [newBundle, setNewBundle] = useState(null)
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    
    
    useEffect(() => {
        const fetchMediaList = async () => {
            try {
                const response = await StreamLineAxios.get('/api/return-user-data/');
                setMediaList(response.data.media);
                setCurBundle(response.data.bundle[0]);
                setCurBudget(response.data.budget);
            } catch (error) {
                console.error('Error fetching media list:', error);
                // Handle error here
            }
        };
        
        const fetchData = async () => {
            await Promise.all([fetchMediaList()]);
            setInitialLoad(false);
        };
        fetchData();
    }, []);
    
    if (initialLoad) {
        return(
            <div className="flex h-full w-full rounded-lg items-center justify-center p-10">
                <Spinner className="h-12 w-12" color="blue" />
            </div>);
    }
    
    {/* Get WatchList from backend */}
    
    { /* Display generated bundle logic */ }
    const handleButtonClick = async () => {
        setLoading(true);
        try {
            const response = await StreamLineAxios.post('/api/optimize/', mediaList);
            console.log(response.data);
            setNewBundle(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error here, perhaps set an error message in state
        } finally {
            setLoading(false);
        }
    };
    
    const handleClearBundle = () => {
        setNewBundle(null);
    };
    return (
        <Card className="h-full w-full bg-slate-50 h-[34rem] pb-2">
    <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-slate-50 pb-4 text-center" 
    >
        <div className="flex items-center justify-center gap-8 pb-12"> 
            <div>
                <Typography variant="h3" color="blue-gray" className="text-center"> 
                    Bundle Overview
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-center"> 
                    Below are your current subscription details.
                </Typography>
            </div>
        </div>
    </CardHeader>
            <CardBody className="overflow-scroll p-0 h-[48rem] text-center"> 
                <div  style={{ marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="flex overflow-x-auto relative" style={{ gap: '20px', padding: '10px' }}>
                    {curBundle.Streaming_Services.map((service, index) => (
                        <a href={curBundle.Links[index]} key={service} style={{ margin: '0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: '0'}}>
                                <img 
                                    src={`https://image.tmdb.org/t/p/w500${curBundle.Images[index]}`} 
                                    alt={service} 
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover'}} 
                                />
                                <p>{service}</p>
                            </a>
                            ))}
                    </div>
                    <p style={{justifyContent: 'center', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px'}}>Total cost to you: ${curBudget}</p>
                </div>
                
                {!newBundle && <p>Click here to see your optimal streaming bundle</p>}
                <button 
            onClick={handleButtonClick} 
            disabled={loading}
            className="bg-slate-900 text-white rounded py-2 px-4 mx-auto my-2"
            style={{ 
                fontSize: newBundle ? 'medium' : 'large',
                position: newBundle ? 'absolute' : 'static',
                right: newBundle ? '10px' : '',
                bottom: newBundle ? '10px' : '',
            }}
        >
            {loading ? 'Loading...' : newBundle ? 'Regenerate' : 'Generate Bundle'}
        </button>
                {newBundle && (
                    <button 
                        onClick={handleClearBundle}
                        className="bg-red-500 text-white rounded py-2 px-4"
                        style={{ 
                        position: 'absolute',
                            left: '10px',
                            bottom: '15px',
                            fontSize: 'medium',
                        }}
                        >
                        Clear Bundle
                    </button>
                )}
                {newBundle && (
                    <div style={{ marginTop: '20px' }}>
                        <h2>{newBundle.Title}</h2>
                        <h3>{newBundle.Subheader}</h3>
                        <div className="flex overflow-x-auto relative" style={{ gap: '20px', padding: '10px' }}>
                            {newBundle.Streaming_Services.map((service, index) => (
                                <a href={newBundle.Links[index]} key={service} style={{ margin: '0 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: '0' }}>
                                   <img 
                                       src={`https://image.tmdb.org/t/p/w500${newBundle.Images[index]}`} 
                                       alt={service} 
                                       style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}  
                                   />
                                   <p>{service}</p>
                               </a>
                                ))}
                        </div>
                        <p style={{justifyContent: 'center', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px'}} >Total Cost: ${newBundle.Total_Cost}</p>
                    </div>
                    )}

            </CardBody>
        </Card>
        );
   
}



Bundles.propTypes = {
  mediaList: PropTypes.array.isRequired,
  curBundle: PropTypes.object.isRequired,
  curBudget: PropTypes.number.isRequired,
};



