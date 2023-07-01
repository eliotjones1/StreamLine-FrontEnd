import React from 'react';
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react'
import { Cog6ToothIcon, ChevronDownIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, WindowIcon} from '@heroicons/react/20/solid';
import axios from 'axios';


export default function accountActions(){
  const nav = useNavigate();
  const accountOptions = [
    {name: "Sign Out", icon: ArrowLeftOnRectangleIcon, action: (event) => logout(event)},
    {name: "Edit Account", icon: Cog6ToothIcon, action: () => nav('/account-settings')},
    {name: "My Dashboard", icon: WindowIcon, action: () => nav('/user-dash')}
  ];
  
  function logout(event) {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {withCredentials: true}).then(() => {
      nav('/');
      document.cookie = `session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      // Use Cookies Library to Remove Instead
    }).catch(error => {
      // Add Error Modal
    });
  }

  return(
  <Popover.Group className="hidden lg:flex lg:flex-1 lg:justify-end">
    <Popover className="relative">
      <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6">
        <UserCircleIcon className="h-8 w-8 flex-none text-slate-700 dark:text-white" aria-hidden="true" />
        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400 dark:text-white" aria-hidden="true" />
      </Popover.Button>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className="absolute right-0 top-full z-10 mt-3 overflow-hidden rounded-3xl bg-white text-slate-900 shadow-lg ring-1 ring-slate-900/5">
        <div className="p-4">
          {accountOptions.map((item) => (
            <div
              key={item.name}
              className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 whitespace-nowrap hover:bg-gray-50 cursor-pointer"
              onClick={item.action}
            >
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <item.icon className="h-6 w-6 text-slate-700 group-hover:text-sky-600" aria-hidden="true" />
              </div>
              <div className="flex-autos block font-semibold">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
</Popover.Group>)
}
