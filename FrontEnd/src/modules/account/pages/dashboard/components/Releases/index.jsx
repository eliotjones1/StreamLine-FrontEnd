import { useAccount } from '/src/modules/account/hooks';
import { useQuery } from '@tanstack/react-query';
import { CalendarHeader }  from './components';
import CalendarContent from './components/CalendarContent';

export default function Calendar() {
  const { fetchUpcoming } = useAccount();

  const { status, data } = useQuery({
    queryKey: ["account", "upcoming"],
    queryFn: () => fetchUpcoming()
  })

  if (status === "loading") return <></>;
  if (status === "error") return <></>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Your Upcoming Releases</h1>
      <div className="rounded-md border-0 px-3.5 pt-2 shadow-sm ring-1 ring-inset ring-slate-900/5 bg-slate-50 dark:bg-slate-700">
        <CalendarHeader days={data.days}/>

        {
          data.releases.length === 0 ? 
            <p className="flex w-full justify-center py-4">No new content this week.</p>
          : 
            <CalendarContent data={data}/>
        }
      </div>
    </div>
  );
}
