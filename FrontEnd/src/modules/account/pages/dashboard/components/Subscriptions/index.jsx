import { useAccount } from '/src/modules/account/hooks';
import { useQueries } from '@tanstack/react-query';

export default function Subscriptions() {
  const { fetchSubscriptions, fetchBudget } = useAccount();

  const [subs, budget] = useQueries({
    queries: [
      { 
        queryKey: ['account', 'subscriptions'], 
        queryFn: () => fetchSubscriptions()
      },
      { 
        queryKey: ['account', 'budget'], 
        queryFn: () => fetchBudget()
      }
    ]
  });

  if (subs.status === 'loading' || budget.status === "loading") return <></>;
  if (subs.status === 'error' || budget.status === "error") return <></>;


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
      <div className="h-96 overflow-y-auto border dark:border-none rounded-lg p-4 bg-slate-50 dark:bg-slate-700">
        <div className="flex w-full mb-2 font-semibold">
          <p>Budget:</p>
          <p className="ml-auto">{`$${parseFloat(budget.data).toFixed(2)}`}</p>
        </div>
        <hr className="m-2" />
        {subs.data.length === 0 ? (
          <p>No subscriptions found.</p>
        ) : (
          <ul className="space-y-4">
            {subs.data.map((subscription) => (
              <li key={subscription.id} className="flex items-center space-x-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${subscription.subscription_image_path}`}
                  alt={subscription.serviceName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold">{subscription.subscription_name}</p>
                  <p>
                    End Date:{' '}
                    {new Date(subscription.end_date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>Price: {'$' + subscription.subscription_price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
