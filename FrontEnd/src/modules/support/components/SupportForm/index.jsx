import { useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SupportForm() {
  const [agreed, setAgreed] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const messageRef = useRef();

  const sendInfo = (event) => {
    event.preventDefault();
    if (agreed) {
      /*
      const postData = {
        'first-name': firstNameRef.current.value,
        'last-name': lastNameRef.current.value,
        'email': emailRef.current.value,
        'phone-number': phoneNumberRef.current.value,
        'message': messageRef.current.value,
      };
      axios.post("http://127.0.0.1:8000/api/user/contact/", postData).then(() => {
        setOpenSuccessModal(true);
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        emailRef.current.value = "";
        phoneNumberRef.current.value = "";
        messageRef.current.value = "";
        setAgreed(false);
      }).catch(error => {
        setOpen500Modal(true);
      });
      */
      console.log("Success")
      firstNameRef.current.value = '';
      lastNameRef.current.value = '';
      emailRef.current.value = '';
      phoneNumberRef.current.value = '';
      messageRef.current.value = '';
      setAgreed(false);
    } else {
      alert('Please agree to the privacy policy!');
    }
  };

  return (
    <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-sky-600 to-sky-600 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-slate-50">
          Reach out to our dedicated team for all your support and sales inquiries - we're here to
          assist you every step of the way!
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={sendInfo}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6">
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                ref={firstNameRef}
                required
                autoComplete="given-name"
                className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 ">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                ref={lastNameRef}
                required
                autoComplete="family-name"
                className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 ">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                ref={emailRef}
                required
                autoComplete="email"
                className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 ">
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm"
                >
                  <option>US</option>
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                ref={phoneNumberRef}
                required
                autoComplete="tel"
                className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 pl-20 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 ">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                required
                name="message"
                id="message"
                ref={messageRef}
                rows={4}
                className="w-full flex-auto rounded-md border-0 bg-slate-900/5 dark:bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-sky-600' : 'bg-gray-200 dark:bg-slate-600',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600'
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600 dark:text-slate-400">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-sky-600">
                privacy&nbsp;policy
              </a>
              .
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-sky-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
