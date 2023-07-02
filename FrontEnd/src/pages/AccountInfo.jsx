import React, { useEffect, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'

import axios from 'axios';

import Header from '../partials/Header';
import PageTopIllustration from "../partials/PageTopIllustration";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'


function EditAccount() {
  const [profileData, setProfileData] = useState({ user: "", Email: "", First_Name: "", Last_Name: "", Street_Address: "", City: "", State_Province: "", Country: "", Postal_Code: "", Newsletter: false, Promotions: false, Push_Notifications: "" });
  const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const nav = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const curData = JSON.stringify(profileData);
    axios.post("http://127.0.0.1:8000/api/user/settings/update/", curData, {
      withCredentials: true, headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setProfileData({
        user: response.data.user, Email: response.data.Email, First_Name: response.data.First_Name, Last_Name: response.data.Last_Name,
        Street_Address: response.data.Street_Address, City: response.data.City, State_Province: response.data.State_Province, Country: response.data.Country,
        Postal_Code: response.data.Postal_Code, Newsletter: response.data.Newsletter, Promotions: response.data.Promotions, Push_Notifications: response.data.Push_Notifications
      });
      console.log(response.data.Newsletter)
    }).catch(error => {
      // Show Error Modal
    })

  }

  function loadData() {

    axios.get('http://127.0.0.1:8000/api/user/settings/?email=' + session.email, { withCredentials: true }).then(response => {
      setProfileData({
        user: response.data.user, Email: response.data.Email, First_Name: response.data.First_Name, Last_Name: response.data.Last_Name,
        Street_Address: response.data.Street_Address, City: response.data.City, State_Province: response.data.State_Province, Country: response.data.Country,
        Postal_Code: response.data.Postal_Code, Newsletter: response.data.Newsletter, Promotions: response.data.Promotions, Push_Notifications: response.data.Push_Notifications
      });
    }).catch(error => {
      // Show error modal
    });

  }
  const handleFormValueChange = (event) => {
    let { name, value } = event.target;
    if (value === true && profileData[name] === true) value = false;
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleButtonValueChange = (event) => {
    const { name, checked } = event.target;
    const value = checked;

    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  function handleDeleteAccount() {
    setShowConfirmation(true);
  }

  function handleConfirmDelete() {
    // Placeholder Axios request for account deletion
    axios.post("http://127.0.0.1:8000/api/user/settings/delete/", {Email:profileData.Email}, { withCredentials: true })
      .then(response => {
        console.log("Account deleted successfully!");
        document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        nav('/')
      })
      .catch(error => {
        // Show Error Modal or handle errors
      });
  }

  function handleCancelDelete() {
    setShowConfirmation(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <PageTopIllustration />
        <div className="flex justify-center">
          <form className='py-24' onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
                <h2 className="text-base font-semibold leading-7">Profile</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
                  This information will never be displayed publicly.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6">
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <UserCircleIcon className="h-12 w-12 text-slate-700 dark:text-white" aria-hidden="true" />
                      <button
                        type="button"
                        className="rounded-md bg-sky-600 text-white px-2.5 py-1.5 text-sm font-semibold shadow-sm hover:bg-sky-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        name="Email"
                        type="email"
                        value={profileData.Email}
                        onChange={handleFormValueChange}
                        autoComplete="email"
                        className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
                <h2 className="text-base font-semibold leading-7">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">Use a permanent address where you can receive mail.</p>

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
                <h2 className="text-base font-semibold leading-7">Notifications</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
                  We'll always let you know about important changes, but you pick what else you want to hear about.
                </p>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6">By Email</legend>
                    <div className="mt-6 space-y-6">
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            name="Newsletter"
                            type="checkbox"
                            checked={profileData.Newsletter === true}
                            onChange={handleButtonValueChange}
                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label htmlFor="newsletter" className="font-medium">
                            Newsletter
                          </label>
                          <p className="text-gray-500 dark:text-slate-300">Get monthly updates on relevant streaming news.</p>
                        </div>
                      </div>
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            name="Promotions"
                            type="checkbox"
                            checked={profileData.Promotions === true}
                            onChange={handleButtonValueChange}
                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label htmlFor="promotions" className="font-medium">
                            Promotions
                          </label>
                          <p className="text-gray-500 dark:text-slate-300">Get notified about StreamLine promotions.</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6">Push Notifications</legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-200">These are delivered via SMS to your mobile phone.</p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          name="Push_Notifications"
                          value="Everything"
                          type="radio"
                          checked={profileData.Push_Notifications === "Everything"}
                          onChange={handleFormValueChange}
                          className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6">
                          Everything
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          name="Push_Notifications"
                          value="SameAsEmail"
                          checked={profileData.Push_Notifications === "SameAsEmail"}
                          onChange={handleFormValueChange}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                        <label htmlFor="push-email" className="block text-sm font-medium leading-6">
                          Same as email
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          name="Push_Notifications"
                          value="None"
                          type="radio"
                          checked={profileData.Push_Notifications === "None"}
                          onChange={handleFormValueChange}
                          className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6" >
                          No push notifications
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
              <h2 className="text-base font-semibold leading-7">Account Deletion</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
                This will delete your account and all of your information permanently.                </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="flex justify-center mt-8">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
            </div>


            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" onClick={loadData} className="text-sm font-semibold leading-6">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8">
              <p className='text-black'>Are you sure you want to delete your account?</p>
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-red-500 text-white rounded mr-2" onClick={handleConfirmDelete}>
                  Yes
                </button>
                <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded" onClick={handleCancelDelete}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default EditAccount;