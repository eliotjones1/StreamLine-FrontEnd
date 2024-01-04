import { InitSearchContent } from 'src/modules/media/pages/initial/components';
import { InitSearchBar } from 'src/modules/media/components';
import { useLocation } from 'react-router-dom';

export default function InitialSearch() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');

   return (
       <div>
           <main className="grow">
               <InitSearchBar />
               {searchQuery && <InitSearchContent searchQuery={searchQuery} />}
           </main>
       </div>
     );
}
