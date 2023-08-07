import React, { useContext } from 'react';
import noimage from '../../images/no-image.jpg';
import { ServicesSearchContext } from '../../contexts/servicesSearchContext';

export default function Content() {
  const { filteredContent } = useContext(ServicesSearchContext);
  console.log(filteredContent )

  if (filteredContent.length === 0) {
    return (
      <p className="max-w-7xl mx-auto text-center my-20">
        No services available with this filter.
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto grid grid-cols-5 gap-4">
      {filteredContent.map((service, index) => (
        <div
          className="bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-200 dark:ring-slate-600 p-2 px-4 cursor-pointer shadow-md"
          key={index}
        >
          <a className="font-semibold space-y-2" href={service.link} target="_blank">
            <img className="w-full object-cover cursor-pointer" src={`https://image.tmdb.org/t/p/original${service.image}`} alt={noimage} />
            <p>
              {service.title}
            </p>
          </a>
          {
            service.price &&
            <p>
              Base Price: ${service.price}
            </p>
          }
        </div>
      ))}
    </section>
  );
}
