import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { useTMDB } from '/src/modules/common/hooks';
import { ContentCard, ContentNameAndDate } from '/src/modules/common/components';

export default function BasicContentData({ type, id }) {
  const { fetchContentData } = useTMDB();

  const {
    status,
    data: content,
  } = useQuery({
    queryKey: ["media_content", type, id],
    queryFn: () => fetchContentData(type, id),
  });

  if (status === "loading") return <></>;
  if (status === "error") return <></>;

  return (
    <div className="bg-slate-50 dark:bg-slate-700 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 space-x-2 flex shadow-md">
      <div className="flex relative w-1/4">
        <ContentCard content={content.data} />
      </div>
      <div className="w-3/4 space-y-1 relative">
        <ContentNameAndDate content={content.data} />
      </div>
    </div>
  );
}

BasicContentData.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
