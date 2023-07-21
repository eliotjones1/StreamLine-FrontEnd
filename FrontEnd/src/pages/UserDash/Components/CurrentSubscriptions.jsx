import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function ScrollableSubscription(){
  const [subscriptions, setSubscriptions] = useState([]);
  const [budget, setBudget] = useState("0");

  const fetchSubs = async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/api/user/subscriptions/view/", { withCredentials: true });
    setSubscriptions(data);
  };

  const fetchBudget = async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/returnData/", { withCredentials: true });
    setBudget(data.budget);
  };

  useEffect(() => {
    fetchSubs();
    fetchBudget();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
      <div className="h-96 overflow-y-auto border dark:border-none rounded-lg p-4 bg-slate-50 dark:bg-slate-700">
        <div className="flex w-full mb-2 font-semibold">
          <p>Budget:</p>
          <p className="ml-auto">{`$${parseFloat(budget).toFixed(2)}`}</p>
        </div>
        <hr className="m-2"/>
          {subscriptions.length === 0 ? (
            <p>No subscriptions found.</p>
          ) : (
            <ul className="space-y-4">
              {subscriptions.map((subscription) => (
                <li key={subscription.id} className="flex items-center space-x-4">
                  <img src={`https://image.tmdb.org/t/p/w500${subscription.subscription_image_path}`} alt={subscription.serviceName} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold">{subscription.subscription_name}</p>
                    <p>End Date: {new Date(subscription.end_date).toLocaleString('en-US', {year:'numeric', month:'long', day:'numeric'})}</p>
                    <p>Price: {"$" + subscription.subscription_price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>
  );
};