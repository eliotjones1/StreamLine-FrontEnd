import React, { useState, useEffect } from "react";
import axios from 'axios';

const dummy = [
  {
    "id": 1,
    "logo": "https://example.com/logo1.png",
    "serviceName": "Service A",
    "endDate": "2023-12-31",
    "price": "$9.99"
  },
  {
    "id": 2,
    "logo": "https://example.com/logo2.png",
    "serviceName": "Service B",
    "endDate": "2023-11-30",
    "price": "$14.99"
  },
  {
    "id": 3,
    "logo": "https://example.com/logo3.png",
    "serviceName": "Service C",
    "endDate": "2024-02-28",
    "price": "$19.99"
  },
  {
    "id": 4,
    "logo": "https://example.com/logo4.png",
    "serviceName": "Service D",
    "endDate": "2023-10-15",
    "price": "$24.99"
  },
  {
    "id": 5,
    "logo": "https://example.com/logo5.png",
    "serviceName": "Service E",
    "endDate": "2024-01-31",
    "price": "$29.99"
  }
]


export default function ScrollableSubscription(){
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubs = async () => {
    const { data } = await axios.get("http://127.0.0.1:8000/api/user/subscriptions/view/", { withCredentials: true });
    setSubscriptions(data);
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Current Subscriptions</h1>
      <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-slate-50 dark:bg-slate-700">
          {subscriptions.length === 0 ? (
            <p className="text-gray-500">No subscriptions found.</p>
          ) : (
            <ul className="space-y-4">
              {subscriptions.map((subscription) => (
                <li key={subscription.id} className="flex items-center space-x-4 text-gray-800">
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