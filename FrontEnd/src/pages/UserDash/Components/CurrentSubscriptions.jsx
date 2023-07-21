import React, { useState } from "react";

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
  const [subscriptions, setSubscriptions] = useState(dummy);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Current Subscriptions</h1>
      <div className="max-h-96 overflow-y-auto border rounded-lg p-4 bg-slate-50 dark:bg-slate-700">
          {subscriptions.length === 0 ? (
            <p className="text-gray-500">No subscriptions found.</p>
          ) : (
            <ul className="space-y-4">
              {subscriptions.map((subscription) => (
                <li key={subscription.id} className="flex items-center space-x-4 text-gray-800">
                  <img src={subscription.logo} alt={subscription.serviceName} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold">{subscription.serviceName}</p>
                    <p>End Date: {subscription.endDate}</p>
                    <p>Price: {subscription.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
    </div>
  );
};