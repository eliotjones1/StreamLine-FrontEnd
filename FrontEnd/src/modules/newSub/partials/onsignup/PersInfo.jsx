import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function PersInfo() {
  const [profileData, setProfileData] = useState({
    user: '',
    Email: '',
    First_Name: '',
    Last_Name: '',
    Street_Address: '',
    City: '',
    State_Province: '',
    Country: '',
    Postal_Code: '',
    Newsletter: false,
    Promotions: false,
    Push_Notifications: '',
  });
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
  const [Checked, setChecked] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setChecked(true);
    const curData = JSON.stringify(profileData);
    axios
      .post('http://127.0.0.1:8000/api/user/settings/update/', [curData, session.email], {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProfileData({
          user: response.data.settings.user,
          Email: response.data.settings.Email,
          First_Name: response.data.settings.First_Name,
          Last_Name: response.data.settings.Last_Name,
          Street_Address: response.data.settings.Street_Address,
          City: response.data.settings.City,
          State_Province: response.data.settings.State_Province,
          Country: response.data.settings.Country,
          Postal_Code: response.data.settings.Postal_Code,
          Newsletter: response.data.settings.Newsletter,
          Promotions: response.data.settings.Promotions,
          Push_Notifications: response.data.settings.Push_Notifications,
        });
        document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        Cookies.set('session', JSON.stringify(response.data.user), {
          path: '/',
          secure: true,
          sameSite: 'strict',
        });
      })
      .catch((error) => {
        // Show Error Modal
      });
  }

  function loadData() {
    setChecked(false);
    axios
      .get('http://127.0.0.1:8000/api/user/settings/?email=' + session.email, {
        withCredentials: true,
      })
      .then((response) => {
        setProfileData({
          user: response.data.user,
          Email: response.data.Email,
          First_Name: response.data.First_Name,
          Last_Name: response.data.Last_Name,
          Street_Address: response.data.Street_Address,
          City: response.data.City,
          State_Province: response.data.State_Province,
          Country: response.data.Country,
          Postal_Code: response.data.Postal_Code,
          Newsletter: response.data.Newsletter,
          Promotions: response.data.Promotions,
          Push_Notifications: response.data.Push_Notifications,
        });
      })
      .catch((error) => {
        // Show error modal
      });
  }
  const handleFormValueChange = (event) => {
    let { name, value } = event.target;
    if (value === true && profileData[name] === true) value = false;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="grow">
        <div className="max-w-3xl mx-auto text-center pb-6 md:pt-32 md:pb-8">
          <h3 className="h3 mb-4" data-aos="fade-up">
            Step 3: Billing Info
          </h3>
          <p className="text-xl mb-4">
            Please fill in your billing address connected to your payment method, this is important
            to maintain your subscription.
          </p>
        </div>
        <div className="flex justify-center">
          <form className="py-24" onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        name="First_Name"
                        type="text"
                        autoComplete="given-name"
                        value={profileData.First_Name}
                        onChange={handleFormValueChange}
                        className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Last_Name"
                        value={profileData.Last_Name}
                        onChange={handleFormValueChange}
                        autoComplete="family-name"
                        className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium leading-6">
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        name="Country"
                        value={profileData.Country}
                        onChange={handleFormValueChange}
                        autoComplete="country-name"
                        className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6">
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Street_Address"
                        value={profileData.Street_Address}
                        onChange={handleFormValueChange}
                        autoComplete="street-address"
                        className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="City"
                        value={profileData.City}
                        onChange={handleFormValueChange}
                        autoComplete="address-level2"
                        className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium leading-6">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="State_Province"
                        value={profileData.State_Province}
                        onChange={handleFormValueChange}
                        autoComplete="address-level1"
                        className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6">
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="Postal_Code"
                        value={profileData.Postal_Code}
                        onChange={handleFormValueChange}
                        autoComplete="postal-code"
                        className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
                  Please confirm that this is an address where you can recieve mail.
                </p>
                <div className="mt-6">
                  <div className="relative flex items-center">
                    <input
                      id="termsCheck"
                      name="termsCheck"
                      type="checkbox"
                      checked={Checked}
                      onChange={handleSubmit}
                      className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                    />
                    <label htmlFor="termsCheck" className="ml-2 block text-sm leading-6">
                      I agree that this information is current and correct.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default PersInfo;
