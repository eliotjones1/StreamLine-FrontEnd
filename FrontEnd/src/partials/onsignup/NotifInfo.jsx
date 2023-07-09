import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'


function NotificationInfo() {
    const [profileData, setProfileData] = useState({ user: "", Email: "", First_Name: "", Last_Name: "", Street_Address: "", City: "", State_Province: "", Country: "", Postal_Code: "", Newsletter: false, Promotions: false, Push_Notifications: "" });
    const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
    const [termsChecked, setTermsChecked] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setTermsChecked(true);
        localStorage.setItem('termsAccepted', termsChecked ? 'True' : '');
        const curData = JSON.stringify(profileData);
        axios.post("http://127.0.0.1:8000/api/user/settings/update/", [curData, session.email], {
            withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data)
            setProfileData({
                user: response.data.settings.user, Email: response.data.settings.Email, First_Name: response.data.settings.First_Name, Last_Name: response.data.settings.Last_Name,
                Street_Address: response.data.settings.Street_Address, City: response.data.settings.City, State_Province: response.data.settings.State_Province, Country: response.data.settings.Country,
                Postal_Code: response.data.settings.Postal_Code, Newsletter: response.data.settings.Newsletter, Promotions: response.data.settings.Promotions, Push_Notifications: response.data.settings.Push_Notifications
            });
            document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            Cookies.set('session', JSON.stringify(response.data.user), {
                path: '/',
                secure: true,
                sameSite: 'strict',
            });
        }).catch(error => {
            // Show Error Modal
        })

    }

    function loadData() {
        setTermsChecked(false);
        localStorage.setItem('termsAccepted', termsChecked ? 'True' : '');
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

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <main className="grow">
                <div className="flex justify-center">
                    <form className='py-24' onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="max-w-3xl mx-auto text-center pb-6 md:pt-32 md:pb-8">
                                <h3 className="h3 mb-4" data-aos="fade-up">
                                    Step 4: Notification Preferences
                                </h3>
                                <p className="text-xl mb-4">
                                    Let us know how you want to hear from us!
                                </p>
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
                                    <div className="border-b border-gray-900/10 dark:border-slate-500 pb-12">
                                        <h2 className="text-base font-semibold leading-7">Terms of Service</h2>
                                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">
                                            Please read and confirm that you have read the Terms of Service.
                                        </p>
                                        <div className="mt-6">
                                            <div className="relative flex items-center">
                                                <input
                                                    id="termsCheck"
                                                    name="termsCheck"
                                                    type="checkbox"
                                                    checked={termsChecked}
                                                    onChange={handleSubmit}
                                                    className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                                                />
                                                <label htmlFor="termsCheck" className="ml-2 block text-sm leading-6">
                                                    I have read and agree to the <a href="/terms">Terms of Service</a>.
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default NotificationInfo;