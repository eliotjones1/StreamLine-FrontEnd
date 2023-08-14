import SearchContextWrapper from '/src/modules/searchMedia/contexts';
import Temp from './temp';

export default function ContentSearch() {
  return (
    <SearchContextWrapper>
      <Temp />
    </SearchContextWrapper>
  );
}
