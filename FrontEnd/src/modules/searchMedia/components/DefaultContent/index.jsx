import { useQuery } from '@tanstack/react-query';
import { useTMDB } from '/src/modules/common/hooks';
import { ContentSlider } from '/src/modules/common/components';

export default function Content() {
  const { fetchTrending, fetchNewlyReleased } = useTMDB();

  const trending = useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrending(),
  });

  const newlyReleased = useQuery({
    queryKey: ["newly_released"],
    queryFn: () => fetchNewlyReleased(),
  });

  /*
  const {
    staffPicksStatus,
    data: staffPicks,
  } = useQuery({
    queryKey: ["staff_picks"],
    queryFn: () => fetchStaffPicks(),
  });*/

  if (trending.status === "loading" || newlyReleased.status === "loading") return <></>;
  if (trending.status === "error" || newlyReleased.status === "error") return <></>;

  return (
    <div className="max-w-7xl mx-auto relative z-0">
      <div className="pb-2">
        <p className="font-bold pb-2 text-2xl">Trending Content</p>
        <ContentSlider mediaContent={trending.data} />
      </div>
      <div className="pb-2">
        <p className="font-bold pb-2 text-2xl">Newly Released</p>
        <ContentSlider mediaContent={newlyReleased.data} />
      </div>
    </div>
  );
}