import { Fragment, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Logo from '../images/StreamLine_Transparent_Logo.png'
import { useNavigate } from 'react-router-dom'
import AccountActions from '../partials/AccountActions';
import WelcomeSearch from '../partials/onsignup/SUSearch';
import SearchServs from '../partials/onsignup/ServSearch';
import PersInfo from '../partials/onsignup/PersInfo';
import NotificationInfo from '../partials/onsignup/NotifInfo';


const WelcomePage = ({ username }) => {
    const nav = useNavigate();
    const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : undefined;
    const components = [<WelcomeSearch />, <SearchServs />, <PersInfo />, <NotificationInfo />]
    const [currentComponent, setCurrentComponent] = useState(0); // Track the current component
    const [tosReminder, setTOSReminder] = useState(false); // Track the current component
    const handleNext = () => {
        if (currentComponent < components.length - 1) {
            setCurrentComponent(currentComponent + 1);
        }
    };

    // Handler for the "Back" button
    const handleBack = () => {
        if (currentComponent > 0) {
            setCurrentComponent(currentComponent - 1);
        }
    };

    const handleSubmit = () => {
        const tos = localStorage.getItem('termsAccepted');
        // if tos is false or undefined break
        if (!tos) {
            setTOSReminder(true);
        } else {
            // TOS POST
            axios.post('http://127.0.0.1:8000/api/user/tosCompliance/update/', [session.email], { withCredentials: true })
                .then(res => {
                })
                .catch(err => {
                })
            // Create Subscriptions POST
            // get subscriptions and dates from local storage
            const subs = JSON.parse(localStorage.getItem('selectedContent')) || [];
            const dates = JSON.parse(localStorage.getItem('selectedDates')) || [];

            console.log(subs);
            console.log(dates);
            // loop through subs and dates and create subscription
            for (let i = 0; i < subs.length; i++) {
                const subObject = { 'name': subs[i], 'date': dates[i] };
                axios.post('http://127.0.0.1:8000/api/user/subscriptions/create/', [session.email, subObject], { withCredentials: true })
                    .then(res => {
                    })
                    .catch(err => {
                    })
            }
            // clear seeked content and dates from local storage
            localStorage.removeItem('selectedContent');
            localStorage.removeItem('selectedDates');
            nav('/user-dash');
        }
    }

    const handleOK = () => {
        setTOSReminder(false);
    }

    return (
        <><><header className="absolute w-full z-30">
            <nav className="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">

                <div className="flex lg:flex-1">
                    <button onClick={() => nav('/')} className="-m-1.5 p-1.5">
                        <img className="h-8 w-auto" src={Logo} alt="" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {session !== undefined ? (
                        <AccountActions />
                    ) : (
                        <div className='flex gap-x-6'>
                            <button onClick={() => nav('/signin')} className="text-sm font-semibold leading-6">
                                Sign in
                            </button>
                            <button onClick={() => nav('/signup')} className="text-sm font-semibold leading-6">
                                Sign up
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header><main className="grow">
                <section>
                    <div className="max-w-3xl mx-auto text-center relative pb-6 md:pt-28 md:pb-8">
                        <h1 className="h1 mb-4" data-aos="fade-up">
                            <span className="text-sky-600">Welcome, </span>{session.first_name}
                        </h1>
                        <h4 className="h2 mb-4" data-aos="fade-up">
                            <span className="text-sky-600">We're glad you're here!</span>
                        </h4>
                        <p className="text-xl text-gray-600" data-aos="fade-up">
                            <span className="text-white">Before you get started on your StreamLine journey, we need some information from you to help us better achieve your goals.
                                Please input the required information on each of the following pages before you access the rest of the site. Thank you!
                            </span>
                        </p>
                    </div>
                </section>
                <div className="max-w-3xl mx-auto p-6 bg-slate-800 rounded-md shadow-lg my-1">
                    {/* Render the current component */}
                    {components[currentComponent]}
                </div>


                {/* Buttons for navigation */}
                <div className="flex justify-center mt-6">
                    {currentComponent > 0 && (
                        <button className="btn btn-secondary mr-2" onClick={handleBack}>
                            Back
                        </button>
                    )}
                    {currentComponent < components.length - 1 ? (
                        <button className="btn btn-primary" onClick={handleNext}>
                            Next
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    )}
                </div>
                {tosReminder && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-8">
                            <p className='text-black'>Please read and agree to the TOS</p>
                            <div className="flex justify-end mt-4">
                                <button className="px-4 py-2 bg-red-500 text-white rounded mr-2" onClick={handleOK}>
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main></><footer>
                <div className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 divide-y divide-slate-200 dark:divide-slate-700">
                        {/* Bottom area */}
                        <div className="mt-4 pt-8 md:flex md:items-center md:justify-between">
                            <div className="text-slate-600 dark:text-gray-400 text-sm">
                                &copy; StreamLine.com. All rights reserved.
                            </div>
                            <div className="text-slate-600 dark:text-gray-400 text-sm">
                                This product uses the TMDB API but is not endorsed or certified by TMDB.
                            </div>
                        </div>

                    </div>
                </div>
            </footer></>

    );
};

export default WelcomePage;
